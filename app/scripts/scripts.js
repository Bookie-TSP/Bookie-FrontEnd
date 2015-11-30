var app = angular.module('app', ['ui.router', 'ngStorage', 'ui.bootstrap', 'uiGmapgoogle-maps']);
app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html',
			data : { pageTitle: 'Home' }
		})
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			data : { pageTitle: 'Login' }
		})
		.state('register', {
			url: '/register',
			templateUrl: 'views/register.html',
			data : { pageTitle: 'Register' }
		})
		.state('viewProfile', {
			url: '/viewProfile',
			templateUrl: 'views/viewProfile.html',
			data : { pageTitle: 'View Profile' }
		})
		.state('editProfile', {
			url: '/editProfile',
			templateUrl: 'views/editProfile.html',
			data : { pageTitle: 'Edit Profile' }
		})
		.state('bookProfile', {
			url: '/book/:bookId',
			templateUrl: 'views/bookProfile.html',
			data : { pageTitle: 'Book Profile' }
		})
		.state('editAddress', {
			url: '/editAddress',
			templateUrl: 'views/editAddress.html',
			data : { pageTitle: 'Edit Address' }
		})
		.state('cart', {
			url: '/cart',
			templateUrl: 'views/cart.html',
			data : { pageTitle: 'My Cart' }
		})
		.state('payment', {
			url: '/payment',
			templateUrl: 'views/payment.html',
			data : { pageTitle: 'Payment' }
		});
	$urlRouterProvider.otherwise('/');

});
app.run([ '$rootScope', '$state', '$stateParams',
function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);

app.controller('bookCatalogCtrl', ['$scope', '$http', '$state', 'authFactory', '$timeout',
function ($scope, $http, $state, authFactory, $timeout) {
		//no need for auth factory
		// if (authFactory.getAuth() === undefined) {
		// 	$state.go("home");
		// }

		//getting books from api
		$http.get('https://bookieservice.herokuapp.com/api/books')
			.success(function(data) {
				$scope.books = data.books;
				console.log("success");
				console.log($scope.books);
			})
			.error(function(data) {
				console.log(data);
			});

		$scope.dotdotdot = function(){
			//wait for 1 sec then do dotdotdot
			setTimeout(function() {
				$('.book-name').each(function() {
	        		$(this).dotdotdot();
	        	});
			}, 1000);
    	};
}]);

app.controller('bookProfileCtrl', ['$scope', '$http', '$anchorScroll', '$location', '$state', '$stateParams', '$uibModal', 'mapFactory', 'authFactory', '$rootScope',
    function ($scope, $http, $anchorScroll, $location, $state, $stateParams, $uibModal, $map, authFactory, $rootScope) {
        $scope.loggedIn = false;

        console.log("Start");
        // Check whether the Member has logged in or not
        if (authFactory.getAuth() !== undefined) {
            $scope.loggedIn = true;
        }

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
        $scope.getBookProfile = function(id) {
            $http.get('https://bookieservice.herokuapp.com/api/books/'+id)
            .success(function (data) {
                console.log(data);
                $scope.bookInfo = data;
                $scope.seperate();
                $scope.setPagerTotalItems();
            })
            .error(function (data) {
                console.log(data);
            });
        };

        // Seperate books into categories
        $scope.seperate = function() {
            for (var i = 0; i < $scope.bookInfo.line_stocks.length; i++) {
                if ($scope.bookInfo.line_stocks[i].type === 'sell') {
                    if ($scope.bookInfo.line_stocks[i].condition === 'new') {
                        $scope.buyNewBook.push($scope.bookInfo.line_stocks[i]);
                    }
                    else if ($scope.bookInfo.line_stocks[i].condition === 'used') {
                        $scope.buyUsedBook.push($scope.bookInfo.line_stocks[i]);
                    }
                }
                else if ($scope.bookInfo.line_stocks[i].type === 'lend') {
                    $scope.rentBook.push($scope.bookInfo.line_stocks[i]);
                }
            }
            console.log($scope.buyNewBook);
            console.log($scope.rentBook);
        };

        // Set the amount of total items used for showing items in pages of each of the tabs
        $scope.setPagerTotalItems = function() {
            $scope.buyNewBookTotalItems = $scope.buyNewBook.length * (10 / $scope.itemPerPage);
            $scope.buyUsedBookTotalItems = $scope.buyUsedBook.length * (10 / $scope.itemPerPage);
            $scope.rentBookTotalItems = $scope.rentBook.length * (10 / $scope.itemPerPage);
        };

        // Call getBookProfile()
        $scope.getBookProfile($stateParams.bookId);

        // Use for adding the book to the cart with its details
        $scope.addToCart = function(line_stock) {
            console.log(line_stock);
            var config = {
                headers: {
                    'Authorization': authFactory.getAuth()
                }
            };
            $http.post('https://bookieservice.herokuapp.com/api/members/cart/add', {
                line_stock: {
                    line_stock_id: line_stock.id
                }
            }, config)
            .success(function(data){
                console.log(JSON.stringify(data));
                console.log(data);
                $scope.auth = data.auth_token;
                $rootScope.$broadcast('cart');
                $scope.errorMessage = 'no error';
            })
            .error(function(data){
                console.log(JSON.stringify(data));
                $scope.errorMessage = JSON.stringify(data.errors);
                console.log($scope.errorMessage);
            });
            console.log("The book that costs $" + line_stock.price + " has been added to the cart.");
        };

        //
        $scope.setTempLineStock = function(line_stock){
            $scope.tempLineStock = line_stock;
        };

        // Use for scrolling the page to bottom
        $scope.moveToBottom = function() {
            $location.hash('bottom');
            $anchorScroll();
        };
    }
]);

app.controller('cartCtrl',['$scope','$http', '$state', 'authFactory', '$rootScope',
    function ($scope, $http, $state, authFactory, $rootScope){
        var config = {
            headers: {
                'Authorization': authFactory.getAuth()
            }
        };
        $scope.getTotal = function() {
            $scope.total = 0;
            for(var i = 0, len = $scope.stocks.length; i < len; i++) {
                $scope.total += $scope.stocks[i].price;
            }
        };

        $scope.countStocks = function() {
            $scope.buyLength = 0;
            for(var i = 0; i < $scope.stocks.length; i++){
                if($scope.stocks[i].type === 'sell'){
                    $scope.buyLength++;
                }
            }

            $scope.rentLength = 0;
            for(var j = 0; j < $scope.stocks.length; j++){
                if($scope.stocks[j].type === 'lend'){
                    $scope.rentLength++;
                }
            }
        };

        $scope.getCart = function() {
            $http.get('https://bookieservice.herokuapp.com/api/members/cart/show',config)
            .success(function (data) {
                console.log(data);
                $scope.cart = data;
                $scope.stocks = $scope.cart.stocks;
                $scope.getTotal();
                $scope.countStocks();
                console.log($scope.total);
            })
            .error(function (data) {
                console.log(data);
            });
        };
        $scope.removeStock = function(id) {
            console.log(id);
            $http.post('https://bookieservice.herokuapp.com/api/members/cart/remove',{
                stock: {
                    stock_id: id
                }
            },config)
            .success(function(data){
                $rootScope.$broadcast('cart');
                $scope.cart = data;
                $scope.stocks = $scope.cart.stocks;
                $scope.getTotal();
                $scope.countStocks();
            })
            .error(function(data){
                console.log(data);
            });
        };

        //initialize
        $scope.getCart();
}]);

app.controller('addressCtrl',['$scope','$http', '$state', 'authFactory', '$rootScope', 'mapFactory',
    function($scope, $http, $state, authFactory, $rootScope, $map){
        if (authFactory.getAuth() === undefined) {
			$state.go('login');
		}

        $scope.info = '';
        $scope.initial = function(){
            $scope.address = authFactory.getMember().addresses[0];
            $scope.map = $map.map;
            $scope.marker = $map.marker;
            $scope.map.center = {
    			latitude: $scope.address.latitude,
    			longitude: $scope.address.longitude
    		};
            $scope.marker.coords = {
                latitude: $scope.address.latitude,
    			longitude: $scope.address.longitude
            };
            $scope.options = $map.options;
        };

        $scope.editAddress = function() {
            $scope.address.information = $scope.info + $scope.address.information;
            var config = {
				headers: {
					'Authorization': authFactory.getAuth()
				}
			};
            $http.post('https://bookieservice.herokuapp.com/api/members/edit_address',{
                address: $scope.address
            },config)
            .success(function(data){
                console.log(data);
                authFactory.setMember(data);
                $state.go('viewProfile');
            })
            .error(function(data){
                $scope.error = true;
                console.log(data);
            });

        };

        $scope.$on('marker', function () {
			console.log('marker');
            $scope.address.latitude = $map.getLat().toFixed(5);
            $scope.address.longitude = $map.getLng().toFixed(5);
            $scope.address.information = $map.getAddress();
            $scope.$digest();
		});

        $scope.initial();

}]);

app.controller('editProfileCtrl', ['$scope', '$http', 'authFactory', '$q', '$state', 'dateFactory',
	function ($scope, $http, authFactory, $q, $state, $date) {
		if (authFactory.getAuth() === undefined) {
			$state.go('login');
		}

		var config = {
			headers: {
				'Authorization': authFactory.getAuth()
			}
		};

		$scope.initDate = function() {
			$scope.initDates = $date.days;
            $scope.initMonths = $date.months;
            $scope.initYears = $date.years;
        };

		$scope.setDate = function () {
			if($scope.profileData.birth_date !== null){
				birth = $scope.profileData.birth_date.split('-');
				$scope.date = birth[2];
				$scope.month = $scope.initMonths[birth[1]-1];
				$scope.year = birth[0];
			}
		};

		$scope.getProfile = function () {
			console.log('Getting the profile');
			var birth = '';
			$q.all([
					$http.get('https://bookieservice.herokuapp.com/api/myprofile', config)
					.success(function (data) {
						$scope.profileData = data;
						authFactory.setMember(data);
						$scope.profileData = authFactory.getMember();
						console.log(data);
					})
					.error(function (data) {
						console.log(data);
					})
			])
			.then(function () {
				$scope.setDate();
				$state.go('viewProfile');
			});
		};

		$scope.editProfile = function () {
			console.log('Editing the profile');
			$scope.errorRequired = false;
			$scope.errorEmail = false;
			$scope.errorPass = false;
			var birth_date = $scope.date + '/' + ($scope.initMonths.indexOf($scope.month)+1) + '/' + $scope.year;
			$http.put('https://bookieservice.herokuapp.com/api/members', {
					member: {
						email: $scope.profileData.email,
						password: $scope.profileData.password,
						password_confirmation: $scope.profileData.password,
						first_name: $scope.profileData.first_name,
						last_name: $scope.profileData.last_name,
						phone_number: $scope.profileData.phone_number,
						identification_number: $scope.profileData.identification_number,
						gender: $scope.profileData.gender,
						birth_date: birth_date
					}
				}, config)
				.success(function (data) {
					$scope.getProfile();
					console.log(data);
					$scope.profileData.password = '';
				})
				.error(function (data) {
					if( data.errors.email !== undefined){
						$scope.errorEmail = true;
					}
					if( data.errors === 'Wrong password'){
						$scope.errorPass = true;
					}
					if( data.errors.password === 'parameter is required'){
						$scope.errorRequired = true;
					}
					console.log(data);
				});
		};

		$scope.initial = function () {
			$scope.initDate();
			var profile = authFactory.getMember();
			var text = JSON.stringify(profile);
			$scope.profileData = JSON.parse(text);
			$scope.setDate();
		};

		$scope.initial();
	}
]);

app.controller('homeCtrl',['$scope','$http', '$state', '$rootScope',
    function($scope, $http, $state, $rootScope){
    	$scope.bookProfile = function() {
    		$state.go("bookProfile");
    	}
}]);

app.controller('loginCtrl', ['$scope', '$http', '$state', 'authFactory',
	function ($scope, $http, $state, authFactory) {
		if (authFactory.getAuth() !== undefined) {
			$state.go('home');
		}
		$scope.validation = '';
		setValidation = function (s) {
			$scope.validation = s;
		};

		$scope.login = function () {
			$http.post('https://bookieservice.herokuapp.com/api/sessions', {
					email: $scope.email,
					password: $scope.password
				})
				.success(function (data) {
					$scope.auth = data.auth_token;
					authFactory.setAuth($scope.auth);
					$state.go('home');
				})
				.error(function (data) {
					console.log(data);
					setValidation('Invalid email or password');
				});
		};
	}
]);

app.controller('navCtrl', ['$scope', '$http', '$state', 'authFactory', '$rootScope',
  function ($scope, $http, $state, authFactory, $rootScope) {
		$scope.totalPrice = 0;
		$scope.totalCount = 0;
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

		$rootScope.member = $scope.getMember();
		$scope.getCart();
		$scope.$on('authenticate', function () {
			console.log('Change');
			$rootScope.member = $scope.getMember();
		});

		$scope.$on('cart', function () {
			$scope.getCart();
		});
}]);

app.controller('paymentCtrl',['$scope','$http', '$state', 'authFactory', '$rootScope',
    function ($scope, $http, $state, authFactory, $rootScope){
        var config = {
            headers: {
                'Authorization': authFactory.getAuth()
            }
        };

        $scope.getTotal = function() {
            $scope.total = 0;
            for(var i = 0, len = $scope.stocks.length; i < len; i++) {
                $scope.total += $scope.stocks[i].price;
            }
        };

        $scope.getCart = function() {
            $http.get('https://bookieservice.herokuapp.com/api/members/cart/show',config)
            .success(function (data) {
                console.log(data);
                $scope.cart = data;
                $scope.stocks = $scope.cart.stocks;
                $scope.getTotal();
                console.log($scope.total);
            })
            .error(function (data) {
                console.log(data);
            });
        };

        $scope.paid = function() {
            $scope.emptyCart = false;
            if ($scope.billing_firstname == null || $scope.billing_lastname == null) {
                alert("Please input your name");
            } else if ($scope.billing_card_number == undefined) {
                alert("Please input card number");
            } else if ($scope.billing_card_security_number == undefined) {
                alert("Please input CVV");
            } else if ($scope.billing_card_number.length !== 16) {
                alert("Wrong card number");
            } else if ($scope.billing_card_security_number.length !== 3) {
                alert("Wrong CVV");
            } else if ($scope.expireMM == undefined || $scope.expireYY == undefined) {
                alert("Please input expirtion date");
            } else if ($scope.billing_type == undefined) {
                alert("Please input credit card type");
            } else {
                var billing_name = $scope.billing_firstname + " " + $scope.billing_lastname;
                var billing_card_expire_date = $scope.expireMM + "/" + $scope.expireYY;
                var payment = {
                    billing_name: billing_name,
                    billing_type: $scope.billing_type,
                    billing_card_number: $scope.billing_card_number,
                    billing_card_expire_date: billing_card_expire_date,
                    billing_card_security_number: $scope.billing_card_security_number
                };
                $http.post('https://bookieservice.herokuapp.com/api/members/cart/checkout', {
                        payment: payment
                    }, config)
                    .success(function (data) {
                        console.log(data);
                        $rootScope.$broadcast('cart');
                        $state.go("home");
                    })
                    .error(function (data) {
                        if( data.errors === 'Your cart is empty'){
                            $scope.emptyCart = true;
                        }
                        console.log(data);
                    });
            }
        };

        //initialize
        $scope.getCart();
}]);
app.controller('registerCtrl', ['$scope', '$http', 'mapFactory', '$state', 'authFactory', 'dateFactory',
        function ($scope, $http, $map, $state, authFactory, $date) {
		if (authFactory.getAuth() !== undefined) {
			$state.go("home");
		}
        $scope.latitude = "";
        $scope.longitude = "";
        $scope.address = "";
        
        $scope.initDate = function() {
            $scope.initDates = $date.days;
            $scope.initMonths = $date.months;
            $scope.initYears = $date.years;
		};

		$scope.submit = function () {
			var birth_date = $scope.day_birth + "/" + ($scope.initMonths.indexOf($scope.month_birth)+1) + "/" + $scope.year_birth;
            var address_info = $scope.address;
            if( $scope.more_info !== undefined){
                address_info = $scope.more_info + " " + address_info;
            }

			if (!$scope.agreeTerm) {
				alert("Please agree the term of condition");
			} else {
				var member = {
					email: $scope.email,
					password: $scope.password,
					password_confirmation: $scope.password_confirmation,
					first_name: $scope.first_name,
					last_name: $scope.last_name,
					phone_number: $scope.phone_number,
					identification_number: $scope.identification_number,
					gender: $scope.gender,
					birth_date: birth_date
				};
				var address = {
					first_name: $scope.first_name,
					last_name: $scope.last_name,
					latitude: $scope.latitude,
					longitude: $scope.longitude,
					information: address_info
				};

				//send member&address
				$http.post('https://bookieservice.herokuapp.com/api/members', {
						member: member,
						address: address
					})
					.success(function (data) {
						console.log(data);
						$state.go("login");
					})
					.error(function (data) {
						console.log(data);
						alert("error : " + data.errors);
					});
			}
		};

        $scope.initial = function() {
            $scope.initDate();
            $scope.map = $map.map;
            $scope.marker = $map.marker;
            $scope.options = $map.options;
        };
        $scope.$on('marker', function () {
			console.log("marker");
            $scope.latitude = $map.getLat().toFixed(5);
            $scope.longitude = $map.getLng().toFixed(5);
            $scope.address = $map.getAddress();
            $scope.$digest();
		});
        $scope.initial();
}]);

app.controller('profileCtrl', ['$scope', '$http', '$state', 'authFactory',
	function ($scope, $http, $state, authFactory) {
		if (authFactory.getAuth() === undefined) {
			$state.go("login");
		}
		$scope.profileData = authFactory.getMember();
}]);

app.factory('authFactory', function ($http, $rootScope, $localStorage) {
	return {
		getAuth: function () {
			return $localStorage.authToken;
		},
		setAuth: function (token) {
			$localStorage.authToken = token;
			$rootScope.$broadcast('authenticate');
			$rootScope.$broadcast('cart');
		},
		setMember: function (member) {
			$localStorage.member = member;
		},
		getMember: function () {
			return $localStorage.member;
		}
	};
});

app.factory('dateFactory', function () {
    var initDates = new Array(31);
    for( var i = 1; i <=31 ; i++ ){
        initDates[i-1] = i;
    }

     var initMonths = ['January', 'February', 'March', 'April', 'May',
                        'June', 'July', 'August', 'September', 'October',
                        'November', 'December'];

    var d = new Date();
    var n = d.getFullYear();
    var initYears = new Array(100);
    for( i = 0; i < 100; i++ ){
        initYears[i] = n-i;
    }

	return {
		days: initDates,
        months: initMonths,
        years: initYears
	};
});

app.factory('mapFactory', function ($log, $rootScope) {
	var latitude = 13.725;
	var longitude = 100.493;
	var address = "";

	function geocodeLatLng(latitude, longitude) {
		var latlng = {
			lat: latitude,
			lng: longitude
		};
		var geocoder = new google.maps.Geocoder;
		geocoder.geocode({
			'location': latlng
		}, function (results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					address = results[0].formatted_address;
					$rootScope.$broadcast('marker');
				}
			} else {
				window.alert('Geocoder failed due to: ' + status);
			}
		});
	}

	var map = {
		center: {
			latitude: 13.725,
			longitude: 100.493
		},
		zoom: 8
	};
	var options = {
		scrollwheel: false
	};

	var marker = {
		id: 0,
		coords: {
			latitude: 13.725,
			longitude: 100.493
		},
		options: {
			draggable: true
		},
		events: {
			dragend: function (marker, eventName, args) {
				$log.log('marker dragend');
				var lat = marker.getPosition()
					.lat();
				var lon = marker.getPosition()
					.lng();
				setPosition(lat, lon);
				geocodeLatLng(lat, lon);
			}
		}
	};

	var setPosition = function (lat, long) {
		latitude = lat;
		longitude = long;
	};

	var getLat = function () {   
		return latitude;
	};

	var getLng = function () {
		return longitude;
	};

	var getAddress = function () {
		return address;
	};

	return {
		map: map,
		marker: marker,
		options: options,
		getLat: getLat,
		getLng: getLng,
		getAddress: getAddress,
		setPosition: setPosition
	};
});
