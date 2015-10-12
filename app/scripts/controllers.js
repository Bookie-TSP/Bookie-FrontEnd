angular.module('app',['ui.router', 'ngStorage'])
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'views/home.html'
    })
   .state('login', {
		url: '/login',
		templateUrl: 'views/login.html'
	})
     .state('register', {
        url: '/register',
        templateUrl: 'views/register.html'
    });
  $urlRouterProvider.otherwise('/');

});

app.controller('homeCtrl',['$scope','$http', '$state', '$rootScope',
  function($scope, $http, $state, $rootScope){

}]);

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
    $scope.register = function(){
        $state.go("register");
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

angular.module('todo', [])
	.controller('profileCtrl', ['$scope', '$http',
function ($scope, $http) {
	$scope.profileData = {};
    $scope.login = function(){
    	$http.post('https://bookieservice.herokuapp.com/api/sessions',{
    		email: "bookie@ku.th",
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
    	var config = {headers: {
            'Authorization': "UsUz-qtXaxcLGWf-_aaw"
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
/**
 * Created by nathakorn on 10/5/15 AD.
 */
app.controller( 'registerCtrl', [ '$scope', '$http', 'googleMap', '$state', 'authFactory',
        function ( $scope, $http, googleMap, $state, authFactory ) {
		googleMap.init();
		setInterval( function () {
			// console.log(googleMap.position);
		}, 1000 );

		$scope.submit = function () {
			var birth_date = $scope.day_birth + "/" + $scope.month_birth + "/" + $scope.year_birth;
			var address_info = googleMap.position.address + " " + $scope.more_info;

			if ( !$scope.agreeTerm ) {
				alert( "Please agree the term of condition" );
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
				$http.post( 'https://bookieservice.herokuapp.com/api/members', {
						member: member,
						address: address
					} )
					.success( function ( data ) {
						console.log( data );
						authFactory.setAuth( data.auth_token );
						$state.go( "home" );
					} )
					.error( function ( data ) {
						console.log( data );
						alert( "error : " + data.error );
					} );
			}
		};
} ] );

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

app.factory( 'googleMap', function () {
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
