app.controller('completeStockCtrl', ['$scope', '$http', '$state', '$rootScope', 'authFactory',
    function ($scope, $http, $state, $rootScope, authFactory) {
        $scope.confirmStock = function(){
            var config = {
    			headers: {
    				'Authorization': authFactory.getAuth()
    			}
    		};
            $http.post('https://bookieservice.herokuapp.com/api/members/stocks',{
                stock: $rootScope.newStock
            }, config)
            .success(function(data){
                console.log(data);
                $state.go("home");
            })
            .error(function(data){
                console.log(data);
            });
        };
}]);
