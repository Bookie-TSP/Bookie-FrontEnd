app.controller('orderStatusChangerCtrl', ['$scope', '$http', '$state', 'authFactory',
    function ($scope, $http, $state, authFactory) {
        if (authFactory.getAuth() === undefined) {
            $state.go("login");
        }
        $scope.transporterForm = function(){
            $state.go("order");
        };
        $scope.sevenElevenForm = function(){
            $state.go("order");
        };
        $scope.bookSellerForm = function(){
            $state.go("register");
        };
    }]);
