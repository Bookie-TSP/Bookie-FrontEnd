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
		.state('editAddress', {
			url: '/editAddress',
			templateUrl: 'views/editAddress.html',
			data : { pageTitle: 'Edit Address' }
		});
	$urlRouterProvider.otherwise('/');

});
app.run([ '$rootScope', '$state', '$stateParams',
function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);

app.controller('addressCtrl',['$scope','$http', '$state', 'googleMap', 'authFactory', '$rootScope',
    function($scope, $http, $state, googleMap, authFactory, $rootScope){
        $rootScope.address = authFactory.getMember().addresses[0];
        googleMap.setPosition($rootScope.address.latitude, $rootScope.address.longitude);
        googleMap.init();

        


}]);

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
<<<<<<< HEAD
		$scope.editAddress = function () {
			$state.go("editAddress");
		};
}]);
=======
	}
]);
>>>>>>> master

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

app.factory('googleMap', function ($rootScope) {
	var position = {
		lat: "13.752",
		lng: "100.493",
		address: ""
	};

	function setPosition(latitude, longitude){
		position.lat = latitude;
		position.lng = longitude;
	}

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
		position: position,
		setPosition: setPosition
	};
});
