app.controller('bookCatalogCtrl', ['$scope', '$http', '$state', 'authFactory',
function ($scope, $http, $state, authFactory) {
		if (authFactory.getAuth() === undefined) {
			$state.go("home");
		}
		
}])