var app = angular.module('app', []);

app.controller('login',['$scope','$http',
  function($scope, $http){
    $scope.auth = "";
    $scope.login = function(){
      $http.post('https://bookieservice.herokuapp.com/api/sessions',{
        email: $scope.email,
        password: $scope.password
      })
      .success(function(data){
        console.log(JSON.stringify(data));
        console.log(data);
        $scope.auth = data.auth_token;
      }).error(function(data){
        console.log(JSON.stringify(data));
      });
    };
}]);