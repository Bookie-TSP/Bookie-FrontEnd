var app = angular.module('app', []);

app.controller('loginCtrl',['$scope','$http','$window',
  function($scope, $http, $window){
    $scope.auth = "";
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
        console.log(data);
        $scope.auth = data.auth_token;
        $window.location.href = '../index.html';
      }).error(function(data){
        console.log(data);
        setValidation("Invalid email or password");
      });
    };
}]);
