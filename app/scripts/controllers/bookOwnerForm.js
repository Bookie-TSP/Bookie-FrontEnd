app.controller('bookOwnerFormCtrl', ['$scope', '$http', '$state', 'authFactory',
    function ($scope, $http, $state, authFactory) {
        if (authFactory.getAuth() === undefined) {
            $state.go("login");
        }
        $scope.submit = function () {
            console.log($scope.order_id);
            $http.post('https://bookieservice.herokuapp.com/api/members/orders/returned',{
                "order" : {
                    "order_id": $scope.order_id,
                    "stock_id": $scope.stock_id
                }
            }, authFactory.getConfigHead())
                .success(function (data) {
                    console.log(data);
                    $state.go('home');
                })
                .error(function (data) {
                    console.log(data);
                });
        };
    }]);
