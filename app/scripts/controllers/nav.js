app.controller('navCtrl', ['$scope', '$http', '$state', 'authFactory', '$rootScope',
  function ($scope, $http, $state, authFactory, $rootScope) {
		$scope.goHome = function () {
			$state.go("home");
		};
		$scope.login = function () {
			$state.go("login");
		};
		$scope.logout = function () {
			authFactory.setAuth(undefined);
		};
		$scope.register = function () {
			$state.go("register");
		};
		$scope.profile = function () {
			console.log("asda");
			$state.go("viewProfile");
		};
		$scope.getMember = function () {
			if (authFactory.getAuth() !== undefined) {
				var config = {
					headers: {
						'Authorization': authFactory.getAuth()
					}
				};
				$http.get('https://bookieservice.herokuapp.com/api/myprofile', config)
					.success(function (data) {
						$rootScope.member = data;
                        authFactory.setMember(data);
					})
					.error(function (data) {
                        authFactory.setAuth(undefined);
						console.log(data);
					});
			} else {
				$rootScope.member = undefined;
			}
		};
		$rootScope.member = $scope.getMember();
		$scope.$on('authenticate', function () {
			console.log("Change");
			$rootScope.member = $scope.getMember();
		});
}]);
