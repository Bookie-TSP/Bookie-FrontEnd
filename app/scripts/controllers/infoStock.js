app.controller('infoStockCtrl', ['$scope', '$http', '$state', '$rootScope',
    function ($scope, $http, $state, $rootScope) {
			//console.log($rootScope.newBook);

		$scope.type = '';

		$scope.nextStep = function () {
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
		};
}]);
