app.controller('registerCtrl', ['$scope', '$http', 'mapFactory', '$state', 'authFactory', 'dateFactory',
        function ($scope, $http, $map, $state, authFactory, $date) {
		if (authFactory.getAuth() !== undefined) {
			$state.go('home');
		}

        // initialize data
        $scope.latitude = '';
        $scope.longitude = '';
        $scope.address = '';
        $scope.more_info = '';

        // errors
        $scope.errors = {};

        // create date date for select
        $scope.initDate = function() {
            $scope.initDates = $date.days;
            $scope.initMonths = $date.months;
            $scope.initYears = $date.years;
		};

        // register
		$scope.submit = function () {
            $scope.errors = {};
			var birth_date = $scope.day_birth + '/' + ($scope.initMonths.indexOf($scope.month_birth)+1) + "/" + $scope.year_birth;
            var address_info = $scope.address;
            if( $scope.more_info !== undefined){
                address_info = $scope.more_info + ' ' + address_info;
            }


			if (!$scope.agreeTerm) {
				$scope.errors.agree = 'Please agree term of conditions';
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
					});
			}
		};

        // initialize function
        $scope.initial = function() {
            $scope.initDate();
            $scope.map = $map.map;
            $scope.marker = $map.marker;
            $scope.options = $map.options;
        };

        // watch marker in map
        $scope.$on('marker', function () {
			console.log("marker");
            $scope.latitude = $map.getLat().toFixed(5);
            $scope.longitude = $map.getLng().toFixed(5);
            $scope.address = $map.getAddress();
            $scope.$digest();
		});

        $scope.initial();
}]);
