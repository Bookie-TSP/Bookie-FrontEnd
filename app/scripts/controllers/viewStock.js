app.controller('stockCtrl', ['$scope', '$http', '$state', 'authFactory',
    function ($scope, $http, $state, authFactory) {
        if (authFactory.getAuth() === undefined) {
            $state.go("login");
        }

        $scope.getStocks = function(){
            $http.get('https://bookieservice.herokuapp.com/api/mystocks', authFactory.getConfigHead())
                .success(function(data){
                    console.log(data);
                    $scope.data = data;
                    $scope.line_stocks = data.line_stocks;
                    console.log($scope.line_stocks);
                })
                .error(function(data){
                    console.log(data);
                });
        };

        $scope.getStocks();
    }]);
