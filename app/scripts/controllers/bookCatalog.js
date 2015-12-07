app.controller('bookCatalogCtrl', ['$scope', '$http', '$state', 'authFactory', '$timeout',
function ($scope, $http, $state, authFactory, $timeout) {
		//no need for auth factory
		// if (authFactory.getAuth() === undefined) {
		// 	$state.go("home");
		// }

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

    	$scope.listOfSortOptions = ['Name', 'Price (low to high)', 'Price (high to low)'];

    	$scope.sortOptionChanged = function() {
    		var selected = $scope.selectedSort;

    		//select by Name
    		if (selected == $scope.listOfSortOptions[0]) {
    			$scope.books.sort(function(a, b) {
    				var x = a.title.toLowerCase();
				    var y = b.title.toLowerCase();
				    return x < y ? -1 : x > y ? 1 : 0;
    			});
    		} else if (selected == $scope.listOfSortOptions[1]) {
    			$scope.books.sort(function(a, b) {
    				var x = a.lowest_price;
				    var y = b.lowest_price;
				    if (x == "null") {
				    	return -1;
				    }
				    if (y == "null") {
				    	return 1;
				    }
				    return x-y;
    			});
    		} else if (selected == $scope.listOfSortOptions[2]) {
    			$scope.books.sort(function(a, b) {
    				var x = a.lowest_price;
				    var y = b.lowest_price;
				    if (x == "null") {
				    	return 1;
				    }
				    if (y == "null") {
				    	return -1;
				    }
				    return y-x;
    			});
    		}
    	}
}]);
