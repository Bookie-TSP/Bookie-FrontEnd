app.controller('orderCtrl', ['$scope', '$http', '$state', 'authFactory',
	function ($scope, $http, $state, authFactory) {
		if (authFactory.getAuth() === undefined) {
			$state.go('login');
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
	}
]);