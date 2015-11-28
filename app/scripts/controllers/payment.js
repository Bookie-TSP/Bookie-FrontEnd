app.controller('paymentCtrl',['$scope','$http', '$state', 'authFactory', '$rootScope',
    function ($scope, $http, $state, authFactory, $rootScope){
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

        $scope.paid = function() {
            $scope.emptyCart = false;
            var billing_name = $scope.billing_firstname + " " + $scope.billing_lastname;
            var payment = {
                billing_name: billing_name,
                billing_type: $scope.billing_type,
                billing_card_number: $scope.billing_card_number,
                billing_card_expire_date: $scope.billing_card_expire_date,
                billing_card_security_number: $scope.billing_card_security_number
            };
            $http.post('https://bookieservice.herokuapp.com/api/members/cart/checkout', {
                    payment: payment
                }, config)
                .success(function (data) {
                    console.log(data);
                    $rootScope.$broadcast('cart');
                    $state.go("home");
                })
                .error(function (data) {
                    if( data.errors === 'Your cart is empty'){
                        $scope.emptyCart = true;
                    }
                    console.log(data);
                });
        };

        //initialize
        $scope.getCart();
}]);
