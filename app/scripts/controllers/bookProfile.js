app.controller('bookProfileCtrl', ['$scope', '$http', '$anchorScroll', '$location', '$state', 'googleMap', 'authFactory',
    function ($scope, $http, $anchorScroll, $location, $state, googleMap, authFactory) {
        $scope.loggedIn = false;
        googleMap.initialize();
        // Check whether the Member has logged in or not
        if (authFactory.getAuth() !== undefined) {
            loggedIn = true;
        }

        // List that contains the price, condition, address, and quantity of the book in each shop for buying
        $scope.newBooksInfo = [
        {
            price: 84,
            condition: "Perfect",
            address: "508 Treeview Trail Barneveld, WI 55303",
            quantity: 16
        },
        {
            price: 175,
            condition: "Perfect",
            address: "217 E Division Madison, WI 53666",
            quantity: 32
        },
        {
            price: 98,
            condition: "Perfect",
            address: "505 Sampson Apt 3C",
            quantity: 0
        },
        {
            price: 144,
            condition: "Perfect",
            address: "4204 Military Ridge Rd Dodgeville, WI 53224",
            quantity: 0
        },
        {
            price: 175,
            condition: "Perfect",
            address: "217 E Division Madison, WI 53666",
            quantity: 59
        },
        {
            price: 98,
            condition: "Perfect",
            address: "505 Sampson Apt 3C",
            quantity: 0
        },
        {
            price: 175,
            condition: "Perfect",
            address: "217 E Division Madison, WI 53666",
            quantity: 5
        },
        {
            price: 98,
            condition: "Perfect",
            address: "505 Sampson Apt 3C",
            quantity: 123
        }];

        // List that contains the price, condition, address, and quantity of the book in each shop for buying
        $scope.oldBooksInfo = [
        {
            price: 142,
            condition: "Good",
            address: "619 Maiden St Mineral Point, WI 53444",
            quantity: 11
        },
        {
            price: 62,
            condition: "Pretty Good",
            address: "941 Crystal St Mirana Point, WI 4145",
            quantity: 0
        },
        {
            price: 198,
            condition: "Perfect",
            address: "505 Sampson Apt 3C",
            quantity: 23
        },
        {
            price: 62,
            condition: "Pretty Good",
            address: "941 Crystal St Mirana Point, WI 4145",
            quantity: 0
        },
        {
            price: 198,
            condition: "Perfect",
            address: "505 Sampson Apt 3C",
            quantity: 23
        },
        {
            price: 84,
            condition: "Almost Perfect",
            address: "4770 Main St Dodgeville, WI 53222",
            quantity: 5
        }];

        // List that contains the price, condition, address, and quantity of the book in each shop for renting
        $scope.rentBooksInfo = [
        {
            price: 65,
            condition: "Perfect",
            address: "402 E Park Apt 202B Montfort, WI 53555",
            quantity: 0
        },
        {
            price: 98,
            condition: "Very Good",
            address: "9910 High Hill Smd 941A",
            quantity: 0
        },
        {
            price: 175,
            condition: "Very Good",
            address: "217 E Division Madison, WI 53666",
            quantity: 5
        },
        {
            price: 90,
            condition: "Good",
            address: "505 Sampson Apt 3C",
            quantity: 32
        },
        {
            price: 175,
            condition: "Bad",
            address: "217 E Division Madison, WI 53666",
            quantity: 0
        },
        {
            price: 94,
            condition: "Very Good",
            address: "505 Sampson Apt 3C",
            quantity: 36
        },
        {
            price: 175,
            condition: "Perfect",
            address: "217 E Division Madison, WI 53666",
            quantity: 5
        },
        {
            price: 98,
            condition: "Almost Perfect",
            address: "505 Sampson Apt 3C",
            quantity: 0
        },
        {
            price: 176,
            condition: "Perfect",
            address: "505 Sampson Apt 3C",
            quantity: 91
        },
        {
            price: 92,
            condition: "Good",
            address: "102 Center St Cobb, WI 53666",
            quantity: 10
        }];

        // Define bookInfo
        $scope.bookInfo = {};

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
        $scope.addToCart = function () {
            console.log("Adding " + $scope.bookInfo.title + " to the cart");
            console.log("The book " + $scope.bookInfo.title + " has been added to the cart.");
        }

        // Use for scrolling the page to bottom
        $scope.moveToBottom = function() {
            $location.hash('bottom');
            $anchorScroll();
        }
    }
]);