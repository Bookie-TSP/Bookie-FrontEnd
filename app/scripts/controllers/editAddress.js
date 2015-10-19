app.controller('addressCtrl',['$scope','$http', '$state', 'googleMap', 'authFactory', '$rootScope',
    function($scope, $http, $state, googleMap, authFactory, $rootScope){
        $rootScope.address = authFactory.getMember().addresses[0];
        googleMap.setPosition($rootScope.address.latitude, $rootScope.address.longitude);
        googleMap.init();

        


}]);
