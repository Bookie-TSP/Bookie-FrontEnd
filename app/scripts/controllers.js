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
	})
     .state('register', {
        url: '/register',
        templateUrl: 'views/register.html'
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
/**
 * Created by nathakorn on 9/28/15 AD.
 */
var app = angular.module('app')
    app.controller('registerCtrl', ['$scope','$http', 'todoApi', 'googleMap',
        function ($scope, $http,$factory, googleMap) {
            googleMap.init();
            setInterval(function(){
               // console.log(googleMap.position);
            }, 1000)
            $scope.auth = "";
            $scope.submit = function () {
                console.log($scope.email);
                console.log($scope.password);
                console.log($scope.password_confirmation);
                console.log($scope.first_name);
                console.log($scope.last_name);
                console.log($scope.day_birth);
                console.log($scope.month_birth);
                console.log($scope.year_birth);
                console.log($scope.more_info);
                console.log($scope.phone_number);
                console.log($scope.identification_number);
                if (!$scope.agreeTerm) {
                    alert("Please agree the term of condition");
                } else {
                    var member = [{
                        email: $scope.email,
                        password: $scope.password,
                        first_name: $scope.first_name,
                        last_name: $scope.last_name,
                        day_birth: $scope.day_birth,
                        month_birth: $scope.month_birth,
                        year_birth: $scope.year_birth,
                        phone_number: $scope.phone_number,
                        identification_number: $scope.identification_number
                    }];
                    var address = [{
                        first_name: $scope.first_name,
                        last_name: $scope.last_name,
                        latitude: googleMap.position.lat,
                        longitude: googleMap.position.lng,
                        address: googleMap.position.address,
                        more_info: $scope.more_info
                    }]
                    //send member
                    $http.post('https://bookieservice.herokuapp.com/api/members', {
                        member: member
                    })
                    //send member address
                    $http.post('https://bookieservice.herokuapp.com/api/members', {
                        member: address
                    })
                        .success(function (data) {
                            console.log(JSON.stringify(data));
                            console.log(data);
                            $scope.auth = data.auth_token;
                        }).error(function (data) {
                            console.log(JSON.stringify(data));
                        });
                    alert("Thank you for sign up!");
                }
            }
        }])
    .factory('todoApi', [function () {

        return {};
    }])
        .factory('googleMap', function(){
            var position = {lat:"13.752", lng:"100.493", address: ""};
            function initialize() {
                var geocoder = new google.maps.Geocoder;
                var infowindow = new google.maps.InfoWindow;

                var bkk = new google.maps.LatLng(position.lat, position.lng);
                var mapProp = {
                    center: bkk,
                    zoom: 8,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    disableDefaultUI: true
                };

                var marker = new google.maps.Marker({
                    position: bkk,
                    draggable: true
                });

                var styles = [
                    {
                        "featureType": "landscape",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "lightness": 57
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "lightness": 24
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }
                ]

                var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
                marker.setMap(map);
                map.setOptions({styles: styles});

                google.maps.event.addListener(marker, 'dragend', function(mark){
                    var latitude = mark.latLng.lat();
                    var longitude = mark.latLng.lng();
                    geocodeLatLng(geocoder, map, marker, infowindow, latitude, longitude);
                    position.lat = latitude.toFixed(3)
                    position.lng = longitude.toFixed(3)
                    document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + latitude.toFixed(3) + ' Current Lng: ' + longitude.toFixed(3) + '</p>';
                });
            }

// this function is used for convert lat and lng into address
            function geocodeLatLng(geocoder, map, marker, infowindow, latitude, longitude) {
                var latlng = {
                    lat: latitude,
                    lng: longitude
                };

                geocoder.geocode({'location': latlng}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            var address = results[1].formatted_address;
                            infowindow.setContent(address);
                            infowindow.open(map, marker);

                            document.getElementById('address').innerHTML = '<p>Current add: ' + address + '</p>';
                            position.address = address;
                        }
                        else {
                            window.alert('No results found');
                        }
                    }
                    else {
                        window.alert('Geocoder failed due to: ' + status);
                    }
                });
            }
            function init () {
                google.maps.event.addDomListener(window, 'load', initialize);
            }

// initial map and pin by calling initialize function
            return {
                init: init,
                initialize: initialize,
                geocodeLatLng: geocodeLatLng,
                position: position

            }
        });
