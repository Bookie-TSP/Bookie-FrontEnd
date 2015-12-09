app.controller('bookCatalogCtrl', ['$scope', '$http', '$state', 'authFactory', '$timeout',
function ($scope, $http, $state, authFactory, $timeout) {

		//move getting books to navCtrl
		$scope.dotdotdot = function(){
			//wait for 1 sec then do dotdotdot
			setTimeout(function() {
				$('.book-name').each(function() {
	        		$(this).dotdotdot();
	        	});
			}, 1000);
    	};

		//getting books from api (being here because of sorting)
		$http.get('https://bookieservice.herokuapp.com/api/books')
			.success(function (data) {
				$scope.books = data.books;
				console.log("success");
				console.log($scope.books);
			})
			.error(function (data) {
				console.log(data);
			});
}]);
