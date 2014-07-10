var Global = (function () {

    var domain = "htpp://localhost";
    //load necessary scripts
    var scripts = {
        Entities: [],
        Models: [],
        FrameWork: ["angular.min", "socket.io"],
        Filters: [],
        Utilities: [],
        Apps: ["main"],
        Services: ["Cookies","Dialog", "Node","Profile","Game"],
        Directives: ["Form","ViewPort","PauseBar","FadeOnChange"],
        Controllers: ["MainController","FormController"]
    }

    var promises = [];
    for (var k in scripts) {
        var script = scripts[k];
        for (var i = 0; i < script.length; i++) {
            new ScriptPromise("JavaScript/" + k + "/" + script[i].trimStart("/"), false).resolve();
            //promises.push(new ScriptPromise("/JavaScript/" + k + "/" + script[i].trimStart("/"), false));
        }
    }
    /*
    new Promise(promises).then(function () {
        //alert('1');
    });
    */

})();