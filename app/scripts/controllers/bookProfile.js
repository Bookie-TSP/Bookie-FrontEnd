app.controller('bookProfileCtrl', ['$scope', '$http', '$anchorScroll', '$location', '$state', 'googleMap', 'authFactory',
  function ($scope, $http, $anchorScroll, $location, $state, googleMap, authFactory) {
    $scope.loggedIn = false;

    // Check whether the Member has logged in or not
    if (authFactory.getAuth() !== undefined) {
      googleMap.initialize();
      loggedIn = true;
    }

      // List that contains the price, condition, address, and quantity of the book in each shop for buying
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
        quantity: 32
      },
      {
        price: 98,
        quality: "Perfect",
        address: "505 Sampson Apt 3C",
        quantity: 0
      },
      {
        price: 144,
        quality: "Perfect",
        address: "4204 Military Ridge Rd Dodgeville, WI 53224",
        quantity: 0
      },
      {
        price: 175,
        quality: "Perfect",
        address: "217 E Division Madison, WI 53666",
        quantity: 59
      },
      {
        price: 98,
        quality: "Perfect",
        address: "505 Sampson Apt 3C",
        quantity: 0
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
        quantity: 123
      }];

      // List that contains the price, condition, address, and quantity of the book in each shop for buying
      $scope.oldBooksInfo = [
      {
        price: 142,
        quality: "Good",
        address: "619 Maiden St Mineral Point, WI 53444",
        quantity: 11
      },
      {
        price: 62,
        quality: "Pretty Good",
        address: "941 Crystal St Mirana Point, WI 4145",
        quantity: 0
      },
      {
        price: 198,
        quality: "Perfect",
        address: "505 Sampson Apt 3C",
        quantity: 23
      },
      {
        price: 62,
        quality: "Pretty Good",
        address: "941 Crystal St Mirana Point, WI 4145",
        quantity: 0
      },
      {
        price: 198,
        quality: "Perfect",
        address: "505 Sampson Apt 3C",
        quantity: 23
      },
      {
        price: 84,
        quality: "Almost Perfect",
        address: "4770 Main St Dodgeville, WI 53222",
        quantity: 5
      }];

      // List that contains the price, condition, address, and quantity of the book in each shop for renting
      $scope.rentBooksInfo = [
      {
        price: 65,
        quality: "Perfect",
        address: "402 E Park Apt 202B Montfort, WI 53555",
        quantity: 0
      },
      {
        price: 98,
        quality: "Very Good",
        address: "9910 High Hill Smd 941A",
        quantity: 0
      },
      {
        price: 175,
        quality: "Very Good",
        address: "217 E Division Madison, WI 53666",
        quantity: 5
      },
      {
        price: 90,
        quality: "Good",
        address: "505 Sampson Apt 3C",
        quantity: 32
      },
      {
        price: 175,
        quality: "Bad",
        address: "217 E Division Madison, WI 53666",
        quantity: 0
      },
      {
        price: 94,
        quality: "Very Good",
        address: "505 Sampson Apt 3C",
        quantity: 36
      },
      {
        price: 175,
        quality: "Perfect",
        address: "217 E Division Madison, WI 53666",
        quantity: 5
      },
      {
        price: 98,
        quality: "Almost Perfect",
        address: "505 Sampson Apt 3C",
        quantity: 0
      },
      {
        price: 176,
        quality: "Perfect",
        address: "505 Sampson Apt 3C",
        quantity: 91
      },
      {
        price: 92,
        quality: "Good",
        address: "102 Center St Cobb, WI 53666",
        quantity: 10
      }];

      // Information of the book that has been received
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