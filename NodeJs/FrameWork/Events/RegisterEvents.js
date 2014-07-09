
$$Listen("GameStart", function (args) {
    args.Game.SendToAllPlayers("GameStart", {});
});

$$Listen("GameStop", function (args) {
    args.Game.SendToAllPlayers("GameStop", { Game: args.Game.ToJSon() });
});

$$Listen("StartRound", function (args) {
    args.Game.SendToAllPlayers("StartRound", { Game: args.Game.ToJSon() });
});

$$Listen("EndRound", function (args) {
    args.Game.SendToAllPlayers("EndRound", { Game: args.Game.ToJSon() });
});


$$Listen("EndGame", function (args) {
    args.Game.SendToAllPlayers("EndGame", { Game: args.Game.ToJSon() });
});

$$Listen("RemovePlayer", function (args) {
    args.Game.SendToAllPlayers("RemovePlayer", { Game: args.Game.ToJSon() });
});

$$Listen("PlayerJoined", function (args) {
    args.Game.SendToAllPlayers("PlayerJoined", { Game: args.Game.ToJSon() });
});

$$Listen("NewQuestion", function (args) {
    args.Game.SendToAllPlayers("NewQuestion", { Question: args.Question, CurrentQuestion: args.CurrentQuestion});
});

$$Listen("Chat", function (args) {
    args.Game.SendToAllPlayers("Chat", { UserName: args.Profile.UserName, Text: args.Text });
});