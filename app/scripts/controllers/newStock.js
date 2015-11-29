app.controller('newStockCtrl', ['$scope', '$http', '$state', 'authFactory', '$rootScope',
	function ($scope, $http, $state, authFactory, $rootScope) {
		if (authFactory.getAuth() === undefined) {
			$state.go('login');
		}
		else{
			// go to first step
			$state.go("newStock.first");
		}

		// New book and stock
		$rootScope.newBook = {};
		$rootScope.newStock = {};

		// steps
		$rootScope.steps = [true, false, false, false];

		$rootScope.changeStep = function (step) {
			$scope.stepsName = ['first', 'second', 'third', 'fourth'];
			if ($rootScope.steps[step - 1] !== false) {
				for (var i = 0; i < 4; i++) {
					if (i === step - 1) {
						$rootScope.steps[i] = true;
					} else {
						if ($rootScope.steps[i] === true || $rootScope.steps[i] === null) {
							$rootScope.steps[i] = null;
						} else {
							$rootScope.steps[i] = false;
						}
					}
				}
				$state.go('newStock.' + $scope.stepsName[step - 1]);
			}
			console.log($rootScope.steps);
		};

}]);
