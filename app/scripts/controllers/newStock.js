app.controller('newStockCtrl', ['$scope', '$http', '$state', 'authFactory', '$rootScope',
	function ($scope, $http, $state, authFactory, $rootScope) {
		if (authFactory.getAuth() === undefined) {
			$state.go('login');
		}

		// New book add to stock
		$rootScope.newBookStock = {};

		// steps
		$rootScope.firstStep = true;
		$rootScope.secondStep = false;
		$rootScope.thirdStep = false;
		$rootScope.fourthStep = false;

		// go to first step
		$state.go("newStock.first");

		//Initialize tooltips
		$('.nav-tabs > li a[title]')
			.tooltip();

		//Wizard
		$('a[data-toggle="tab"]')
			.on('show.bs.tab', function (e) {

				var $target = $(e.target);

				if ($target.parent()
					.hasClass('disabled')) {
					return false;
				}
			});

		// $(".next-step")
		// 	.click(function (e) {
		//
		// 		var $active = $('.wizard .nav-tabs li.active');
		// 		$active.next()
		// 			.removeClass('disabled');
		// 		$scope.nextTab($active);
		//
		// 	});
		// $(".prev-step")
		// 	.click(function (e) {
		//
		// 		var $active = $('.wizard .nav-tabs li.active');
		// 		$scope.prevTab($active);
		//
		// 	});

		$scope.nextTab = function (elem) {
			$(elem)
				.next()
				.find('a[data-toggle="tab"]')
				.click();
		};
		$scope.prevTab = function (elem) {
			$(elem)
				.prev()
				.find('a[data-toggle="tab"]')
				.click();
		};

}]);
