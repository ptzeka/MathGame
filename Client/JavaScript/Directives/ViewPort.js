
MainApp.directive('viewport', function ($rootScope,$node) {
    return {
        restrict: 'E',
        templateUrl: "Templates/ViewPort.html",
        link: function (scope, element, attrs) {
            element.hide();
            scope.$watch("Question", function (newValue, oldValue) {
                if(newValue != oldValue)
                {

                }
            });

            scope.$watch("Responder", function (newValue, oldValue) {
                if(newValue != oldValue)
                {
                    console.log("responder");
                    console.log(newValue);
                }
            });

            scope.$watch("Paused", function (newValue, oldValue) {
                if(newValue)
                {
                    $("#AnswerText").prop('disabled', true);
                    $("#SubmitAnswer").prop('disabled', true);
                }
                else
                {
                    $("#AnswerText").prop('disabled', false);
                    $("#SubmitAnswer").prop('disabled', false);
                }
            });

            scope.ShowViewPort = function () {
                element.show();
            }
            scope.HideViewPort = function () {
                element.empty();
            }
        }
    };
});