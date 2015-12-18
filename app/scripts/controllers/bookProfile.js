app.controller('bookProfileCtrl', ['$scope', '$http', '$anchorScroll', '$location', '$state', '$stateParams', '$uibModal', 'mapFactory', 'authFactory', '$rootScope',
    function ($scope, $http, $anchorScroll, $location, $state, $stateParams, $uibModal, $map, authFactory, $rootScope) {
		$scope.loggedIn = false;

		console.log("Start");
		// Check whether the Member has logged in or not
		if (authFactory.getAuth() !== undefined) {
			$scope.loggedIn = true;
		}
		$scope.allDataLoaded = false;

		// Tab array of stocks
		$scope.buyNewBook = [];
		$scope.buyUsedBook = [];
		$scope.rentBook = [];

		// Max showing page for Pagers
		$scope.maxSize = 4;

		// Number of items in each page of the tab
		$scope.itemPerPage = 4;

		// Initialize pager variables for total items in each tab
		$scope.buyNewBookTotalItems = 0;
		$scope.buyUsedBookTotalItems = 0;
		$scope.rentBookTotalItems = 0;

		// Initialize pager variables for the current page of each tab
		$scope.buyNewBookCurrentPage = 1;
		$scope.buyUsedBookCurrentPage = 1;
		$scope.rentBookCurrentPage = 1;

		// Initialize temporary variable for adding line stock from the modal to the cart
		$scope.tempLineStock = {};

		// Initialize Google Map from the mapFactory.js
		// googleMap.initialize();

		// Define bookInfo
		$scope.bookInfo = {};

		// Get information of the book from the API
		$scope.getBookProfile = function (id) {
			$http.get('https://bookieservice.herokuapp.com/api/books/' + id)
				.success(function (data) {
					console.log(data);
					$scope.bookInfo = data;
					$scope.seperate();
					$scope.setPagerTotalItems();
					$scope.allDataLoaded = true;
				})
				.error(function (data) {
					console.log(data);
					$state.go("404");
				});
		};


		// Seperate books into categories
		$scope.currentMemberId = authFactory.getMember().id;
		$scope.seperate = function () {
			for (var i = 0; i < $scope.bookInfo.line_stocks.length; i++) {
				if ($scope.bookInfo.line_stocks[i].type === 'sell') {
					if ($scope.bookInfo.line_stocks[i].condition === 'new') {
						$scope.buyNewBook.push($scope.bookInfo.line_stocks[i]);
					} else if ($scope.bookInfo.line_stocks[i].condition === 'used') {
						$scope.buyUsedBook.push($scope.bookInfo.line_stocks[i]);
					}
				} else if ($scope.bookInfo.line_stocks[i].type === 'lend') {
					$scope.rentBook.push($scope.bookInfo.line_stocks[i]);
				}
			}
			console.log($scope.buyNewBook);
			console.log($scope.rentBook);
		};

		// Set the amount of total items used for showing items in pages of each of the tabs
		$scope.setPagerTotalItems = function () {
			$scope.buyNewBookTotalItems = $scope.buyNewBook.length * (10 / $scope.itemPerPage);
			$scope.buyUsedBookTotalItems = $scope.buyUsedBook.length * (10 / $scope.itemPerPage);
			$scope.rentBookTotalItems = $scope.rentBook.length * (10 / $scope.itemPerPage);
		};

		// Call getBookProfile()
		$scope.getBookProfile($stateParams.bookId);

		// Use for adding the book to the cart with its details
		$scope.addToCart = function (line_stock) {
			console.log(line_stock);
			$http.post('https://bookieservice.herokuapp.com/api/members/cart/add', {
					line_stock: {
						line_stock_id: line_stock.id
					}
				}, authFactory.getConfigHead())
				.success(function (data) {
					console.log(JSON.stringify(data));
					console.log(data);
					$scope.auth = data.auth_token;
					$rootScope.$broadcast('cart');
					$scope.errorMessage = 'no error';
				})
				.error(function (data) {
					console.log(JSON.stringify(data));
					$scope.errorMessage = JSON.stringify(data.errors);
					console.log($scope.errorMessage);
				});
			console.log("The book that costs $" + line_stock.price + " has been added to the cart.");
		};

		//
		$scope.setTempLineStock = function (line_stock) {
			$scope.tempLineStock = line_stock;
		};

		// Use for scrolling the page to bottom
		$scope.moveToBottom = function () {
			$location.hash('bottom');
			$anchorScroll();
		};
    }
]);
