module.exports = function (socket,route,callback) {
    
    var  _requirements = [];
    var _filters = require("../Filters/Filters.js");

    function Validate() {
        var errors = 0;
        for(var i=0;i<_requirements.length;i++)
        {
            var filter = _filters[_requirements[i]]
            if (filter && filter instanceof Function)
            {
                var valid = filter(socket);
                if (!valid)
                    errors++;
            }
        }
        return errors == 0;
    }

    socket.on(route, function (data) {
        if (Validate()) {
            callback(data);
        }
    })

    this.Requires = function (requirements) {
        _requirements = _requirements.concat(requirements);
    }
}