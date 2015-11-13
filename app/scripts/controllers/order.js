app.controller('orderCtrl', ['$scope', '$http', '$state', 'authFactory',
	function ($scope, $http, $state, authFactory) {
		if (authFactory.getAuth() === undefined) {
			$state.go('login');
		}
		$scope.pendingContents = [{
			price: 120,
			name: "Harry Potter the next gen",
			orderDate: "12/04/14",
			status: "Ordered",
			hasPaid: false
		},
		{
			price: 325,
			name: "Punpun and friends",
			orderDate: "12/04/14",
			status: "Confirmed",
			hasPaid: true
		}]
	}
]);