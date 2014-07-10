
MainApp.directive('form', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
        }
    };
});

MainApp.directive('numeric', function () {
    return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, element, attrs, model) {
            scope.$watch(attrs["ngModel"], function (newValue, oldValue) {
                if (newValue && !parseInt(newValue) && newValue != "-") {
                    model.$setValidity("numeric", false);
                }
                else {
                    model.$setValidity("numeric", true);
                }
            });
        }
    }
});

MainApp.directive('chatform', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$on("FormSubmitPost", function (args) {
                $("#chatInner").scrollTop($("div.chatItem", $("#chatInner")).last()[0].offsetTop);
            });
        }
    };
});