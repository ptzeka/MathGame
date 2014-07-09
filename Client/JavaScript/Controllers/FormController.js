function FormController($scope,$node)
{
    $scope.Model = {};
    $scope.Submit = function () {
        console.log($scope.Url)
        $node.once($scope.Url, $scope.Model).then(function (data) {
            if (data.Errors) {
                for (var i = 0; i < data.Errors.length; i++) {
                    for(var k in data.Errors[i])
                    {
                        if ($scope.MyForm[k]) {
                            $scope.MyForm[k].$error[data.Errors[i][k]] = true;
                        }
                    }
                }
            }
            if($scope.OnSubmit)
                $scope.OnSubmit($scope.MyForm);
            $scope.$digest();
        })
    }
}