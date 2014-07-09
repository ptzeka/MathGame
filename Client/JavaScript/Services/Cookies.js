

MainApp.service('$cookies', ['$rootScope', function ($rootScope) {

    this.Get = function (name) {
        var cookies = document.cookie;
        if (cookies) {
            cookies = cookies.split(";");
            if (cookies.length > 0) {
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i].split("=");
                    if (cookie.length == 2 && cookie[0].trim() == name) {
                        return cookie[1];
                    }
                }
            }
        }
    }
    this.Set = function (name,value,expires) {

        var cookies = document.cookie;
        if (expires)
            expires = ";expires=" + (new Date()).addDays(expires) + ";path=/";
        else
            expires = "";
        document.cookie = name + "=" + value + expires;
    }

}]);