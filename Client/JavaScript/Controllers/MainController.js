
function MainController($rootScope, $scope, dialog, profileService, gameService) {
    $scope.Question = "";
    $scope.PlayerList = {};
    $scope.MaxQuestions = 0;
    $scope.CurrentQuestion = 0;
    $scope.PauseInfo = {
        Show: false,
        PauseEnd: 0,
        PauseCurrent: 0,
        PauseTime: 0,
    }
    $scope.Responses = [];
    $scope.Disabled = true;
    $scope.ChatList = [];
    $scope.ShowLightBox = false;
    $scope.Winners = {};
    var _score = null;

    function UpdateState(gameState) {
        $scope.PlayerList = gameState.PlayerList;
        $scope.MaxQuestions = gameState.MaxQuestions;
        $scope.CurrentQuestion = gameState.CurrentQuestion;
        $scope.PauseInfo = gameState.PauseInfo;
        $scope.Question = gameState.Question;
        $scope.Disabled = gameState.Disabled;
        $scope.Winners = gameState.Winners;
    }

    gameService.On("PlayerJoined", function (data) {
        console.log("PlayerJoined");
        console.log(data);
        UpdateState(data.Game);
        $scope.$digest();
    });

    gameService.On("RemovePlayer", function (data) {
        console.log("PlayerRemoved");
        pdateState(data.Game);
        $scope.$digest();
    })

    gameService.On("GameStart", function (data) {
        console.log("GameStart");
        console.log(data);
        $scope.ShowLightBox = false;
        if (_score)
            _score.Close();
        $scope.$digest();
    });

    gameService.On("EndRound", function (data) {
        console.log("EndRound");
        console.log(data);
        UpdateState(data.Game);
        $scope.$digest();
    });

    gameService.On("StartRound", function (data) {
        console.log("StartRound");
        console.log(data);
        UpdateState(data.Game);
        $scope.Responses = [];
        $scope.$digest();
    });

    gameService.On("GameStop", function (data) {
        console.log("GameStop");
        console.log(data);
        UpdateState(data.Game);
        $scope.$digest();
    });

    gameService.On("Answer", function (data) {
        console.log("Answer");
        console.log(data);
        UpdateState(data.Game);
        $scope.Responses.push(data.Response);
        $scope.$digest();
    });

    gameService.On("Chat", function (data) {
        console.log("Chat");
        console.log(data);
        $scope.ChatList.push(data);
        $scope.$digest();
    });

    gameService.On("EndGame", function (data) {
        console.log("EndGame");
        console.log(data);
        UpdateState(data.Game);
        $scope.ShowLightBox = true;
        var scope = {
            PlayAgain: function () {
                gameService.PlayAgain();
            },
            Winners: data.Game.Winners || []
        }

        _score = dialog.$open("/Templates/GameEnd.html", scope, {}, { showCloseButton: false });
        console.log(data);
        $scope.$digest();
    });

    gameService.On("Authenticate", function (data) {
        console.log("Authenticate");
        $scope.ShowLightBox = true;

        var d = dialog.$open("/Templates/Createuser.html", {}, {}, { showCloseButton: false })

        gameService.Once("Authenticated").then(function (data) {
            console.log("Registered");
            d.Close();
            $scope.ShowLightBox = false;
            $scope.$digest();
        });
    });

    gameService.On("Authenticated", function (data) {
        console.log("Authenticated");
        $scope.ShowViewPort();
        gameService.Join().then(function (args) {
            //console.log(args);
        })
    });

    gameService.Join();
}