var userMgr = require("../../DAL/User/UserMgr.js");
module.exports = new function () {

    this.Current = function (profile) {
        return {
            RemoveUser: function(guid){
                return userMgr.RemoveUser(guid);
            },
            CreateUser: function (data) {
                var self = this;
                return userMgr.Exists(data.UserName).then(function (args) {
                    if (!args.exists) {
                        return {Guid : require("../Guid/Guid.js").Generate("G")};
                    }
                }).then(function(args){
                    if (args.Guid)
                        return userMgr.SaveUser(args.Guid,data);
                }).then(function (args) {
                    if (args.saved) {
                        return self.GetUserInfo(args.Guid);
                    }
                }).then(function (args) {
                    if (args.UserInfo) {
                        self.Authenticate();
                    }
                });
            },
            GetUserInfo: function(guid){
                var self = this;
                return userMgr.GetUser(guid).then(function (args) {
                    if (args.UserInfo) {
                        profile.Update(args.UserInfo);
                    }
                })
            },
            Authenticate : function(){
                profile.LoginState = 1;
                
            },
            Login : function (username,password) {
                
            }
        }
    }    
}