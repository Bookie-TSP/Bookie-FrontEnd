app.controller('navCtrl', ['$scope', '$http', '$state', 'authFactory', '$rootScope',
  function ($scope, $http, $state, authFactory, $rootScope) {
		$scope.totalPrice = 0;
		$scope.totalCount = 0;
        $scope.searchType = 'Any';

        //getting books from api (being here because of sorting)
        $http.get('https://bookieservice.herokuapp.com/api/books')
            .success(function (data) {
                $scope.books = data.books;
                console.log("success");
                console.log($scope.books);
            })
            .error(function (data) {
                console.log(data);
            });

		$scope.logout = function () {
			authFactory.setAuth(undefined);
		};
		$scope.getMember = function () {
			if (authFactory.getAuth() !== undefined) {
				var config = {
					headers: {
						'Authorization': authFactory.getAuth()
					}
				};
				$http.get('https://bookieservice.herokuapp.com/api/myprofile', config)
					.success(function (data) {
						$rootScope.member = data;
						authFactory.setMember(data);
					})
					.error(function (data) {
						authFactory.setAuth(undefined);
						console.log(data);
					});
			} else {
				$rootScope.member = undefined;
			}
		};

		$scope.getCart = function () {
			if (authFactory.getAuth() !== undefined) {
				var config = {
					headers: {
						'Authorization': authFactory.getAuth()
					}
				};
				$http.get('https://bookieservice.herokuapp.com/api/members/cart/show', config)
					.success(function (data) {
						$scope.totalPrice = 0;
						$scope.totalCount = 0;
						$scope.stocks = data.stocks;
						for (var i = 0; i < $scope.stocks.length; i++) {
							$scope.totalPrice += $scope.stocks[i].price;
							$scope.totalCount++;
						}
					})
					.error(function (data) {
						authFactory.setAuth(undefined);
						console.log(data);
					});
			} else {
				$scope.totalPrice = 0;
				$scope.totalCount = 0;
			}
		};

        $scope.sortBy = function(criteria) {
            if (criteria == 'Name') {
                $scope.books.sort(function(a, b) {
    				var x = a.title.toLowerCase();
				    var y = b.title.toLowerCase();
				    return x < y ? -1 : x > y ? 1 : 0;
    			});
            } else if (criteria == 'plh') {
                $scope.books.sort(function(a, b) {
    				var x = a.lowest_price;
				    var y = b.lowest_price;
				    if (x == "null") {
				    	return 1;
				    }
				    if (y == "null") {
				    	return -1;
				    }
				    return x-y;
    			});
            } else if (criteria == 'phl') {
                $scope.books.sort(function(a, b) {
    				var x = a.lowest_price;
				    var y = b.lowest_price;
				    if (x == "null") {
				    	return 1;
				    }
				    if (y == "null") {
				    	return -1;
				    }
				    return y-x;
    			});
            }
        }

		$rootScope.member = $scope.getMember();
		$scope.getCart();
		$scope.$on('authenticate', function () {
			$rootScope.member = $scope.getMember();
		});

		$scope.$on('cart', function () {
			$scope.getCart();
		});
}]);
