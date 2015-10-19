app.controller('bookProfileCtrl', ['$scope', '$http', '$state', 'googleMap', 'authFactory',
	function ($scope, $http, $state, googleMap, authFactory) {
		$scope.loggedIn = false;
		if (authFactory.getAuth() !== undefined) {
			googleMap.initialize();
			loggedIn = true;
		}
		$scope.tempInfo = "TEST";
		$scope.tabs = [
    	{ title:'Dynamic Title 1', content:'Dynamic content 1' },
    	{ title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }];
  		$scope.newBooksInfo = [
  		{
  			price: 84,
  			quality: "Perfect",
  			address: "508 Treeview Trail Barneveld, WI 55303",
  			quantity: 16
  		},
  		{
  			price: 175,
  			quality: "Perfect",
  			address: "217 E Division Madison, WI 53666",
  			quantity: 5
  		},
  		{
  			price: 98,
  			quality: "Perfect",
  			address: "505 Sampson Apt 3C",
  			quantity: 32
  		},
  		{
  			price: 144,
  			quality: "Perfect",
  			address: "4204 Military Ridge Rd Dodgeville, WI 53224",
  			quantity: 0
  		}];
  		$scope.oldBooksInfo = [
  		{
  			price: 142,
  			quality: "Good",
  			address: "619 Maiden St Mineral Point, WI 53444",
  			quantity: 11
  		},
  		{
  			price: 84,
  			quality: "Almost perfect",
  			address: "4770 Main St Dodgeville, WI 53222",
  			quantity: 5
  		}];
  		$scope.rentBooksInfo = [
  		{
  			price: 65,
  			quality: "Perfect",
  			address: "402 E Park Apt 202B Montfort, WI 53555",
  			quantity: 0
  		},
  		{
  			price: 92,
  			quality: "Good",
  			address: "102 Center St Cobb, WI 53666",
  			quantity: 10
  		}];
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
	}
]);