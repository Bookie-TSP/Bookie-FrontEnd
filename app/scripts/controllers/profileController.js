angular.module('todo', [])
	.controller('profileCtrl', ['$scope', '$http',
function ($scope, $http) {
	$scope.profileData = {};
    $scope.login = function(){
      console.log("Loging In");
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
      console.log("Getting the profile");
    	var config = {headers: {
            'Authorization': "M8LzsSzLYD-7mCfMgqf7"
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