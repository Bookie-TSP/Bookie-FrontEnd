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

		$scope.sortOrder = function(order) {
            var date = new Date(order.created_at.substring(0, 10) + " " + order.created_at.substring(11, 19));
            return date;
        };

		$scope.getOrderInfo();
	}
]);
