﻿String.prototype.startsWith = function (pattern) {
    var str = "" + this;
    var temp = str.toLowerCase();
    pattern = pattern.toLowerCase();
    return str && str.indexOf(pattern) == 0;
}

String.prototype.endsWith = function (pattern) {
    var str = "" + this;
    var temp = str.toLowerCase();
    pattern = pattern.toLowerCase();
    return str && str.lastIndexOf(pattern) == str.length - pattern.length;
}

String.prototype.trimStart = function (pattern) {
    var str = "" + this;
    var temp = str.toLowerCase();
    pattern = pattern.toLowerCase();
    if (temp.indexOf(pattern) == 0)
        return str.substring(pattern.length, str.length);
    return str; 
}

String.prototype.trimEnd = function (pattern) {
    var str = "" + this;
    var temp = str.toLowerCase();
    pattern = pattern.toLowerCase();
    if (temp.lastIndexOf(pattern) == str.length - pattern.length)
        return str.substring(0, str.length-pattern.length);
    return str;
}

String.prototype.trim = function () {
    var str = "" + this;
    return $.trim(str);
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

jQuery.fn.PopUp = String.prototype.PopUp = function (n) {
    function f() {
        t.remove(), !o || $("#popup")[0] || LightBox.Hide(), n && n.onclose && n.onclose.call(this, t)
    }
    var b = $(this),
        h = 15e3,
        u = null,
        o = !1,
        c = "",
        v = !0,
        a = !0,
        i = !1,
        p = "5px solid #555",
        y = "5px",
        w = "top:-15px;right:-15px",
        r = !1;
    n && (n.index && (h = n.index), n.button && (u = $(n.button)), n.width && (c = n.width + "px"), o = n.showLightBox || !1, v = n.showCloseButton == !1 ? !1 : !0, a = n.showCloseIcon == !1 ? !1 : !0, i = n.fixed ? !0 : !1, r = n.hide);
    var t = $('<div id="popup" class="PopUp Window" style="width:' + c + ";position:" + (i ? "fixed" : "absolute") + ";z-index:" + h + (r ? ";display:none;" : "") + '"></div>'),
        s = $('<span class="popUpClose popUpCloseQview" title="Close" style="' + w + (r ? ";display:none;" : "") + '"></span>'),
        l = $('<div class="formRow clear alignRight popFotSec " style="' + (r ? ";display:none;" : "") + '"></div>'),
        e = $('<a style="margin-right:10px' + (r ? ";display:none;" : "") + '" class="button BtnG" tabindex="0">Close</a>');
    t.on("Close", function () {
        t.Close()
    });
    return t.Close = f, e.click(f), e.keypress(function (n) {
        n.keyCode == 13 && f()
    }), s.click(f), a && t.append(s), t.append(this), l.append(e), v && t.append(l), n && n.relative && u ? u.parent().append(t) : $("#Body").append(t), o && LightBox.Show(), i && $(window).height() < t.height() + 150 && (t.css("position", "absolute"), i = !1), t.Reposition(u, i), t
};

jQuery.fn.Reposition = function () {
    element = $(this);
    element.show();
    var top = 0;
    var left = 0;        
    var d = {
        l: $(window).scrollLeft(),
        t: $(window).scrollTop(),
        w: $(window).width(),
        h: $(window).height()
    };

    console.log(d);
    var left = d.w / 2 + d.l - element.width() / 2;
    if (left < 0)
        left = 0;
    var top = d.h / 2 + d.t - element.height() / 2;
    if (top < 50)
        top = 50;
    element.css({
        top: top,
        left: left
    })
}