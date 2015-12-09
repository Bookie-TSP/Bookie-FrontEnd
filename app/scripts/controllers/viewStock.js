app.controller('stockCtrl', ['$scope', '$http', '$state', 'authFactory',
    function ($scope, $http, $state, authFactory) {
        if (authFactory.getAuth() === undefined) {
            $state.go("login");
        }

        $scope.getStock = function(){
            var config = {
                headers: {
                    'Authorization': authFactory.getAuth()
                }
            };
            console.log(authFactory.getAuth());
            $http.get('https://bookieservice.herokuapp.com/api/mystocks', config)
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
