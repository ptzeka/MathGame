
MainApp.directive('fadeonchange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var toWatch = attrs["fadeonchange"];
            scope.$watch(toWatch, function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if (newValue == "")
                    {
                        element.stop().animate({"opacity":0},500)
                    }
                    else
                    {
                        element.stop().animate({ "opacity": 1 }, 500)
                    }
                }
            });
        }
    };
});