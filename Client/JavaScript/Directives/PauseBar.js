
MainApp.directive('pausebar', function () {
    return {
        restrict: 'A',
        template: "<div class='pauseBar' ng-show='PauseInfo.PauseEnd > 0'><span class='progressBar'><span class='progress' style='width:0%;'></span></span><label class='S formLabel'>Loading next question!</label></div>",
        link: function (scope, element, attrs) {

            scope.$watch("PauseInfo.PauseEnd", function (newValue, oldValue) {
                if (newValue > 0) {
                    var time = scope.PauseInfo.PauseEnd - scope.PauseInfo.PauseCurrent;
                    var percent = ((scope.PauseInfo.PauseTime - time) / scope.PauseInfo.PauseTime)    * 100;
                    $("span.progress",element).css("width", (percent + "%")).stop().animate({ width: "100%" }, time);
                }
            });
        }
    };
});