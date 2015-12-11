app.controller('paymentCtrl',['$scope','$http', '$state', 'authFactory', '$rootScope',
    function ($scope, $http, $state, authFactory, $rootScope){
        $scope.getTotal = function() {
            $scope.total = 0;
            for(var i = 0, len = $scope.stocks.length; i < len; i++) {
                $scope.total += $scope.stocks[i].price;
            }
        };

        $scope.getCart = function() {
            $http.get('https://bookieservice.herokuapp.com/api/members/cart/show', authFactory.getConfigHead())
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
            if ($scope.billing_firstname === null || $scope.billing_lastname === null) {
                alert("Please input your name");
            } else if ($scope.billing_card_number === undefined) {
                alert("Please input card number");
            } else if ($scope.billing_card_security_number === undefined) {
                alert("Please input CVV");
            } else if ($scope.billing_card_number.length !== 16) {
                alert("Wrong card number");
            } else if ($scope.billing_card_security_number.length !== 3) {
                alert("Wrong CVV");
            } else if ($scope.expireMM === undefined || $scope.expireYY === undefined) {
                alert("Please input expirtion date");
            } else if ($scope.billing_type === undefined) {
                alert("Please input credit card type");
            } else {
                var billing_name = '';
                var billing_card_expire_date = '';
                if($scope.billing_firstname && $scope.billing_lastname){
                    billing_name = $scope.billing_firstname + " " + $scope.billing_lastname;
                }
                if($scope.expireMM && $scope.expireYY){
                    billing_card_expire_date = $scope.expireMM + "/" + $scope.expireYY;
                }
                var payment = {
                    billing_name: billing_name,
                    billing_type: $scope.billing_type,
                    billing_card_number: $scope.billing_card_number,
                    billing_card_expire_date: billing_card_expire_date,
                    billing_card_security_number: $scope.billing_card_security_number
                };
                console.log(payment);
                $http.post('https://bookieservice.herokuapp.com/api/members/cart/checkout', {
                        payment: payment
                    }, authFactory.getConfigHead())
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
            }
        };

        //initialize
        $scope.getCart();
}]);
