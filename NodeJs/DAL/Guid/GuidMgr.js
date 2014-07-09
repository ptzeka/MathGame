//todo save to db?
var bucket = {};
module.exports = new function () {
    
    this.Exists = function (sid) {
        return bucket[sid] || false;
    };
    this.Add = function (sid) {
        bucket[sid] = true;
    };
    this.Remove = function (id) {
        delete bucket[sid];
    }
}

