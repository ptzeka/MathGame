var ScriptPromise = function (url, async) {
    var self = this;
    if (async != false)
        async = true;
    if (!url.endsWith(".js"))
        url = url + ".js";
    this.resolve = function (callback) {
        $.ajax({
            url: url,
            async: async,
            dataType: "script",
            success: function () {
                if(callback)
                    callback();
            }
        });
    };
    return self;
}
