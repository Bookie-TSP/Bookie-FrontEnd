var app = angular.module('app', ['ui.router', 'ngStorage', 'ui.bootstrap', 'uiGmapgoogle-maps', 'ngFileUpload', 'cloudinary']);
app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html',
			data : { pageTitle: 'Home' }
		})
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			data : { pageTitle: 'Login' }
		})
		.state('register', {
			url: '/register',
			templateUrl: 'views/register.html',
			data : { pageTitle: 'Register' }
		})
		.state('viewProfile', {
			url: '/viewProfile',
			templateUrl: 'views/viewProfile.html',
			data : { pageTitle: 'View Profile' }
		})
		.state('editProfile', {
			url: '/editProfile',
			templateUrl: 'views/editProfile.html',
			data : { pageTitle: 'Edit Profile' }
		})
		.state('bookProfile', {
			url: '/book/:bookId',
			templateUrl: 'views/bookProfile.html',
			data : { pageTitle: 'Book Profile' }
		})
		.state('editAddress', {
			url: '/editAddress',
			templateUrl: 'views/editAddress.html',
			data : { pageTitle: 'Edit Address' }
		})
		.state('order', {
			url: '/order',
			templateUrl: 'views/order.html',
			data : { pageTitle: 'Order' }
		})
		.state('requestedOrder', {
			url: '/requestedOrder',
			templateUrl: 'views/requestedOrder.html',
			data : { pageTitle: 'Requested Order' }
		})
		.state('cart', {
			url: '/cart',
			templateUrl: 'views/cart.html',
			data : { pageTitle: 'My Cart' }
		})
		.state('payment', {
			url: '/payment',
			templateUrl: 'views/payment.html',
			data : { pageTitle: 'Payment' }
		})
		.state('viewStock', {
			url: '/viewStock',
			templateUrl: 'views/viewStock.html',
			data : { pageTitle: 'My Stock' }
		})
        .state('stockBookProfile', {
            url: '/stockBookProfile/:lineStockId/:bookId',
            templateUrl: 'views/stockBookProfile.html',
            data : { pageTitle: 'Stock Book Profile' }
        })
		.state('newStock',{
			url: '/newStock',
			templateUrl: 'views/newStock.html',
			data : { pageTitle: 'New Stock' }
		})
		.state('newStock.first', {
			url: '/1',
			templateUrl: 'views/newStocks/searchStock.html',
			data : { pageTitle: 'Search Stock' }
		})
		.state('newStock.second', {
			url: '/2',
			templateUrl: 'views/newStocks/photoStock.html',
			data : { pageTitle: 'Add Photo' }
		})
		.state('newStock.third', {
			url: '/3',
			templateUrl: 'views/newStocks/infoStock.html',
			data : { pageTitle: 'Add Information' }
		})
		.state('newStock.fourth', {
			url: '/4',
			templateUrl: 'views/newStocks/completeStock.html',
			data : { pageTitle: 'Confirm Stock' }
		});
	$urlRouterProvider.otherwise('/');

});
app.run([ '$rootScope', '$state', '$stateParams',
function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);

app.directive('navbarView', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/navbar.html'
      };
});
