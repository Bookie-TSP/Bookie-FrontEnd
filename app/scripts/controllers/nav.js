var app = angular.module('app');

app.controller('navCtrl',['$scope','$http', '$state', 'authFactory',
  function($scope, $http, $state, authFactory){
    $scope.goHome = function(){
        $state.go("home");
    };
    $scope.goLogin = function(){
        $state.go("login");
    };
    $scope.logout = function(){
        authFactory.setAuth("");
        console.log($scope.member);
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
        else{
            $scope.member = undefined;
        }
    };
    $scope.member = $scope.getMember();
    $scope.$on('authenticate', function () {
        console.log("Change");
         $scope.getMember();
    });
}]);
