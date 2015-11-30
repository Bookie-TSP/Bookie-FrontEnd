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
            $scope.error = '';
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
            if ($scope.billing_firstname == null || $scope.billing_lastname == null ||
                $scope.billing_firstname == '' || $scope.billing_lastname == '') {
                $scope.error = 'Please input your name';
            } else if ($scope.billing_card_number == undefined) {
                $scope.error = 'Please input card number';
            } else if ($scope.billing_card_security_number == undefined) {
                $scope.error = 'Please input CVV';
            } else if ($scope.billing_card_number.length !== 16) {
                $scope.error = 'Wrong card number';
            } else if ($scope.billing_card_security_number.length !== 3) {
                $scope.error = 'Wrong CVV';
            } else if ($scope.expireMM == undefined || $scope.expireYY == undefined) {
                $scope.error = 'Please input expirtion date';
            } else if ($scope.billing_type == undefined) {
                $scope.error = 'Please input credit card type';
            } else {
                var billing_name = $scope.billing_firstname + " " + $scope.billing_lastname;
                var billing_card_expire_date = $scope.expireMM + "/" + $scope.expireYY;
                var payment = {
                    billing_name: billing_name,
                    billing_type: $scope.billing_type,
                    billing_card_number: $scope.billing_card_number,
                    billing_card_expire_date: billing_card_expire_date,
                    billing_card_security_number: $scope.billing_card_security_number
                };

                $http.post('https://bookieservice.herokuapp.com/api/members/cart/checkout', {
                    payment: payment }, config)
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