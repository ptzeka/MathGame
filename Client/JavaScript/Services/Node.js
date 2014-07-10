MainApp.service("$node", ["$cookies", function ($cookies) {

    //var socket = io("http://mathgame.jit.su/");
    var socket = io("http://localhost:91");
    var _sid = null;

    var request = socket.once("connection", function (data) {
        _sid = data.SID;
        $cookies.Set("SID", data.SID,7);
    });

    return {
        on: function (controller, args, callback) {

            if (args)
                args.SID = _sid;
            else
                args = { SID: _sid };

            return socket.on(controller, function (data) {
                callback(data);
            });

        },
        once: function (controller, args) {

            if (args)
                args.SID = _sid;
            else
                args = { SID: _sid };

            return new Promise({
                resolve: function (promised) {
                    this.request = socket.once(controller, function (data) {
                        promised(data);
                    });
                    socket.emit(controller, args);
                }
            });
        }

    };
}]);
