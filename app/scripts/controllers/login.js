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
