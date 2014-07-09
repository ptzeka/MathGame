var Promise = function (promises) {
    var self = this;
    var _toDigest = [];
    var _busy = [];
    var _digesting = false;
    var _args = {};
    promises = [].concat(promises);
    function digest() {
        if(!_digesting)
            _digesting = true;
        var promise = promises.shift();
        if (!promise)
        {
            if (_toDigest.length > 0) {
                promises = [].concat(_toDigest.shift());
                digest();
            }
            else
            {
                _digesting = false;
            }
        }
        else if (promise.resolve) {
            promise.resolve(function (args) {
                if (args)
                {
                    for (var k in args)
                        _args[k] = args[k];
                }
                digest();
            })
        }
        else if (promise.call) {
            var response = promise(_args);
            if (response && (response.resolve || response.call)) {
                promises.unshift(response);
            }
            else if (response instanceof Object) {
                for (var k in response)
                    _args[k] = response[k];
            }
            digest();
        }
    }

    this.resolve = function (callback) {
        self.then(function () {
            callback(_args);
        });
        return self;
    };

    this.then = function (callback) {
        _toDigest.push([].concat(callback));
        if(!_digesting)
            digest();
        return self;
    }
    digest();
};