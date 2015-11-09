app.controller('stockCtrl', ['$scope', '$http', '$state', 'authFactory',
	function ($scope, $http, $state, authFactory) {
		if (authFactory.getAuth() === undefined) {
			$state.go("login");
		}

        $scoep.getStock = function(){
            var config = {
                headers: {
                    'Authorization': authFactory.getAuth()
                }
            };
            $http.get('https://bookieservice.herokuapp.com/api/mystocks',config)
            .success(function(data){
                $scope.stoks = data;
            })
            .error(function(data){

            });
        };
}]);
