
module.exports = new function() {

    var _maxPlayers = 20
    var _games = {};
    var _freeGames = {};
    var _game = null;


    function CleanUp()
    {
        if (_game && _game.Players == 0)
            _game = null;
    } 

    this.Current = function(session,profile)
    {
        return {
            Game: function () {
                if (!_game) {
                    _game = new (require("./Game.js"))()
                }
                return _game;
            },
            Join: function () {
                var game = this.Game().Join(session, profile);
                session.OnDestroy(function () {
                    CleanUp();
                });

                session.OnDisconnect(function () {
                    CleanUp();
                });
                return game;
            },
            PlayAgain: function () {
                this.Game().PlayAgain();
            },
            Chat: function (text) {
                this.Game().Current(session, profile).Chat(text);
            },
            SubmitAnswer: function (answer) {
                this.Game().Current(session,profile).Answer(answer)
            }
        }
    }
}