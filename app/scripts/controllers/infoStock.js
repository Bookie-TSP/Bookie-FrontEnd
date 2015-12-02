app.controller('infoStockCtrl', ['$scope', '$http', '$state', '$rootScope',
    function ($scope, $http, $state, $rootScope) {
		//console.log($rootScope.newBook);

		$scope.type = '';
		$scope.errors = {};

		$scope.nextStep = function () {
			$scope.errors = {};
            $scope.checkError = false;
			if ($scope.price === undefined) {
				$scope.errors.price = 'Please insert price';
                $scope.checkError = true;
			}
            if ($scope.condition === undefined) {
				$scope.errors.condition = 'Please select condition';
                $scope.checkError = true;
			}
            if ($scope.description === undefined) {
				$scope.errors.description = 'Please insert description';
                $scope.checkError = true;
			}
            if ($scope.quantity === undefined) {
				$scope.errors.quantity = 'Please insert quantity';
                $scope.checkError = true;
			}
            if ($scope.duration === undefined && $scope.type === 'lend') {
				$scope.errors.duration = 'Please insert duration';
                $scope.checkError = true;
			}
            if( !$scope.checkError){
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
}]);
