app.controller('editProfileCtrl', ['$scope', '$http', 'googleMap', 'authFactory', '$q', '$state',
	function ($scope, $http, googleMap, authFactory, $q, $state) {
		if (authFactory.getAuth() === undefined) {
			$state.go("home");
		}
		$scope.profileData = {};
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
						console.log(data);
					})
					.error(function (data) {
						console.log(data);
					})
			])
			.then(function () {
				if($scope.profileData.birth_date !== null){
					birth = $scope.profileData.birth_date.split("-");
					$scope.date = birth[2];
					$scope.month = birth[1];
					$scope.year = birth[0];
				}
			});
		};
		$scope.getProfile();

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
					console.log(data);
					$state.go("viewProfile");
				})
				.error(function (data) {
					console.log(data);
				});
		};
	}
]);
