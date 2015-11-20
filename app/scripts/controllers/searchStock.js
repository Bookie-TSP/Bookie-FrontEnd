app.controller('searchStockCtrl', ['$scope', '$http', '$state', '$rootScope', 'dateFactory',
    function ($scope, $http, $state, $rootScope, $date) {
        // amount of books from api
        $scope.totalBooks = -1;

        // language selections
        $scope.langs = ['English', 'Thai', 'Japanese', 'Chinese'];

        // date
        $scope.initDates = $date.days;
        $scope.initMonths = $date.months;
        $scope.initYears = $date.years;

        //books
        $scope.results = [];

        var maxResults = 10;
		var startIndex = 0;
		var totalBooks = 0;
		var apiKey = "AIzaSyAY-BLl9HgepqEFBxR5YJbC_qdE4PZF_6g";

        $scope.hasNext = function(){
            return (startIndex + maxResults <= $scope.totalBooks);
        };

        $scope.hasPrevious = function(){
            console.log(startIndex);
            return startIndex !== 0;
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
					//totalBooks = data.totalItems;
                    console.log(data);
                    $scope.results = data.items;
                    $scope.totalBooks = data.totalItems;
					//showResult(data);
				})
                .error(function(data){
                    console.log(data);
                });
		};

        $scope.search = function(){
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
}]);
