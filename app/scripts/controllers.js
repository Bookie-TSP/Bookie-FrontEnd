angular.module('app',['ui.router', 'ngStorage'])
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        cache: false
    })
   .state('login', {
		url: '/login',
		templateUrl: 'views/login.html'
	});

  $urlRouterProvider.otherwise('/');

});

var app = angular.module('app');

app.factory('authFactory', function ($http, $rootScope, $localStorage) {
    return {
        getAuth: function() {
            return $localStorage.authToken;
        },
        setAuth: function(token) {
            $localStorage.authToken = token;
            $rootScope.$broadcast('authenticate');
        }
    };
});


.controller( 'editProfileCtrl', [ '$scope', '$http', 'googleMap',
  function ( $scope, $http, googleMap ) {
			$scope.profileData = {};
			$scope.login = function () {
				console.log( "Loging In" );
				$http.post( 'https://bookieservice.herokuapp.com/api/sessions', {
						email: "bookie@ku.th",
						password: "12345678"
					} )
					.success( function ( data ) {
						console.log( JSON.stringify( data ) );
						console.log( data );
					} )
					.error( function ( data ) {
						console.log( JSON.stringify( data ) );
					} );
			};
			$scope.getProfile = function () {
				console.log( "Getting the profile" );
				var config = {
					headers: {
						'Authorization': "nZVpNDd93-vbK5QRZuts"
					}
				};
				$http.get( 'https://bookieservice.herokuapp.com/api/myprofile', config )
					.success( function ( data ) {
						$scope.profileData = data;

						console.log( JSON.stringify( data ) );
						console.log( data );
					} )
					.error( function ( data ) {
						console.log( JSON.stringify( data ) );
					} );
			}
			$scope.editProfile = function () {
				console.log( "Editing the profile" );
				var config = {
					headers: {
						'Authorization': "nZVpNDd93-vbK5QRZuts"
					}
				};
				// $scope.member.password = "123451234";
				// $scope.member.password_confirmation = "123451234";
				console.log( $scope.profileData );
				console.log( "Password: " + $scope.profileData.password );
				console.log( "Information: " + $scope.profileData.information );
				$scope.email = $scope.profileData.email
				$http.put( 'https://bookieservice.herokuapp.com/api/members', {
						member: {
							email: $scope.profileData.email,
							password: $scope.profileData.password,
							password_confirmation: $scope.profileData.password,
							first_name: $scope.profileData.first_name,
							last_name: $scope.profileData.last_name,
							phone_number: $scope.profileData.phone_number,
							identification_number: $scope.profileData.identification_number,
							gender: $scope.profileData.gender,
							birth_date: $scope.profileData.birth_date
						},
						address: {
							first_name: $scope.profileData.first_name,
							last_name: $scope.profileData.last_name,
							latitude: "12",
							longitude: "24",
							information: $scope.profileData.information
						}
					}, config )
					.success( function ( data ) {
						console.log( "Success" );
						console.log( JSON.stringify( data ) );
						console.log( data );
					} )
					.error( function ( data ) {
						console.log( "Error" );
						console.log( JSON.stringify( data ) );
					} );
			};

  } ] );

var app = angular.module('app');

app.controller('homeCtrl',['$scope','$http', '$state', '$rootScope',
  function($scope, $http, $state, $rootScope){

}]);

var app = angular.module('app');

app.controller('loginCtrl',['$scope','$http','$state', 'authFactory',
  function($scope, $http, $state, authFactory){
  	$scope.validation = "";
    setValidation = function(s){
    	$scope.validation = s;
    };

    $scope.login = function(){
      $http.post('https://bookieservice.herokuapp.com/api/sessions',{
        email: $scope.email,
        password: $scope.password
      })
      .success(function(data){
        $scope.auth = data.auth_token;
        authFactory.setAuth($scope.auth);
        $state.go("home");
      }).error(function(data){
        console.log(data);
        setValidation("Invalid email or password");
      });
    };
}]);


angular.module('app')
.factory('googleMap', function () {
	var position = {
		lat: "13.752",
		lng: "100.493",
		address: ""
	};

	function initialize() {
		var geocoder = new google.maps.Geocoder;
		var infowindow = new google.maps.InfoWindow;

		var bkk = new google.maps.LatLng( position.lat, position.lng );
		var mapProp = {
			center: bkk,
			zoom: 7,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true
		};

		var marker = new google.maps.Marker( {
			position: bkk,
			draggable: true
		} );

		var styles = [ {
				"featureType": "landscape",
				"elementType": "labels",
				"stylers": [ {
					"visibility": "off"
                } ]
            },
            {
				"featureType": "poi",
				"elementType": "labels",
				"stylers": [ {
					"visibility": "off"
                } ]
            },
            {
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [ {
					"lightness": 57
                } ]
            },
            {
				"featureType": "road",
				"elementType": "labels.text.fill",
				"stylers": [ {
					"visibility": "on"
                },
                {
					"lightness": 24
                } ]
            },
            {
				"featureType": "road",
				"elementType": "labels.icon",
				"stylers": [ {
					"visibility": "off"
                } ]
            },
			{
				"featureType": "transit",
				"elementType": "labels",
				"stylers": [ {
					"visibility": "off"
                } ]
            },
			{
				"featureType": "water",
				"elementType": "labels",
				"stylers": [ {
					"visibility": "off"
                } ]
            }
        ];

		var map = new google.maps.Map( document.getElementById( "googleMap" ), mapProp );
		marker.setMap( map );
		map.setOptions( {
			styles: styles
		} );

		google.maps.event.addListener( marker, 'dragend', function ( mark ) {
			var latitude = mark.latLng.lat();
			var longitude = mark.latLng.lng();
			geocodeLatLng( geocoder, map, marker, infowindow, latitude, longitude );
			position.lat = latitude.toFixed( 3 );
			position.lng = longitude.toFixed( 3 );
			document.getElementById( 'current' )
				.innerHTML = '<p>Marker dropped: Current Lat: ' + latitude.toFixed( 3 ) + ' Current Lng: ' + longitude.toFixed( 3 ) + '</p>';
		} );
	}

	// this function is used for convert lat and lng into address
	function geocodeLatLng( geocoder, map, marker, infowindow, latitude, longitude ) {
		var latlng = {
			lat: latitude,
			lng: longitude
		};

		geocoder.geocode( {
			'location': latlng
		}, function ( results, status ) {
			if ( status === google.maps.GeocoderStatus.OK ) {
				if ( results[ 1 ] ) {
					var address = results[ 1 ].formatted_address;
					infowindow.setContent( address );
					infowindow.open( map, marker );

					document.getElementById( 'address' )
						.innerHTML = '<p>Current add: ' + address + '</p>';
					position.address = address;
				} else {
					window.alert( 'No results found' );
				}
			} else {
				window.alert( 'Geocoder failed due to: ' + status );
			}
		} );
	}

	function init() {
		google.maps.event.addDomListener( window, 'load', initialize );
		console.log( "init" );
	}

	// initial map and pin by calling initialize function
	return {
		init: init,
		initialize: initialize,
		geocodeLatLng: geocodeLatLng,
		position: position

	};
} );
var app = angular.module('app');

app.controller('navCtrl',['$scope','$http', '$state', 'authFactory', '$rootScope',
  function($scope, $http, $state, authFactory, $rootScope){
    $scope.goHome = function(){
        $state.go("home");
    };
    $scope.goLogin = function(){
        $state.go("login");
    };
    $scope.logout = function(){
        authFactory.setAuth(undefined);
    };
    $scope.getMember = function(){
        if(authFactory.getAuth() !== undefined){
            var config = {headers: {
                    'Authorization': authFactory.getAuth()
            }};
            $http.get('https://bookieservice.herokuapp.com/api/myprofile',config)
            .success(function(data){
              $rootScope.member = data;
            }).error(function(data){
              console.log(data);
            });
        }
        else{
            $rootScope.member = undefined;
        }
    };
    $rootScope.member = $scope.getMember();
    $scope.$on('authenticate', function () {
        console.log("Change");
        $rootScope.member = $scope.getMember();
    });
}]);

angular.module('app', [])
	.controller('profileCtrl', ['$scope', '$http',
function ($scope, $http) {
	$scope.profileData = {};
    $scope.login = function(){
      console.log("Loging In");
    	$http.post('https://bookieservice.herokuapp.com/api/sessions',{
    		email: "test@test.test",
    		password: "12345678"
    	})
    	.success(function(data){
    		console.log(JSON.stringify(data));
    		console.log(data);
    	}).error(function(data){
    		console.log(JSON.stringify(data));
    	});
    };
    $scope.getProfile = function() {
      console.log("Getting the profile");
    	var config = {headers: {
            'Authorization': "nZVpNDd93-vbK5QRZuts"
      	}};
      	$http.get('https://bookieservice.herokuapp.com/api/myprofile', config)
      	.success(function(data){
      		$scope.profileData = data;
      		console.log(JSON.stringify(data));
      		console.log(data);
      	}).error(function(data){
      		console.log(JSON.stringify(data));
      	});
    }
}]);