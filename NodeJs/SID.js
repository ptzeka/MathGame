var guid = require("./Bll/Guid/Guid.js");


exports.RND = Math.random();

module.exports.Get = function(){
    return guid.Generate("SID");
}
