var app = angular.module('app');

app.controller('navCtrl',['$scope','$http', '$state',
  function($scope, $http, $state){
    $scope.goHome = function(){
        $state.go("home");
    };
    $scope.goLogin = function(){
        $state.go("login");
    };
}]);
