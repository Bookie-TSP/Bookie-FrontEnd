app.controller('newStockCtrl', ['$scope', '$http', '$state', 'authFactory', '$rootScope',
	function ($scope, $http, $state, authFactory, $rootScope) {
		if (authFactory.getAuth() === undefined) {
			$state.go('login');
		}
        $state.go("newStock.first");
	}
]);
