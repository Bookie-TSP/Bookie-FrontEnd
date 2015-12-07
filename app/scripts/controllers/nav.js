app.controller('navCtrl', ['$scope', '$http', '$state', 'authFactory', '$rootScope',
  function ($scope, $http, $state, authFactory, $rootScope) {
		$scope.totalPrice = 0;
		$scope.totalCount = 0;
		$scope.logout = function () {
			authFactory.setAuth(undefined);
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

		$scope.getCart = function () {
			if (authFactory.getAuth() !== undefined) {
				var config = {
					headers: {
						'Authorization': authFactory.getAuth()
					}
				};
				$http.get('https://bookieservice.herokuapp.com/api/members/cart/show', config)
					.success(function (data) {
						$scope.totalPrice = 0;
						$scope.totalCount = 0;
						$scope.stocks = data.stocks;
						for (var i = 0; i < $scope.stocks.length; i++) {
							$scope.totalPrice += $scope.stocks[i].price;
							$scope.totalCount++;
						}
					})
					.error(function (data) {
						authFactory.setAuth(undefined);
						console.log(data);
					});
			} else {
				$scope.totalPrice = 0;
				$scope.totalCount = 0;
			}
		};

        $scope.test = function() {
            console.log($state.current.name);
        }

		$rootScope.member = $scope.getMember();
		$scope.getCart();
		$scope.$on('authenticate', function () {
			$rootScope.member = $scope.getMember();
		});

		$scope.$on('cart', function () {
			$scope.getCart();
		});
}]);
