app.controller('cartCtrl',['$scope','$http', '$state', 'authFactory',
    function ($scope, $http, $state, authFactory){
        var config = {
            headers: {
                'Authorization': authFactory.getAuth()
            }
        };
		$scope.getCart = function() {
            $http.get('https://bookieservice.herokuapp.com/api/members/cart/show',config)
            .success(function (data) {
                console.log(data);
                $scope.cart = data;
                $scope.stocks = $scope.cart.stocks;
            })
            .error(function (data) {
                console.log(data);
            });
        };
        // $scope.removeStock = function(id) {
        //     $http.post('https://bookieservice.herokuapp.com/api/members/cart/remove',{
        //         stock_id: id
        //     },config)
        //     .success(function(data){
        //         $scope.cart = data;
        //         $scope.stocks = $scope.cart.stocks;
        //     })
        //     .error(function(data){
        //         console.log(data);
        //     });
        // };
        $scope.getCart();
}]);
