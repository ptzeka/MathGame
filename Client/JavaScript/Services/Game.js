MainApp.service("gameService", ["$node", function ($node) {
    return new function () {

        this.Join = function () {
            return $node.once("/GameService/Join")
        }

        this.PlayAgain = function()
        {
            return $node.once("/PlayAgain")
        }

        this.On = function (controller, callback) {
            return $node.on(controller,{},callback)
        }

        this.Once = function (controller, callback) {
            return $node.once(controller, {}, callback)
        }
    };
}]);