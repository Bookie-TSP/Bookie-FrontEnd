app.controller('orderCtrl', ['$scope', '$http', '$state', 'authFactory',
	function ($scope, $http, $state, authFactory) {
		if (authFactory.getAuth() === undefined) {
			$state.go('login');
		}

		// Load data
		$scope.getOrderInfo = function() {
			$http.get('https://bookieservice.herokuapp.com/api/myorders', authFactory.getConfigHead())
				.success(function (data) {
					$scope.orderInfo = data;
					console.log(data);
				})
				.error(function (data) {
					console.log(data);
				});
		};

		$scope.getOrderInfo();
	}
]);
