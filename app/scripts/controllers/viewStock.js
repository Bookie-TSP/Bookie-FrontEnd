app.controller('stockCtrl', ['$scope', '$http', '$state', 'authFactory',
    function ($scope, $http, $state, authFactory) {
        if (authFactory.getAuth() === undefined) {
            $state.go("login");
        }

        $scope.getStock = function(){
            $http.get('https://bookieservice.herokuapp.com/api/mystocks', authFactory.getConfigHead())
                .success(function(data){
                    $scope.data = data;
                    $scope.stocks = data.line_stocks;
                    console.log($scope.stocks);
                })
                .error(function(data){

                });
        };

        $scope.getStock();
    }]);
