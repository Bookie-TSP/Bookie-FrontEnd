app.controller('bookCatalogCtrl', ['$scope', '$http', '$state', 'authFactory', '$timeout',
function ($scope, $http, $state, authFactory, $timeout) {

		//getting books from api
		$http.get('https://bookieservice.herokuapp.com/api/books')
			.success(function (data) {
				$scope.books = data.books;
				console.log("success");
				console.log($scope.books);
			})
			.error(function (data) {
				console.log(data);
			});

		$scope.dotdotdot = function(){
			//wait for 1 sec then do dotdotdot
			setTimeout(function() {
				$('.book-name').each(function() {
	        		$(this).dotdotdot();
	        	});
			}, 1000);
    	};
}]);
