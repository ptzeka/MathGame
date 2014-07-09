
MainApp.directive('pausebar', function () {
    return {
        restrict: 'A',
        template: "<div class='progressBar' style='display:none;'><div class='progress' style='width:0%;'></div></div>",
        link: function (scope, element, attrs) {

            scope.$watch("PauseInfo.PauseEnd", function (newValue, oldValue) {
                if (newValue > 0) {
                    $("div.progressBar", element).show();
                    var time = scope.PauseInfo.PauseEnd - scope.PauseInfo.PauseCurrent;
                    var percent = ((scope.PauseInfo.PauseTime - time) / scope.PauseInfo.PauseTime)    * 100;
                    $("div.progress",element).css("width", (percent + "%")).stop().animate({ width: "100%" }, time);
                }
                else
                {
                    $("div.progressBar", element).hide();
                }
            });
        }
    };
});