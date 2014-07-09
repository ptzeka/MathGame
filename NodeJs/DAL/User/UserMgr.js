//todo move to db
var savedUsers = {};

module.exports = new function () {
    var self = this;
    this.Exists = function (username) {
        return new Promise(function (data) {
            for (var k in savedUsers)
            {
                if(savedUsers[k].UserName == username)
                    return { exists: true };
            }
            return { exists: false };
        })
    }

    this.GetUser = function(guid)
    {
        return new Promise(function (data) {
            return { UserInfo: savedUsers[guid] || null };
        });
    }

    this.SaveUser = function (guid, info) {
        return this.Exists(info.UserName).then(function (data) {
            if (!data.exists && guid) {
                console.log(info);
                var user = {};
                user.UserName = info.UserName;
                user.Guid = guid;
                savedUsers[guid] = user;
                return { saved: true };
            }
            return { saved: false }
        });
    }
}