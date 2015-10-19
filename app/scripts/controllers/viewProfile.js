app.controller('profileCtrl', ['$scope', '$http', '$state', 'authFactory',
function ($scope, $http, $state, authFactory) {
		if (authFactory.getAuth() === undefined) {
			$state.go("home");
		}
		$scope.profileData = authFactory.getMember();
		$scope.editProfile = function () {
			$state.go("editProfile");
		};
		$scope.editAddress = function () {
			$state.go("editAddress");
		};
}]);
