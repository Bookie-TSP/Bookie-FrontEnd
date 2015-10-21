app.controller('homeCtrl',['$scope','$http', '$state', '$rootScope',
    function($scope, $http, $state, $rootScope){
    	$scope.bookProfile = function() {
    		$state.go("bookProfile");
    	}
}]);
