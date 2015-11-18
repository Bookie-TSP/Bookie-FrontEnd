app.controller('paymentCtrl',['$scope','$http', '$state', 'authFactory',
    function ($scope, $http, $state, authFactory){
        var config = {
            headers: {
                'Authorization': authFactory.getAuth()
            }
        };

        $scope.getTotal = function() {
            $scope.total = 0;
            for(var i = 0, len = $scope.stocks.length; i < len; i++) {
                $scope.total += $scope.stocks[i].price;
            }
        };

        $scope.getCart = function() {
            $http.get('https://bookieservice.herokuapp.com/api/members/cart/show',config)
            .success(function (data) {
                console.log(data);
                $scope.cart = data;
                $scope.stocks = $scope.cart.stocks;
                $scope.getTotal();
                $scope.countStocks();
                console.log($scope.total);
            })
            .error(function (data) {
                console.log(data);
            });
        };

        //initialize
        $scope.getCart();
}]);
