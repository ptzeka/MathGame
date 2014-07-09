module.exports = {
    "Authentication": function (socketContext) {

        if (socketContext.ProfileService.Profile().LoginState != 1) {
            socketContext.emit("Authenticate");
            return false;
        }
        return true;
    }
}