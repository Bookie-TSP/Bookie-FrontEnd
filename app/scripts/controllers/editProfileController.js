angular.module('app', [])
	.controller('editProfileCtrl', ['$scope', '$http',
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
            'Authorization': "iULPjj8gi-NGRwL3_aPF"
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