app.controller('bookProfileCtrl', ['$scope', '$http', '$anchorScroll', '$location', '$state', 'authFactory',
    function ($scope, $http, $anchorScroll, $location, $state, authFactory) {
        $scope.loggedIn = false;

        // Variables for Pagers
        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
        $scope.totalItems = 64;
        $scope.currentPage = 4;

        // Initialize Google Map from the mapFactory.js
        //googleMap.initialize();

        // Define bookInfo
        $scope.bookInfo = {};

        // Check whether the Member has logged in or not
        if (authFactory.getAuth() !== undefined) {
            loggedIn = true;
        }

        // Get information of the book from the API
        $scope.getBookProfile = function() {
            $http.get('https://bookieservice.herokuapp.com/api/books/1')
            .success(function (data) {
                console.log(data);
                $scope.bookInfo = data;
            })
            .error(function (data) {
                console.log(data);
            })
        }

        // Call getBookProfile()
        $scope.getBookProfile();

        // Use for adding the book to the cart with its details
        $scope.addToCart = function (book) {
            console.log("Adding the book that costs $" + book.price + " to the cart");
            $http.post('https://bookieservice.herokuapp.com/api/members/cart/add', {
                stocks: {
                    stock_id: 1
                }
            })
            .success(function(data){
                console.log(JSON.stringify(data));
                console.log(data);
                $scope.auth = data.auth_token;
            })
            .error(function(data){
                console.log(JSON.stringify(data));
            });
            console.log("The book that costs $" + book.price + " has been added to the cart.");
        }

        // Use for scrolling the page to bottom
        $scope.moveToBottom = function() {
            $location.hash('bottom');
            $anchorScroll();
        }
    }
]);