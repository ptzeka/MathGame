
var EventId = 0;
var ListenerId = 0;

/*========== Events
====================================================================================================*/

var EventEngine = new function () {

    var _listeners = {};
    var _listenersCount = 0;
    var _events = [];

    this.Trigger = function (event) { // events that have been triggered
        _events[event.Id] = event;
        CheckListeners();
        delete event;
    };
    AddListener = function (listener) {
        if (!_listeners[listener.Type])
            _listeners[listener.Type] = {};
        _listeners[listener.Type][listener.Id] = listener;
        _listenersCount++;
    };
    RemoveListener = function (listener) {
        if (listener[listener.Type]) {
            delete _listeners[listener.Type][listener.Id];
            _listenersCount--;
        };
    };

    function CheckListeners() {
        if (_listenersCount > 0) {
            var e = _events;
            var list = _listeners;
            _events = {};

            for (var i in e) {
                var event = e[i];
                var list = _listeners[event.Type]
                if (list) {
                    for (var k in list) {
                        listener = list[k];
                        try {
                            listener.Trigger(event.Sender, event.Args);
                        }
                        catch(ex)
                        {
                            console.log('listeer failed')
                            console.log(listener);
                            console.log(ex)
                        }
                    }
                }
            }
        }
    };

};


$$Trigger = function (type, sender, args) {


    return new function () {
        this.Id = EventId++;
        this.Sender = sender;
        this.Type = type;
        this.Args = args;
        EventEngine.Trigger(this);
    }
}



/*========== Listeners
====================================================================================================*/
$$Listen = function(type, ontrigger) {

    return new function () {
        this.Trigger = function (sender, args) {
            ontrigger.call(ontrigger, sender, args);
        };
        this.Resume = function () {
            AddListener(this);
        };
        this.Stop = function () {
            EventEngine.RemoveListener(this);
        };
        this.Destroy = function () {
            Engine.RemoveListener(this);
            delete this;
        };
        if (ontrigger) {
            this.Type = type;
            this.Id = ListenerId++;
            AddListener(this);
        }
    }
}
