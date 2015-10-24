app.controller('cartCtrl',['$scope','$http', '$state', 'authFactory',
    function ($scope, $http, $state, authFactory){
		$scope.getCart = function() {
            var config = {
                headers: {
                    'Authorization': authFactory.getAuth()
                }
            };
            $http.get('https://bookieservice.herokuapp.com/api/members/cart/show',config)
            .success(function (data) {
                console.log(data);
                $scope.stocks = data.stocks;
            })
            .error(function (data) {
                console.log(data);
            })
        };
        $scope.getCart();
}]);