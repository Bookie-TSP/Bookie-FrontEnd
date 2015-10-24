app.controller('cartCtrl',['$scope','$http', '$state',
    function ($scope, $http, $state, authFactory){
		if (authFactory.getAuth() !== undefined) {
			$state.go("home");
		}
		$scope.getCart = function() {
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