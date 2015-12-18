app.controller('orderStatusChangerCtrl', ['$scope', '$http', '$state', 'authFactory',
    function ($scope, $http, $state, authFactory) {
        $scope.transporterForm = function(){
            $state.go("transporterForm");
        };
        $scope.sevenElevenForm = function(){
            $state.go("sevenElevenForm");
        };
        $scope.bookSellerForm = function(){
            $state.go("bookOwnerForm");
        };
    }]);
