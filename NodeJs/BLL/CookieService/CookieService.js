
module.exports = new function(){

    this.Current = function (socketContext) {

        return {
            Get : function (name) {
                var cookies = socketContext.handshake.headers.cookie;
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
                return null;
            },
            Set : function (name, value, expires) { //expires in days
                return;
                var cookies = socketContext.handshake.headers.cookie.split(";");
                if (expires)
                    expires = ";expires=" + (new Date()).addDays(expires) + ";path=/";

                if (cookies && cookies.length > 0) {
                    var found = false;
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = cookies[i].split("=");
                        if (cookie.length == 2 && cookie[0].trim() == name) {
                            cookies[i] = name + "=" + value;// + expires;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        cookies.push(name + "=" + value);// + expires);
                    }
                    //console.log(cookies.join(";"))
                    $$SessionService.Session().SocketContext.handshake.headers.cookie = cookies.join(";");
                }
                else {
                    console.log('--');
                    $$SessionService.Session().SocketContext.handshake.headers.cookie = cookie + "=" + value;// + expires;

                }
            }
        }
    }
};