app.controller('searchStockCtrl', ['$scope', '$http', '$state', '$rootScope', 'dateFactory',
    function ($scope, $http, $state, $rootScope, $date) {
        // amount of books from api
        $scope.totalBooks = -1;
        $scope.hadSearch = false;
        $scope.wantAdd = false;
        // language selections
        $scope.langs = ['English', 'Thai', 'Japanese', 'Chinese'];

        // date
        $scope.initDates = $date.days;
        $scope.initMonths = $date.months;
        $scope.initYears = $date.years;

        //books
        $scope.results = [];

        $scope.specBook = {};

        var maxResults = 10;
		var startIndex = 0;
		var apiKey = "AIzaSyAY-BLl9HgepqEFBxR5YJbC_qdE4PZF_6g";

        $scope.hasNext = function(){
            return (startIndex + maxResults <= $scope.totalBooks);
        };

        $scope.hasPrevious = function(){
            return startIndex !== 0;
        };

        $scope.manualAdd = function() {
            $scope.wantAdd = true;
        };

        $scope.cancelManual = function() {
            $scope.wantAdd = false;
        };

		$scope.getBooks = function (searchKey, operation, startIndex, maxResults, apiKey) {
			$http.get("https://www.googleapis.com/books/v1/volumes?q=" + operation + ":" + searchKey +
				"&maxResults=" + maxResults + "&startIndex=" + startIndex +
				"&key=" + apiKey)
                .success(function (data) {
                    console.log("https://www.googleapis.com/books/v1/volumes?q=" + operation + ":" + searchKey +
        				"&maxResults=" + maxResults + "&startIndex=" + startIndex +
        				"&key=" + apiKey);
					//data is the matched items that returned from Google books API
                    console.log(data);
                    $scope.results = data.items;
                    $scope.totalBooks = data.totalItems;
                    if($scope.totalBooks !== 0){
                        $scope.hadSearch = true;
                        $scope.wantAdd = false;
                    }
				})
                .error(function(data){
                    console.log(data);
                });
		};

        $scope.search = function(){
    		startIndex = 0;
            $scope.getBooks($scope.searchField, $scope.searchCat, startIndex, maxResults, apiKey);
        };

        $scope.nextPage = function() {
            startIndex += maxResults;
            $scope.getBooks($scope.searchField, $scope.searchCat, startIndex, maxResults, apiKey);
        };

        $scope.previousPage = function() {
            startIndex -= maxResults;
            $scope.getBooks($scope.searchField, $scope.searchCat, startIndex, maxResults, apiKey);
        };

        $scope.chooseBook = function(book, type) {
            if (type === 'google'){
                $scope.specBook = {
                    title:  book.title,
                    ISBN13: book.industryIdentifiers[0].identifier,
                    ISBN10: book.industryIdentifiers[1].identifier,
                    authors: book.authors,
                    language: book.language,
                    publisher: book.publisher,
                    publish_date: book.publishedDate,
                    pages: book.pageCount,
                    description: book.description,
                    cover_image_url: book.imageLinks.smallThumbnail
                };
            }
            else if(type === 'manual'){
                if( $scope.day !== undefined || $scope.initMonths.indexOf($scope.month)+1 > 0 ||
                    $scope.year !== undefined){
                        $scope.final_date = $scope.day + "/" + ($scope.initMonths.indexOf($scope.month)+1) +
                                                "/" + $scope.year;
                }
                else{
                    $scope.final_date = null;
                }
                $scope.specBook = {
                    title:  $scope.title,
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
            console.log($scope.specBook);
        };
}]);
