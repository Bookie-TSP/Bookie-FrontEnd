app.controller('addressCtrl',['$scope','$http', '$state', 'authFactory', '$rootScope', 'mapFactory',
    function($scope, $http, $state, authFactory, $rootScope, $map){
        if (authFactory.getAuth() === undefined) {
			$state.go('login');
		}

        $scope.info = '';
        $scope.initial = function(){
            $scope.address = authFactory.getMember().addresses[0];
            $scope.map = $map.map;
            $scope.marker = $map.marker;
            $scope.map.center = {
    			latitude: $scope.address.latitude,
    			longitude: $scope.address.longitude
    		};
            $scope.marker.coords = {
                latitude: $scope.address.latitude,
    			longitude: $scope.address.longitude
            };
            $scope.options = $map.options;
        };

        $scope.editAddress = function() {
            $scope.address.information = $scope.info + $scope.address.information;
            var config = {
				headers: {
					'Authorization': authFactory.getAuth()
				}
			};
            $http.post('https://bookieservice.herokuapp.com/api/members/edit_address',{
                address: $scope.address
            },config)
            .success(function(data){
                console.log(data);
                authFactory.setMember(data);
                $state.go('viewProfile');
            })
            .error(function(data){
                $scope.error = true;
                console.log(data);
            });

        };

        $scope.$on('marker', function () {
			console.log('marker');
            $scope.address.latitude = $map.getLat().toFixed(5);
            $scope.address.longitude = $map.getLng().toFixed(5);
            $scope.address.information = $map.getAddress();
            $scope.$digest();
		});

        $scope.initial();

}]);
