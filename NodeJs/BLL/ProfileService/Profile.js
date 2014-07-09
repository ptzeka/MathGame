module.exports = function () {
    var self = this;
    var _onDestroy = [];
    this.UserName = "";
    this.Name = "";
    this.LastName = "";
    this.UserGuid = null;
    this.LoginState = 0;

    this.Update = function (userInfo) {
        if (userInfo) {
            this.UserName = userInfo.UserName;
            this.UserGuid = userInfo.Guid;
        }
    }

    this.ToJSon = function () {
        var obj = {};
        obj.Name = self.Name;
        obj.LastName = self.LastName;
        obj.UserName = self.UserName;
        obj.LoginState = self.LoginState;
        return obj;
    }

    this.OnDestroy = function (func) {
        _onDestroy.push(func);
    };
    this.Destroy = function () {
        for(var i=0;i<_onDestroy.length;i++)
        {
            _onDestroy[i]();
        }
    }

}