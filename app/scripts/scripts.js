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
		.state('editAddress', {
			url: '/editAddress',
			templateUrl: 'views/editAddress.html',
			data : { pageTitle: 'Edit Address' }
		});
	$urlRouterProvider.otherwise('/');

});
// app.config(function(uiGmapGoogleMapApiProvider) {
//     uiGmapGoogleMapApiProvider.configure({
//     	key: 'AIzaSyBiB61BZiU_nXIBF3tZAAHyRfQeBSd9Jzo',
//         v: '3.20', //defaults to latest 3.X anyhow
//         libraries: 'weather,geometry,visualization'
//     });
// });
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

app.controller('homeCtrl', ['$scope', '$http', '$state', '$rootScope',
    function ($scope, $http, $state, $rootScope) {

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

app.controller('registerCtrl', ['$scope', '$http', 'mapFactory', '$state', 'authFactory',
        function ($scope, $http, $map, $state, authFactory) {
		if (authFactory.getAuth() !== undefined) {
			$state.go("home");
		}
        $scope.latitude = "";
        $scope.longitude = "";
        $scope.address = "";
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
			for (i = 0; i < 100; i++) {
				$scope.initYears[i] = n - i;
			}
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
		$scope.editProfile = function () {
			$state.go("editProfile");
		};
		$scope.editAddress = function () {
			$state.go("editAddress");
		};
}]);

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
		getAddress: getAddress
	};
});
