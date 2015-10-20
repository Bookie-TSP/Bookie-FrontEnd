app.controller('registerCtrl', ['$scope', '$http', 'googleMap', '$state', 'authFactory',
        function ($scope, $http, googleMap, $state, authFactory) {
		if (authFactory.getAuth() !== undefined) {
			$state.go("home");
		}
        googleMap.init();
		setInterval(function () {
			// console.log(googleMap.position);
		}, 1000);
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
			var address_info = googleMap.position.address + " " + $scope.more_info;

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
					latitude: googleMap.position.lat,
					longitude: googleMap.position.lng,
					information: address_info
				};

				//send member&address
				$http.post('https://bookieservice.herokuapp.com/api/members', {
						member: member,
						address: address
					})
					.success(function (data) {
						console.log(data);
						authFactory.setAuth(data.auth_token);
						$state.go("login");
					})
					.error(function (data) {
						console.log(data);
						alert("error : " + data.errors);
					});
			}
		};

        $scope.initial = function() {
            $scope.initDate();
        };
        $scope.initial();
}]);
