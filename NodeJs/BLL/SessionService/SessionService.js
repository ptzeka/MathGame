

module.exports = new function () {

    var self = this;
    var timeout = 20 * 60 * 1000; // 20 min
    var _sessions = {}

    function CleanUp() {
        for (var k in _sessions) {
            var session = _sessions[k];
            if (session.LastUpdate.getTime() > (new Date().getTime() + timeout)) {
                session.Timeout();
                session.Destroy();
                delete _sessions[k];
            }
            else {
                session.Refresh();
            }
        }
    }

    this.Current = function (socket,sid) {
        return {
            Session : function () {
                if (!_sessions[sid]) {
                    _sessions[sid] = new (require("./Session.js"))(sid);
                }
                var session = _sessions[sid];
                session.SetSocketContext(socket);
                session.Refresh();
                return session;
            },
            Remove : function () {
                _sessions[sid].Destroy();
                delete sessions[sid];
            }
        }
    }

    setTimeout(function () {
        CleanUp();
    }, 60 * 1000)

}

