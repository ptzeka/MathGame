require("./require.js");
var Controller = require("./FrameWork/Controller/ControllerBase.js");
var io = require('socket.io').listen(90);

/*
io.set("origins","localhost:*");
io.set('transports', [
  'websocket'
, 'flashsocket'
, 'htmlfile'
, 'xhr-polling'
, 'jsonp-polling'
]);
*/

console.log("App_Start")

io.use(function (socket, next) {

    socket.CookieService = require("./BLL/CookieService/CookieService.js").Current(socket);
    //socket.SID = socket.CookieService.Get("SID") || require("./Bll/Guid/Guid.js").Generate("SID"); //cookie based, right now every page load = 1 session
    socket.SID = require("./Bll/Guid/Guid.js").Generate("SID");
    socket.SessionService = require("./BLL/SessionService/SessionService.js").Current(socket,socket.SID);
    socket.ProfileService = require("./BLL/ProfileService/ProfileService.js").Current(socket.SessionService.Session());
    socket.UserService = require("./BLL/ProfileService/UserService.js").Current(socket.ProfileService.Profile());
    socket.GameService = require("./BLL/GameService/GameService.js").Current(socket.SessionService.Session(), socket.ProfileService.Profile());
    next();
});


io.sockets.on('connection', function (socket) {

    socket.SessionService.Session().IsConnected = true;

    socket.on("/ProfileService/Profile", function (data) {
        socket.emit("/ProfileService/Profile", socket.ProfileService.Profile().ToJSon())
    });

    new Controller(socket, "/GameService/Join", function (data) {

        console.log("/GameService/Join==");
        var game = socket.GameService.Join();
        socket.emit("/GameService/Join", { Game: game.ToJSon() })

    }).Requires("Authentication");

    new Controller(socket, "/PlayAgain", function (data) {

        socket.GameService.PlayAgain();

    }).Requires("Authentication");

    socket.on("/ProfileService/CreateUser", function (data) {
        if(data.UserName)
        {

            console.log('createUser');
            socket.UserService.CreateUser({ UserName: data.UserName }).then(function (data) {
                if (data.exists)
                    socket.emit("/ProfileService/CreateUser", { Errors: [{ UserName: "exists" }] })
                else if (socket.ProfileService.Profile().LoginState == 1)
                    socket.emit("Authenticated", socket.ProfileService.Profile().ToJSon());
                else
                    socket.emit("/ProfileService/CreateUser", { Errors: [{ UserName: "failed" }] })
            })
        }
        else
        {
            socket.emit("/ProfileService/CreateUser", { Errors: [{ UserName: "required" }] })
        }
    });

    new Controller(socket, "/SubmitAnswer", function (args) {

        socket.GameService.SubmitAnswer(args.Answer);

    }).Requires("Authentication");

    new Controller(socket, "/SubmitChat", function (args) {

        socket.GameService.Chat(args.Chat);

    }).Requires("Authentication");

    socket.emit("connection", { SID: socket.SID });

    socket.on('disconnect', function () {
        console.log('disconnect');
        var session = socket.SessionService.Session();
        if (socket) {
            session.IsConnected = false;
            session.Destroy();
            session.SetSocketContext(null);
        }
        //$$SessionService.Remove(session.Id);
    });
    console.log('---------------')
});
