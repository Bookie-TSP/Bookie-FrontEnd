app.controller('profileCtrl', ['$scope', '$http', '$state', 'authFactory',
function ($scope, $http, $state, authFactory) {
	$scope.profileData = {};
	$scope.editProfile = function(){
		$state.go("editProfile");
	};
    $scope.getProfile = function() {
      console.log("Getting the profile");
    	var config = {headers: {
            'Authorization': authFactory.getAuth()
      	}};
      	$http.get('https://bookieservice.herokuapp.com/api/myprofile', config)
      	.success(function(data){
      		$scope.profileData = data;
      		console.log(data);
      	}).error(function(data){
      		console.log(JSON.stringify(data));
      	});
    };
	$scope.getProfile();
}]);
