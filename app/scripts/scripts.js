var app = angular.module('app', ['ui.router', 'ngStorage', 'ui.bootstrap']);
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
			url: '/book',
			templateUrl: 'views/bookProfile.html',
			data : { pageTitle: 'Book Profile' }
		});
	$urlRouterProvider.otherwise('/');

});
app.run([ '$rootScope', '$state', '$stateParams',
function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);

app.controller('bookProfileCtrl', ['$scope', '$http', '$anchorScroll', '$location', '$state', 'googleMap', 'authFactory',
    function ($scope, $http, $anchorScroll, $location, $state, googleMap, authFactory) {
        $scope.loggedIn = false;

        // Variables for Pagers
        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
        $scope.totalItems = 64;
        $scope.currentPage = 4;

        // Initialize Google Map from the mapFactory.js
        googleMap.initialize();

        // Define bookInfo
        $scope.bookInfo = {};

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
            price: 110,
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
            price: 170,
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
            price: 300,
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
            price: 100,
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
            price: 148,
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
            price: 132,
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
            price: 116,
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
app.controller('editProfileCtrl', ['$scope', '$http', 'googleMap', 'authFactory', '$q', '$state',
	function ($scope, $http, googleMap, authFactory, $q, $state) {
		if (authFactory.getAuth() === undefined) {
			$state.go("login");
		}

		$scope.initDate = function() {
            $scope.initDates = new Array(31);
            for( var i = 1; i <=31 ; i++ ){
                $scope.initDates[i-1] = i;
            }
			$scope.initMonths = ["January", "February", "March", "April", "May",
								"June", "July", "August", "September", "October",
								"November", "December"];
            var d = new Date();
            var n = d.getFullYear();
            $scope.initYears = new Array(100);
            for( i = 0; i < 100; i++ ){
                $scope.initYears[i] = n-i;
            }
        };

		$scope.getProfile = function () {
			console.log("Getting the profile");
			var config = {
				headers: {
					'Authorization': authFactory.getAuth()
				}
			};
			var birth = "";
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
				$state.go("viewProfile");
			});
		};

		$scope.setDate = function () {
			if($scope.profileData.birth_date !== null){
				birth = $scope.profileData.birth_date.split("-");
				$scope.date = birth[2];
				$scope.month = $scope.initMonths[birth[1]-1];
				$scope.year = birth[0];
			}
		};

		$scope.editProfile = function () {
			console.log("Editing the profile");
			var config = {
				headers: {
					'Authorization': authFactory.getAuth()
				}
			};
			var birth_date = $scope.date + "/" + ($scope.initMonths.indexOf($scope.month)+1) + "/" + $scope.year;
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
					$scope.error = false;
					console.log(data);
					$scope.profileData.password = "";
				})
				.error(function (data) {
					$scope.error = true;
					console.log(data);
				});
		};


		$scope.backToViewProfile = function() {
			$state.go("viewProfile");
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
			$state.go("home");
		}
		$scope.validation = "";
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
					$state.go("home");
				})
				.error(function (data) {
					console.log(data);
					setValidation("Invalid email or password");
				});
		};
	}
]);

app.controller('navCtrl', ['$scope', '$http', '$state', 'authFactory', '$rootScope',
  function ($scope, $http, $state, authFactory, $rootScope) {
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
		$rootScope.member = $scope.getMember();
		$scope.$on('authenticate', function () {
			console.log("Change");
			$rootScope.member = $scope.getMember();
		});
}]);

app.controller('registerCtrl', ['$scope', '$http', 'googleMap', '$state', 'authFactory',
        function ($scope, $http, googleMap, $state, authFactory) {
		if (authFactory.getAuth() !== undefined) {
			$state.go("home");
		}
        googleMap.init();
		setInterval(function () {
			// console.log(googleMap.position);
		}, 1000);
        $scope.initDate = function() {
            $scope.initDates = new Array(31);
            for( var i = 1; i <=31 ; i++ ){
                $scope.initDates[i-1] = i;
            }
            $scope.initMonths = ["January", "February", "March", "April", "May",
                                "June", "July", "August", "September", "October",
                                "November", "December"];
            var d = new Date();
            var n = d.getFullYear();
            $scope.initYears = new Array(100);
            for( i = 0; i < 100; i++ ){
                $scope.initYears[i] = n-i;
            }
        };

		$scope.submit = function () {
			var birth_date = $scope.day_birth + "/" + ($scope.initMonths.indexOf($scope.month_birth)+1) + "/" + $scope.year_birth;
			var address_info = googleMap.position.address + " " + $scope.more_info;

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
					latitude: googleMap.position.lat,
					longitude: googleMap.position.lng,
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
        };
        $scope.initial();
}]);

app.controller('profileCtrl', ['$scope', '$http', '$state', 'authFactory',
	function ($scope, $http, $state, authFactory) {
		if (authFactory.getAuth() === undefined) {
			$state.go("login");
		}
		$scope.profileData = authFactory.getMember();
		$scope.editProfile = function () {
			$state.go("editProfile");
		};
	}
]);

app.factory('authFactory', function ($http, $rootScope, $localStorage) {
	return {
		getAuth: function () {
			return $localStorage.authToken;
		},
		setAuth: function (token) {
			$localStorage.authToken = token;
			$rootScope.$broadcast('authenticate');
		},
		setMember: function (member) {
			$localStorage.member = member;
		},
		getMember: function () {
			return $localStorage.member;
		}
	};
});

app.factory('googleMap', function () {
	var position = {
		lat: "13.752",
		lng: "100.493",
		address: ""
	};

	function initialize() {
		var geocoder = new google.maps.Geocoder;
		var infowindow = new google.maps.InfoWindow;

		var bkk = new google.maps.LatLng(position.lat, position.lng);
		var mapProp = {
			center: bkk,
			zoom: 7,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true
		};

		var marker = new google.maps.Marker({
			position: bkk,
			draggable: true
		});

		var styles = [{
				"featureType": "landscape",
				"elementType": "labels",
				"stylers": [{
					"visibility": "off"
                }]
            },
			{
				"featureType": "poi",
				"elementType": "labels",
				"stylers": [{
					"visibility": "off"
                }]
            },
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [{
					"lightness": 57
                }]
            },
			{
				"featureType": "road",
				"elementType": "labels.text.fill",
				"stylers": [{
						"visibility": "on"
                },
					{
						"lightness": 24
                }]
            },
			{
				"featureType": "road",
				"elementType": "labels.icon",
				"stylers": [{
					"visibility": "off"
                }]
            },
			{
				"featureType": "transit",
				"elementType": "labels",
				"stylers": [{
					"visibility": "off"
                }]
            },
			{
				"featureType": "water",
				"elementType": "labels",
				"stylers": [{
					"visibility": "off"
                }]
            }
        ];

		var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
		marker.setMap(map);
		map.setOptions({
			styles: styles
		});

		google.maps.event.addListener(marker, 'dragend', function (mark) {
			var latitude = mark.latLng.lat();
			var longitude = mark.latLng.lng();
			geocodeLatLng(geocoder, map, marker, infowindow, latitude, longitude);
			position.lat = latitude.toFixed(3);
			position.lng = longitude.toFixed(3);
			document.getElementById('current')
				.innerHTML = '<p>Marker dropped: Current Lat: ' + latitude.toFixed(3) + ' Current Lng: ' + longitude.toFixed(3) + '</p>';
		});
	}

	// this function is used for convert lat and lng into address
	function geocodeLatLng(geocoder, map, marker, infowindow, latitude, longitude) {
		var latlng = {
			lat: latitude,
			lng: longitude
		};

		geocoder.geocode({
			'location': latlng
		}, function (results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					var address = results[1].formatted_address;
					infowindow.setContent(address);
					infowindow.open(map, marker);

					document.getElementById('address')
						.innerHTML = '<p>Current add: ' + address + '</p>';
					position.address = address;
				} else {
					window.alert('No results found');
				}
			} else {
				window.alert('Geocoder failed due to: ' + status);
			}
		});
	}

	function init() {
		google.maps.event.addDomListener(window, 'load', initialize);
		console.log("init");
	}

	// initial map and pin by calling initialize function
	return {
		init: init,
		initialize: initialize,
		geocodeLatLng: geocodeLatLng,
		position: position

	};
});
