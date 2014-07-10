function FormController($scope,$node)
{
    $scope.Model = {};
    $scope.Submit = function () {
        var _submitting = false;
        if ($scope.MyForm.$valid && !_submitting) {
            var _submitting = true;
            $node.once($scope.Url, $scope.Model).then(function (data) {
                if (data.Errors) {
                    for (var i = 0; i < data.Errors.length; i++) {
                        for (var k in data.Errors[i]) {
                            if ($scope.MyForm[k]) {
                                $scope.MyForm[k].$error[data.Errors[i][k]] = true;
                            }
                        }
                    }
                }

                for (var k in data) {
                    $scope.Model[k] = data[k];
                }

                $scope.$emit("FormSubmitPost", { formData: $scope.MyForm });

                $scope.$digest();
            });
            $scope.$emit("FormSubmit", { formData: $scope.MyForm });
            _submitting = false;
        }
    }
}