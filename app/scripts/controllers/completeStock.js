app.controller('completeStockCtrl', ['$scope', '$http', '$state', '$rootScope', 'authFactory',
    function ($scope, $http, $state, $rootScope, authFactory) {
        $rootScope.changeStep(4);

        $scope.confirmStock = function(){
            $http.post('https://bookieservice.herokuapp.com/api/members/stocks',{
                stock: $rootScope.newStock
            }, authFactory.getConfigHead())
            .success(function(data){
                console.log(data);
                $rootScope.$broadcast('addDone');
                $state.go("home");
            })
            .error(function(data){
                console.log(data);
            });
        };
}]);
