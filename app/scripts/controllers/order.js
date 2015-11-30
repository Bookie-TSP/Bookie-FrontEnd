app.controller('orderCtrl', ['$scope', '$http', '$state', 'authFactory',
	function ($scope, $http, $state, authFactory) {
		if (authFactory.getAuth() === undefined) {
			$state.go('login');
		}

		$scope.dataReady = false;

		$scope.getOrderInfo = function() {
			var config = {
					headers: {
						'Authorization': authFactory.getAuth()
					}
				};
			$http.get('https://bookieservice.herokuapp.com/api/myorders', config)
				.success(function (data) {
					$scope.orderInfo = data;
					console.log(data);
					$scope.dataReady = true;
				})
				.error(function (data) {
					console.log(data);
				});
		}
		
		$scope.getOrderInfo();
	}
]);