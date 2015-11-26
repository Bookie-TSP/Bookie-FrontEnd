app.controller('infoStockCtrl', ['$scope', '$http', '$state', '$rootScope',
    function ($scope, $http, $state, $rootScope) {
		// mock books
		$rootScope.newBook = {
				"id": 8,
				"title": "A Universe of Star Wars Collectibles",
				"ISBN10": "0873494156",
				"ISBN13": "9780873494151",
				"authors": [
"Stuart W. Wells"
],
				"language": "en",
				"pages": 287,
				"publisher": "Krause Publications",
				"publish_date": null,
				"description": "Features more than 8,500 listings, with prices and descriptions for more than 40 collectible categories from 1976-2002.",
				"cover_image_url": "http://books.google.co.th/books/content?id=uW3pNt5wKtYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
				"created_at": "2015-11-25T08:41:07.503Z",
				"updated_at": "2015-11-25T08:41:07.503Z"
			};
			//console.log($rootScope.newBook);

		$scope.type = '';

		$scope.nextStep = function () {
			$rootScope.newStock = {
				book_id: $rootScope.newBook.id,
				status: 'stock',
				price: $scope.price,
				type: $scope.type,
				condition: $scope.condition,
				description: $scope.description,
				quantity: $scope.quantity
			};
			if ($scope.type === 'lend') {
				$rootScope.newStock.terms = $scope.terms;
				$rootScope.newStock.duration = $scope.duration;
			}
			console.log($rootScope.newStock);
			$state.go('newStock.fourth');
		};
}]);
