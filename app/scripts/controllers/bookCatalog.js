app.controller('bookCatalogCtrl', ['$scope', '$http', '$state', 'authFactory', '$timeout',
function ($scope, $http, $state, authFactory, $timeout) {
		$scope.allDataLoaded = false;
		//move getting books to navCtrl
		$scope.dotdotdot = function () {
			//wait for 1 sec then do dotdotdot
			setTimeout(function () {
				$('.book-name')
					.each(function () {
						$(this)
							.dotdotdot();
					});
			}, 1000);
		};
}]);
