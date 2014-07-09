
module.exports = new function () {

    function DefaultInfo()
    {
        return {
            UserGuid: "999999"
        }
    }

    this.Current = function(session)
    {

        return {
            Profile : function () {
                if (!session.Profile) {
                    var profile = new (require("./Profile.js"))();
                    profile.Update(DefaultInfo());
                    session.Profile = profile;
                    session.OnDestroy(function () {
                        profile.Destroy();
                    });

                    session.OnDisconnect(function () {
                        profile.Destroy();
                    });

                }
                return session.Profile;
            }
        }
    }

};