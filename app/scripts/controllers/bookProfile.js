app.controller('bookProfileCtrl', ['$scope', '$http', '$state',
function ($scope, $http, $state) {
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
		};
}]);