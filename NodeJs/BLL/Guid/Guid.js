var guidMgr = require('../../DAL/Guid/GuidMgr.js')

module.exports.Generate = function (prefix, bits) {
    var i = 0;
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
    var len = bits || 64;
    var id = prefix || "", charsetlen = charset.length, charIndex;

    // iterate on the length and get a random character for each position
    for (i = 0; len > i; i += 1) {
        charIndex = Math.random() * charsetlen;
        id += charset.charAt(charIndex);
    }

    if (guidMgr.Exists(id)) {
        return this.GenerateUniqueId(charset, len);
    }

    guidMgr.Add(id);

    return id;
}