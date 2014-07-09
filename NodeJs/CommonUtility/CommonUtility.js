String.prototype.replaceAll = function (pattern,value) {
    return this.split(pattern).join(value);
};

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.trimEnd = function (pattern) {
    var str = "" + this;
    return pattern && str[str.length - 1] == pattern ? str.substring(0, str.length - 1) : str.replace(/\s*$/g, "")
}

String.prototype.trimStart = function (pattern) {
    var str = "" + this;
    return pattern && str[0] == pattern ? str.substring(1, t.length) : str.replace(/^\s*/g, "")
}


EXTEND = function (to, from) {
    for (i in from) {
        var item = from[i];
        if (item != null)
            to[i] = item;
    };
    return to;
}
EACH = function (obj, fn) {
    if (obj) {
        if (obj.length >= 0 && fn) {
            var i = 0;
            var l = obj.length;
            for (; i < l;) {
                fn.call(obj[i], i, obj[i++]);
            }
        }
        else {
            var i = 0;
            for (name in obj) {
                var brk = fn.call(i++, name, obj[name]);
                if (brk == false)
                    break;
            }
        }
    }
}

Date.prototype.addDays = function (days) {
    if (typeof days == "number") {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    }
    else
        return this;
}