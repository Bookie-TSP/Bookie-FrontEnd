app.controller('orderCtrl', ['$scope', '$http', '$state', 'authFactory',
	function ($scope, $http, $state, authFactory) {
		if (authFactory.getAuth() === undefined) {
			$state.go('login');
		}

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
				})
				.error(function (data) {
					console.log(data);
				});
		}

		$scope.pendingContents = [{
			price: 120,
			name: "Harry Potter the next gen",
			orderDate: "12/04/14",
			status: "Ordered"
		},
		{
			price: 325,
			name: "Punpun and friends",
			orderDate: "12/04/14",
			status: "Confirmed"
		}];
		$scope.activeContents = [{
			price: 120,
			name: "Harry Potter the next gen",
			orderDate: "12/04/14",
			status: "Delivering"
		},
		{
			price: 325,
			name: "Punpun and friends",
			orderDate: "12/04/14",
			status: "Received"
		},
		{
			price: 114,
			name: "No one has returned",
			orderDate: "11/03/13",
			status: "Returning"
		}];
		$scope.endedContents = [{
			price: 120,
			name: "Harry Potter the next gen",
			orderDate: "12/04/14",
			status: "Ended"
		},
		{
			price: 325,
			name: "Punpun and friends",
			orderDate: "12/04/14",
			status: "Ended"
		}];
		$scope.getOrderInfo();
	}
]);