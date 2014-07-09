module.exports = function (id) {
    var self = this;
    var _onDestroy = [];
    var _onTimeout = [];
    var _onDisconnect = [];
    var _socketContext = null;
    var _globalCoolDown = null;
    var _hero = null;


    this.SetSocketContext = function (socket) {
        _socketContext = socket;
    }

    this.Id = id;
    this.IsConnected = false;
    this.Profile = null;
    this.Cache = {};
    this.Created = new Date();
    this.LastUpdate = new Date();
    
    this.Emit = function (key, msg) {
        if (_socketContext)
        {
            _socketContext.emit(key, msg);
        }
    }

    this.Refresh = function () {
        self.LastUpdate = new Date();
    };
    this.Disconnect = function () {
        for (var i = 0; i < _onTimeout.length; i++) {
            _onDisconnect[i]();
        };
    };
    this.OnDisconnect = function (func) {
        _onDisconnect.push(func);
    };
    this.Timeout = function () {
        for (var i = 0; i < _onTimeout.length; i++) {
            _onTimeout[i]();
        };
    };
    this.OnTimeout = function (func) {
        _onTimeout.push(func);
    };
    this.Destroy = function () {
        for (var i = 0; i < _onDestroy.length; i++) {
            _onDestroy[i]();
        };
        
    };
    this.OnDestroy = function (func) {
        _onDestroy.push(func);
    };
};