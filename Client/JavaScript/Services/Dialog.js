MainApp.service("dialog", ["$compile", "$http", "$rootScope", "$templateCache", "$q", function ($compile, $http, $rootScope, $templateCache, $q) {
    var config = {};
    return new function () {

        function GetTemplate(templatePath, callback) {
            var template = $templateCache.get(templatePath);
            if (!template) {

                $http.get(templatePath, { headers: { "X-Requested-With": "XMLHttpRequest" } }).success(function (data) {
                    $templateCache.put(templatePath, data);
                    callback(data);
                });
            }
            else {
                callback(template);
            }
        }

        this.$open = function (templatePath, urlOrModel, args, options) {
            var popup = null;
            function success(data, template) {
                var scope = $rootScope.$new();
                template = $("<div></div>").html(template, true);
                options = angular.extend(config, options);
                var onClose = options.onclose;
                options.onclose = function () {
                    if (onClose)
                        onClose();
                    scope.$destroy();
                    delete scope;
                };
                angular.extend(scope, data);
                $compile(template)(scope);
                popup = template.PopUp(options);
            };

            GetTemplate(templatePath, function (template) {
                if ((typeof urlOrModel).toLowerCase() == "string") {
                    $http.get(urlOrModel, args || {}).success(function (data) {
                        success(data, template)
                    });
                }
                else {
                    success(urlOrModel, template);
                }
            });
            return {
                Close: function () {
                    if (popup)
                        popup.Close();
                }
            }
        }
    };
}]);

