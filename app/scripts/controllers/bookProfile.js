app.controller('bookProfileCtrl', ['$scope', '$http', '$anchorScroll', '$location', '$state', 'authFactory',
    function ($scope, $http, $anchorScroll, $location, $state, authFactory) {
        $scope.loggedIn = false;

        // Check whether the Member has logged in or not
        if (authFactory.getAuth() !== undefined) {
            $scope.loggedIn = true;
        }
        
        // Tab array of stocks
        $scope.buyNewBook = [];
        $scope.buyUsedBook = [];
        $scope.rentBook = [];

        // Max showing page for Pagers
        $scope.maxSize = 5;

        // Initialize pager variables for total items in each tab
        $scope.buyNewBookTotalItems;
        $scope.buyUsedBookTotalItems;
        $scope.rentBookTotalItems;

        // Initialize pager variables for the current page of each tab
        $scope.buyNewBookCurrentPage = 1;
        $scope.buyUsedBookCurrentPage = 1;
        $scope.rentBookCurrentPage = 1;

        // Initialize Google Map from the mapFactory.js
        //googleMap.initialize();

        // Define bookInfo
        $scope.bookInfo = {};

        // Get information of the book from the API
        $scope.getBookProfile = function() {
            $http.get('https://bookieservice.herokuapp.com/api/books/1')
            .success(function (data) {
                console.log(data);
                $scope.bookInfo = data;
                $scope.seperate();
                $scope.setPagerTotalItems();
            })
            .error(function (data) {
                console.log(data);
            })
        }

        // Seperate books into categories
        $scope.seperate = function() {
            for (var i = 0; i < $scope.bookInfo.line_stocks.length; i++) {
                if ($scope.bookInfo.line_stocks[i].stocks[0].type === 'sell') {
                    if ($scope.bookInfo.line_stocks[i].stocks[0].condition === 'new') {
                        $scope.buyNewBook.push($scope.bookInfo.line_stocks[i]);
                    }
                    else if ($scope.bookInfo.line_stocks[i].stocks[0].condition === 'used') {
                        $scope.buyUsedBook.push($scope.bookInfo.line_stocks[i]);
                    }
                }
                else if ($scope.bookInfo.line_stocks[i].stocks[0].type === 'lend') {
                    $scope.rentBook.push($scope.bookInfo.line_stocks[i]);
                }
            }
        }

        $scope.setPagerTotalItems = function() {
            $scope.buyNewBookTotalItems = $scope.buyNewBook.length * 2;
            $scope.buyUsedBookTotalItems = $scope.buyUsedBook.length * 2;
            $scope.rentBookTotalItems = $scope.rentBook.length * 2;
        }

        // Call getBookProfile()
        $scope.getBookProfile();

        // Use for adding the book to the cart with its details
        $scope.addToCart = function(line_stock) {
            var stockRandomizer = Math.floor(Math.random() * (line_stock.stocks.length + 1));
            var config = {
                headers: {
                    'Authorization': authFactory.getAuth()
                }
            };
            // console.log(line_stock);
            // console.log("Adding the book that costs $" + line_stock.stocks[0].price + " to the cart");
            $http.post('https://bookieservice.herokuapp.com/api/members/cart/add', {
                stock: {
                    stock_id: line_stock.stocks[stockRandomizer].id
                }
            }, config)
            .success(function(data){
                console.log(JSON.stringify(data));
                console.log(data);
                $scope.auth = data.auth_token;
            })
            .error(function(data){
                console.log(JSON.stringify(data));
            });
            console.log("The book that costs $" + line_stock.stocks[0].price + " has been added to the cart.");
        }

        // Use for scrolling the page to bottom
        $scope.moveToBottom = function() {
            $location.hash('bottom');
            $anchorScroll();
        }
    }
]);