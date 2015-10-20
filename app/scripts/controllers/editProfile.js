app.controller('editProfileCtrl', ['$scope', '$http', 'googleMap', 'authFactory', '$q', '$state',
	function ($scope, $http, googleMap, authFactory, $q, $state) {
		if (authFactory.getAuth() === undefined) {
			$state.go("login");
		}

		$scope.getProfile = function () {
			console.log("Getting the profile");
			var config = {
				headers: {
					'Authorization': authFactory.getAuth()
				}
			};
			var birth = "";
			$q.all([
					$http.get('https://bookieservice.herokuapp.com/api/myprofile', config)
					.success(function (data) {
						$scope.profileData = data;
						authFactory.setMember(data);
						$scope.profileData = authFactory.getMember();
						console.log(data);
					})
					.error(function (data) {
						console.log(data);
					})
			])
			.then(function () {
				$scope.setDate();
				$state.go("viewProfile");
			});
		};

		$scope.setDate = function () {
			if($scope.profileData.birth_date !== null){
				birth = $scope.profileData.birth_date.split("-");
				$scope.date = birth[2];
				$scope.month = birth[1];
				$scope.year = birth[0];
			}
		};

		$scope.editProfile = function () {
			console.log("Editing the profile");
			var config = {
				headers: {
					'Authorization': authFactory.getAuth()
				}
			};
			var birth_date = $scope.date + "/" + $scope.month + "/" + $scope.year;
			$http.put('https://bookieservice.herokuapp.com/api/members', {
					member: {
						email: $scope.profileData.email,
						password: $scope.profileData.password,
						password_confirmation: $scope.profileData.password,
						first_name: $scope.profileData.first_name,
						last_name: $scope.profileData.last_name,
						phone_number: $scope.profileData.phone_number,
						identification_number: $scope.profileData.identification_number,
						gender: $scope.profileData.gender,
						birth_date: birth_date
					}
				}, config)
				.success(function (data) {
					$scope.profileData.password = "";
					$scope.getProfile();
					console.log(data);
				})
				.error(function (data) {
					console.log(data);
				});
		};

		$scope.initial = function () {
			$scope.profileData = authFactory.getMember();
			$scope.setDate();
		};

		$scope.backToViewProfile = function() {
			$state.go("viewProfile");
		}

		$scope.initial();
	}
]);