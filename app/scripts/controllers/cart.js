app.controller('cartCtrl',['$scope','$http', '$state', 'authFactory', '$rootScope',
    function ($scope, $http, $state, authFactory, $rootScope){
        // check authentication
        if (authFactory.getAuth() === undefined) {
			$state.go('login');
		}

        // get total price
        $scope.getTotal = function() {
            $scope.total = 0;
            for(var i = 0, len = $scope.stocks.length; i < len; i++) {
                $scope.total += $scope.stocks[i].price;
            }
        };

        // count num stock in each type
        $scope.countStocks = function() {
            $scope.buyLength = 0;
            for(var i = 0; i < $scope.stocks.length; i++){
                if($scope.stocks[i].type === 'sell'){
                    $scope.buyLength++;
                }
            }

            $scope.rentLength = 0;
            for(var j = 0; j < $scope.stocks.length; j++){
                if($scope.stocks[j].type === 'lend'){
                    $scope.rentLength++;
                }
            }
        };

        // get cart
        $scope.getCart = function() {
            $http.get('https://bookieservice.herokuapp.com/api/members/cart/show', authFactory.getConfigHead())
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

        // remove stock
        $scope.removeStock = function(id) {
            $http.post('https://bookieservice.herokuapp.com/api/members/cart/remove',{
                stock: {
                    stock_id: id
                }
            }, authFactory.getConfigHead())
            .success(function(data){
                $rootScope.$broadcast('cart');
                $scope.cart = data;
                $scope.stocks = $scope.cart.stocks;
                $scope.getTotal();
                $scope.countStocks();
            })
            .error(function(data){
                console.log(data);
            });
        };

        //initialize
        $scope.getCart();
}]);
