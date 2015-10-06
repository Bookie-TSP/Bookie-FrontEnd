angular.module('app',['ui.router', 'ngCookies'])
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

app.factory('authFactory', function ($http, $rootScope, $cookieStore) {
    return {
        getAuth: function() {
            return $cookieStore.get('authToken');
        },
        setAuth: function(token) {
            $cookieStore.put('authToken', token );
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