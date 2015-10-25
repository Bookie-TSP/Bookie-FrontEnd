app.controller('registerCtrl', ['$scope', '$http', 'mapFactory', '$state', 'authFactory',
        function ($scope, $http, $map, $state, authFactory) {
		if (authFactory.getAuth() !== undefined) {
			$state.go("home");
		}
        $scope.initDate = function() {
            $scope.initDates = new Array(31);
            for( var i = 1; i <=31 ; i++ ){
                $scope.initDates[i-1] = i;
            }
            $scope.initMonths = ["January", "February", "March", "April", "May",
                                "June", "July", "August", "September", "October",
                                "November", "December"];
            var d = new Date();
            var n = d.getFullYear();
            $scope.initYears = new Array(100);
            for( i = 0; i < 100; i++ ){
                $scope.initYears[i] = n-i;
            }
        };

		$scope.submit = function () {
			var birth_date = $scope.day_birth + "/" + ($scope.initMonths.indexOf($scope.month_birth)+1) + "/" + $scope.year_birth;
			var address_info = $scope.more_info + " " + $scope.address;

			if (!$scope.agreeTerm) {
				alert("Please agree the term of condition");
			} else {
				var member = {
					email: $scope.email,
					password: $scope.password,
					password_confirmation: $scope.password_confirmation,
					first_name: $scope.first_name,
					last_name: $scope.last_name,
					phone_number: $scope.phone_number,
					identification_number: $scope.identification_number,
					gender: $scope.gender,
					birth_date: birth_date
				};
				var address = {
					first_name: $scope.first_name,
					last_name: $scope.last_name,
					latitude: $scope.latitude,
					longitude: $scope.longitude,
					information: address_info
				};

				//send member&address
				$http.post('https://bookieservice.herokuapp.com/api/members', {
						member: member,
						address: address
					})
					.success(function (data) {
						console.log(data);
						$state.go("login");
					})
					.error(function (data) {
						console.log(data);
						alert("error : " + data.errors);
					});
			}
		};

        $scope.position = function() {
            $scope.latitude = $map.getLat().toFixed(5);
            $scope.longitude = $map.getLng().toFixed(5);
            $scope.address = $map.getAddress();
        };

        $scope.initial = function() {
            $scope.initDate();
            $scope.map = $map.map;
            $scope.marker = $map.marker;
            $scope.options = $map.options;
            $scope.position();
        };
        $scope.$on('marker', function () {
			console.log("marker");
            $scope.position();
            console.log($scope.latitude);
            console.log($scope.longitude);
            console.log($scope.address);
		});
        $scope.initial();
}]);
