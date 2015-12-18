app.controller('searchStockCtrl', ['$scope', '$http', '$state', '$rootScope', 'dateFactory', '$timeout', 'authFactory',
    function ($scope, $http, $state, $rootScope, $date, $timeout, authFactory) {
		// amount of books from api
		$scope.totalBooks = -1;
		$scope.hadSearch = false;
		$scope.wantAdd = false;

		$scope.title = '';
		$scope.author = '';
		$scope.language = '';

		// language selections
		$scope.langs = ['English', 'Thai', 'Japanese', 'Chinese'];

		// date
		$scope.initDates = $date.days;
		$scope.initMonths = $date.months;
		$scope.initYears = $date.years;

		// search books
		$scope.resultsGG = [];
		$scope.resultsDB = [];

		// specific book chosen
		$scope.specBook = {};

		var maxResults = 10;
		var startIndex = 0;
		var apiKey = "AIzaSyAY-BLl9HgepqEFBxR5YJbC_qdE4PZF_6g";

		$scope.hasNext = function () {
			return (startIndex + maxResults <= $scope.totalBooks);
		};

		$scope.hasPrevious = function () {
			return startIndex !== 0;
		};

		$scope.manualAdd = function () {
			$scope.wantAdd = true;
		};

		$scope.cancelManual = function () {
			$scope.wantAdd = false;
		};

		$scope.getBooksDB = function () {
			$scope.searchObj = {};
			if ($scope.searchCat === 'isbn') {
				$scope.searchObj.ISBN = $scope.searchField;
			} else if ($scope.searchCat === 'inauthor') {
				$scope.searchObj.author = $scope.searchField;
			} else if ($scope.searchCat === 'inpublisher') {
				$scope.searchObj.publisher = $scope.searchField;
			} else {
				$scope.searchObj.title = $scope.searchField;
			}
			$http.post('https://bookieservice.herokuapp.com/api/books/search', {
					book: $scope.searchObj
				})
				.success(function (data) {
					console.log(data);
					$scope.resultsDB = data.books;
				})
				.error(function (data) {
					console.log(data);
				});
		};

		$scope.getBooksGoogle = function (searchKey, operation, startIndex, maxResults, apiKey) {
			$http.get("https://www.googleapis.com/books/v1/volumes?q=" + operation + ":" + searchKey +
					"&maxResults=" + maxResults + "&startIndex=" + startIndex +
					"&key=" + apiKey)
				.success(function (data) {
					console.log("https://www.googleapis.com/books/v1/volumes?q=" + operation + ":" + searchKey +
						"&maxResults=" + maxResults + "&startIndex=" + startIndex +
						"&key=" + apiKey);
					//data is the matched items that returned from Google books API
					console.log(data);
					$scope.resultsGG = data.items;
					$scope.totalBooks = data.totalItems;
					if ($scope.totalBooks !== 0) {
						$scope.hadSearch = true;
						$scope.wantAdd = false;
					}
				})
				.error(function (data) {
					console.log(data);
				});
		};

		$scope.search = function () {
			startIndex = 0;
			$scope.getBooksDB();
			$scope.getBooksGoogle($scope.searchField, $scope.searchCat, startIndex, maxResults, apiKey);
		};

		$scope.nextPage = function () {
			startIndex += maxResults;
			$scope.getBooksGoogle($scope.searchField, $scope.searchCat, startIndex, maxResults, apiKey);
		};

		$scope.previousPage = function () {
			startIndex -= maxResults;
			$scope.getBooksGoogle($scope.searchField, $scope.searchCat, startIndex, maxResults, apiKey);
		};

		$scope.chooseBook = function (book, type) {
			$scope.errors = {};
			$scope.type = type;
			if (type === 'google') {
				$scope.specBook = {
					title: book.title,
					authors: book.authors,
					language: book.language,
					publisher: book.publisher,
					publish_date: book.publishedDate,
					pages: book.pageCount,
					description: book.description,
					cover_image_url: book.imageLinks.smallThumbnail
				};
				if (book.industryIdentifiers !== undefined) {
					$scope.specBook.ISBN13 = book.industryIdentifiers[0].identifier;
					$scope.specBook.ISBN10 = book.industryIdentifiers[1].identifier;
				}
			} else if (type === 'manual') {
				var checkError = false;
				if ($scope.day !== undefined || $scope.initMonths.indexOf($scope.month) + 1 > 0 ||
					$scope.year !== undefined) {
					$scope.final_date = $scope.day + "/" + ($scope.initMonths.indexOf($scope.month) + 1) +
						"/" + $scope.year;
				} else {
					$scope.final_date = null;
				}
				if ($scope.title !== '') {
					$scope.error.title = "Please insert title";
					checkError = true;
				}
				if ($scope.author !== '') {
					$scope.error.author = "Please insert at least one author";
					checkError = true;
				}
				if ($scope.language) {
					$scope.error.language = "Please select language";
					checkError = true;
				}
				if (!checkError) {
					$scope.specBook = {
						title: $scope.title,
						ISBN13: $scope.ISBN13 || null,
						ISBN10: $scope.ISBN10 || null,
						authors: [$scope.author],
						language: $scope.language,
						publisher: $scope.publisher || null,
						publish_date: $scope.final_date,
						pages: $scope.pageCount || null,
						description: $scope.description,
						cover_image_url: undefined
					};
				}
			} else if (type === 'db') {
				$scope.specBook = book;
			}
			console.log($scope.specBook);
		};

		$scope.addBook = function () {
			var config = {
				headers: {
					'Authorization': authFactory.getAuth()
				}
			};

			$http.post('https://bookieservice.herokuapp.com/api/books', {
					book: $scope.specBook
				}, config)
				.success(function (data) {
					$rootScope.newBook = data;
					console.log(data);
					$timeout(function () {
						$rootScope.steps[2] = true;
						$rootScope.steps[0] = null;
						$state.go('newStock.third');
					}, 500);
				})
				.error(function (data) {
					console.log(data);
				});
		};

		$scope.goToPhoto = function () {
			$timeout(function () {
				$rootScope.newBook = $scope.specBook;
				$rootScope.steps[1] = true;
				$rootScope.steps[0] = null;
				$state.go('newStock.second');
			}, 500);
		};

		$scope.addCurrent = function () {
			$rootScope.newBook = $scope.specBook;
			$timeout(function () {
				$rootScope.steps[2] = true;
				$rootScope.steps[0] = null;
				$state.go('newStock.third');
			}, 500);
		};
}]);
