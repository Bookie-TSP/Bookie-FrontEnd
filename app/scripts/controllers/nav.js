var app = angular.module('app');

app.controller('navCtrl',['$scope','$http', '$state', 'authFactory',
  function($scope, $http, $state, authFactory){
    $scope.member = null;
    $scope.goHome = function(){
        $state.go("home");
    };
    $scope.goLogin = function(){
        $state.go("login");
    };
    $scope.getAuth = function(){
        console.log(authFactory.getAuth());
    };
    $scope.getMember = function(){
        if(authFactory.getAuth() !== ""){
            var config = {headers: {
                    'Authorization': authFactory.getAuth()
            }};
            $http.get('https://bookieservice.herokuapp.com/api/myprofile',config)
            .success(function(data){
              $scope.member = data;
            }).error(function(data){
              console.log(data);
            });
        }
    };
    $scope.$on('authenticate', function () {
        console.log("Assas");
         $scope.getMember();
    });
}]);
