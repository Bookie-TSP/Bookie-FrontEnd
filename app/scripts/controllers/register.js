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

        $scope.email = '';
        $scope.password = '';
        $scope.password_confirmation = '';
        $scope.identification_number = '';
        $scope.first_name = '';
        $scope.last_name = '';
        $scope.phone_number = '';

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
            var checkError = false;
            $scope.errors = {};
            if (!$scope.agreeTerm) {
				$scope.errors.agree = 'Please agree term of conditions';
                checkError = true;
			}
            if($scope.email === ''){
                $scope.errors.email = 'Please insert your email';
                checkError = true;
            }
            if($scope.password === ''){
                $scope.errors.password = 'Please insert your password';
                checkError = true;
            }
            if($scope.first_name === ''){
                $scope.errors.first_name = 'Please insert your firstname';
                checkError = true;
            }
            if($scope.last_name === ''){
                $scope.errors.last_name = 'Please insert your lastname';
                checkError = true;
            }
            if($scope.identification_number === ''){
                $scope.errors.idnum = 'Please insert your identification number';
                checkError = true;
            }
            if($scope.phone_number === ''){
                $scope.errors.phone_number = 'Please insert your phone number';
                checkError = true;
            }
            if($scope.password_confirmation === ''){
                $scope.errors.pass_con = 'Please insert password confirmation';
                checkError = true;
            }
            if($scope.latitude === '' || $scope.longitude === ''){
                $scope.errors.add = 'Please select your address location';
                checkError = true;
            }
            console.log(!$scope.registerForm.$invalid);
            console.log(!$scope.registerForm2.$invalid);
            console.log(!checkError);

            if(!$scope.registerForm.$invalid && !$scope.registerForm2.$invalid && !checkError){
    			var birth_date = $scope.day_birth + '/' + ($scope.initMonths.indexOf($scope.month_birth)+1) + "/" + $scope.year_birth;
                var address_info = $scope.address;
                if( $scope.more_info !== undefined){
                    address_info = $scope.more_info + ' ' + address_info;
                }
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
                        $scope.errors.email = 'Email' + data.errors.email[0];
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
