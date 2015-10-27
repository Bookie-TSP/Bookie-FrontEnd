app.controller('bookCatalogCtrl', ['$scope', '$http', '$state', 'authFactory',
function ($scope, $http, $state, authFactory) {
		//no need for auth factory
		// if (authFactory.getAuth() === undefined) {
		// 	$state.go("home");
		// }


		//getting books from api
		$http.get('https://bookieservice.herokuapp.com/api/books')
			.success(function(data) {
				$scope.books = data.books;
				console.log("success");
				console.log($scope.books);
			})
			.error(function(data) {
				console.log(data);
			});

}]);