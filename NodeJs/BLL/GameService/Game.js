module.exports = function () {
    var self = this;
    var _maxPlayers = 99;

    var _pauseTime = 6000;
    var _pauseEnd = 0;

    var _dificulty = 2;
    var _maxQuestions = 10;
    var _currentQuestion = 0;
    var _players = 0;
    var _question = null;
    var _sessions = {};
    var _disabled = true;
    var _gameStarted = false;
    var _points = {};
    var _winners = {}
    var _gameEnded = false;
    var _timeout = null;

    this.Players = 0;

    this.Id = require("../Guid/Guid.js").Generate("Game");

    function GetPlayerList()
    {
        var list = [];
        for(var k in _sessions)
        {
            var session = _sessions[k];
            if (session.IsConnected) {
                list.push({
                    UserName: session.Profile.UserName,
                    Id: session.Profile.Id,
                    Points: _points[k] || 0
                });
            }
        }
        return list;
    }

    function GetQuestion() {
        var op = null;
        if (_dificulty == 1)
            op = ["+", "-"];
        else
            op = ["*", "+", "/", "-", "("];
        var maxOp = 0;
        if (_dificulty == 1)
            maxOp = 1;
        else
            maxOp = Math.floor(Math.random() * (2 - 1) + 1);
        var operations = 0;
        var equation = "";
        var complexity = maxOp;
        var openParenthesis = false;
        var next = "N";
        var last = "N;"
        while(operations <= maxOp)
        {
            if(next == "N"){
                equation += Math.floor(Math.random() * 10) + 2;
                next = "O";
                last = "N";
            }
            else if (next == "(") {
                operation = op[Math.floor(Math.random() * op.length)];
                if(operation != "(")
                {
                    equation += operation + "(";
                    openParenthesis = true;
                    operations++;
                    next = "N";
                    last = "(";
                }
            }
            else if (next == "O") {
                operation = op[Math.floor(Math.random() * op.length)];
                if (operation == "(" && last != "(") {
                    if (openParenthesis) {
                        equation += ")"
                        openParenthesis = false;
                    }
                    else if (operations <= maxOp - 1)
                    {        
                        next = "(";
                    }
                }
                else {
                    if (operation == "/")
                        complexity += 5
                    else if (operation == "*")
                        complexity += 3;
                    else
                        complexity++;

                    equation += operation;
                    next = "N";
                    last = "O";
                    operations++;
                }
            }
        }

        equation += Math.floor(Math.random() * 10) + 2;
        if (openParenthesis)
            equation += ")";
        var answer = eval(equation);
        var str = answer.toString();
        if (str.indexOf(".") > 0 && (str.length - str.indexOf(".") >= 2)) //make sure to keep only simple answers
            return GetQuestion();

        return { Q: equation, A: answer, Complexity: complexity };
    }

    function NewQuestion() {
        if (_gameStarted) {
            _question = GetQuestion();
        }
    }

    function NewGame() {
        _gameStarted = true;
        _disabled = false;
        _question = null;
        _pauseEnd = 0;
        _currentQuestion = 0;
        _points = {};
        _winners = {};
        if (_timeout)
            clearTimeout(_timeout);
        $$Trigger("GameStart", {Game:self});
        StartRound();

    }

    function EndGame() {
        var winners = {}
        var mostPoints = 0;
        for (var k in _points)
        {
            if(_points[k] > mostPoints)
            {
                mostPoints = _points[k];
            }
        }
        for (var k in _points)
        {
            if(_points[k] == mostPoints)
            {
                winners[k] = _sessions[k];
            }
        }

        _winners = winners;
        _gameEnded = true;
        _gameStarted = false;
        _question = null;
        _pauseEnd = 0;
        $$Trigger("EndGame", { Game: self });
    }

    function EndRound() {
        _disabled = true;
        _question = null;
        $$Trigger("EndRound", { Game: self });
    }

    function StartRound()
    {
        _disabled = false;
        NewQuestion();
        _currentQuestion++;
        $$Trigger("StartRound", { Game: self });
    }

    this.PlayAgain = function ()
    {
        if(_gameEnded)
            NewGame();
    }

    this.Join = function (session) {
        session.OnDestroy(function () {
            self.RemovePlayer(session);
        });

        session.OnDisconnect(function () {
            self.RemovePlayer(session);
        });

        _sessions[session.Id] = session;
        _points[session.Id] = 0;
        _players++;
        self.Players = _players;

        //if (_players >= 2)
        if(!_gameStarted)
            NewGame();

        $$Trigger("PlayerJoined", { Game: self, player: session })

        return self;
    };
    
    this.RemovePlayer = function (session) {
        if (_sessions[session.Id]) {
            delete _points[session.Id];
            delete _sessions[session.Id];
            _players--;
            self.Players = _players;
            var playerList = GetPlayerList();
            $$Trigger("RemovePlayer", { Game: self })
        }
    }
    
    this.SendToAllPlayers = function(key,message)
    {
        for(var k in _sessions)
        {
            _sessions[k].Emit(key, message);
        }
    }

    this.ToJSon = function () {
        var errors = [];
        var winners = [];
        if (_winners)
        {
            for(var k in _winners)
            {
                winners.push({ UserName: _winners[k].Profile.UserName, Id: _winners[k].Profile.Id, Points: _points[k] });
            }
        }
        return {
            Question: _question ? _question.Q : "",
            CurrentQuestion: _currentQuestion,
            MaxQuestions: _maxQuestions,
            PlayerList: GetPlayerList(),
            PauseInfo : {
                PauseTime: _pauseTime,
                PauseEnd: _pauseEnd,
                PauseCurrent: new Date().getTime(),
            },
            Disabled: _disabled,
            Winners: winners,
            Errors: errors
        }
    }

    this.Current = function(session,profile)
    {
        return {
            Chat : function (text) {
                $$Trigger("Chat", { Game:self, Profile: profile,  Text: text })
            },
            Answer : function (answer) {
                if (!_disabled && _sessions[session.Id]) {
                    try
                    {
                        var correct = (answer == _question.A);
                        if (correct) {
                            var points = _question.Complexity;
                            if(!_points[session.Id])
                                _points[session.Id] = points;
                            else
                                _points[session.Id] += points;

                            _pauseEnd = new Date().getTime() + _pauseTime;
                            _timeout = setTimeout(function () {
                                _pauseEnd = 0;
                                if (!_gameEnded)
                                    StartRound();
                            }, _pauseTime);
                    
                        }

                        var message = {
                            Game: self.ToJSon(),
                            Response: {
                                Point: _question.Complexity,
                                UserName: profile.UserName,
                                Correct: correct,
                                Answer: answer
                            }
                        }

                        self.SendToAllPlayers("Answer", message);

                        if (correct) {
                            if (_currentQuestion == _maxQuestions)
                                EndGame();
                            else if (correct)
                                EndRound();
                        }
                    }
                    catch (ex)
                    {
                        self.SendToAllPlayers("Error", { Title: "Answer Error", Error: ex.toString() })
                        NewGame();
                        console.log(ex);
                    }
                
                }
            }
        }
    }

}