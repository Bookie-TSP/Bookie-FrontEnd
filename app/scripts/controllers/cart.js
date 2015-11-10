app.controller('cartCtrl',['$scope','$http', '$state', 'authFactory',
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
                console.log($scope.total);
            })
            .error(function (data) {
                console.log(data);
            });
        };
        $scope.removeStock = function(id) {
            console.log(id);
            $http.post('https://bookieservice.herokuapp.com/api/members/cart/remove',{
                stock: {
                    stock_id: id
                }
            },config)
            .success(function(data){
                $scope.cart = data;
                $scope.stocks = $scope.cart.stocks;
            })
            .error(function(data){
                console.log(data);
            });
        };
        $scope.getCart();
}]);
