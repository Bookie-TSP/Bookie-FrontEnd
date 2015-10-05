var app = angular.module('app');

app.controller('navCtrl',['$scope','$http', '$state', 'authFactory',
  function($scope, $http, $state, authFactory){
    $scope.goHome = function(){
        $state.go("home");
    };
    $scope.goLogin = function(){
        $state.go("login");
    };
    $scope.getAuth = function(){
        console.log(authFactory.getAuth());
    };
}]);
