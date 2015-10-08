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
    app.controller('registerCtrl', ['$scope','$http', 'todoApi',
        function ($s, $http,$factory) {
            $s.auth = "";
            $s.submit = function () {

                console.log($s.email);
                console.log($s.password);
                console.log($s.password_confirmation);
                console.log($s.first_name);
                console.log($s.last_name);
                console.log($s.birth_date);
                console.log($s.phone_number);
                console.log($s.identification_number);
                //console.log($s.latitude);
                //console.log($s.longtitude);
                //console.log($s.information);

                var member = [{
                    email: email,
                    password: password,
                    first_name: first_name,
                    last_name: last_name,
                    birth_date: birth_date,
                    phone_number: phone_number,
                    identification_number:  identification_number
                }];
                var address = [{
                    first_name: first_name,
                    last_name: last_name,
                    latitude: latitude,
                    longitude: longtitude,
                    information: information
                }]
                //send member
                $http.post('https://bookieservice.herokuapp.com/api/members',{
                   member: member
                })
                //send member address
                $http.post('https://bookieservice.herokuapp.com/api/members',{
                    member: address
                })
                .success(function(data){
                    console.log(JSON.stringify(data));
                    console.log(data);
                    $s.auth = data.auth_token;
                }).error(function(data){
                    console.log(JSON.stringify(data));
                });
            };
        }])
    .factory('todoApi', [function () {

        return {};
    }]);
