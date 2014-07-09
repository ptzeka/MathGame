MainApp.service("profileService", ["$node", function ($node) {
    return new function () {

        this.Profile = function () {
            return $node.once("/ProfileService/Profile");
        };

        this.Authenticate = function (username,password) {
           // return new Promise(new NodePromise("ProfileService/Authenticate", { username: username, password: password }))
        }
    };
}]);