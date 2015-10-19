app.controller('bookProfileCtrl', ['$scope', '$http', '$state', 'googleMap', 'authFactory',
	function ($scope, $http, $state, googleMap, authFactory) {
		// if (authFactory.getAuth() !== undefined) {
			googleMap.initialize();
		// }
		$scope.tempInfo = "TEST";
		$scope.tabs = [
    		{ title:'Dynamic Title 1', content:'Dynamic content 1' },
    		{ title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
  		];
		$scope.bookInfo = 
		{
			title: "Klee Wyck",
			isbn: "978-1553650256",
			author: "Emily Carr",
			language: "English",
			pages: 144,
			publisher: "Douglas & McIntyre",
			publishedDate: "14/05/1944",
			description: "Douglas & McIntyre is proud to announce definitive, completely redesigned editions of Emily Carr’s seven enduring classic books. These are beautifully crafted keepsake editions of the literary world of Emily Carr, each with an introduction by a distinguished Canadian writer or authority on Emily Carr and her work."
		}
		$scope.addToCart = function () {
			console.log("Adding " + $scope.bookInfo.title + " to the cart");
			console.log("The book " + $scope.bookInfo.title + " has been added to the cart.");
		}
		$scope.toggleHome = function() {
			tempInfo = "Home";
			console.log(tempInfo);
		}
		$scope.toggleMenu1 = function() {
			tempInfo = "Menu1";
			console.log(tempInfo);
		}
		$scope.toggleMenu2 = function() {
			tempInfo = "Menu2";
			console.log(tempInfo);
		}
		$scope.toggleMenu3 = function() {
			tempInfo = "Menu3";
			console.log(tempInfo);
		}
	}
]);