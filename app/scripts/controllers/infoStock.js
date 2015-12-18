app.controller('infoStockCtrl', ['$scope', '$http', '$state', '$rootScope',
    function ($scope, $http, $state, $rootScope) {
		//console.log($rootScope.newBook);

        $rootScope.changeStep(3);

        $scope.type = '';
        $scope.price = '';
        $scope.condition = '';
        $scope.description = '';
        $scope.quantity = '';
        $scope.duration = '';
        
		$scope.errors = {};

		$scope.nextStep = function () {
			$scope.errors = {};
            $scope.checkError = false;
			if ($scope.price === '' || $scope.price <= 0) {
				$scope.errors.price = 'Please insert price correctly';
                $scope.checkError = true;
			}
            if ($scope.condition === '') {
				$scope.errors.condition = 'Please select condition';
                $scope.checkError = true;
			}
            if ($scope.description === '') {
				$scope.errors.description = 'Please insert description';
                $scope.checkError = true;
			}
            if ($scope.quantity === '' || $scope.quantity <= 0) {
				$scope.errors.quantity = 'Please insert quantity correctly';
                $scope.checkError = true;
			}
            if (($scope.duration === '' || $scope.duration <= 0 ) && $scope.type === 'lend') {
				$scope.errors.duration = 'Please insert duration correctly';
                $scope.checkError = true;
			}
            if(!$scope.checkError){
				$rootScope.newStock = {
					book_id: $rootScope.newBook.id,
					status: 'stock',
					price: $scope.price,
					type: $scope.type,
					condition: $scope.condition,
					description: $scope.description,
					quantity: $scope.quantity
				};
				if ($scope.type === 'lend') {
					$rootScope.newStock.terms = $scope.terms;
					$rootScope.newStock.duration = $scope.duration;
				}
				console.log($rootScope.newStock);
				$rootScope.steps[2] = null;
				$rootScope.steps[3] = true;
				$state.go('newStock.fourth');
			}
		};

        $scope.$watch('condition', function(){
            if($scope.condition === 'new'){
                $scope.description = 'Brands new book';
            }
            else{
                $scope.description = '';
            }
        });
}]);
