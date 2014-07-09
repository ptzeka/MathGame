module.exports = function () {
    var _cache = {};
    this.Add = function (name, obj) {
        _cache[name] = obj;
    };
    this.Remove = function (name) {
        delete _cache[name];
    };
    this.Clear = function () {
        _cache = {};
    };
}