angular.module('app',['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        cache: false
    })
   .state('login', {
		url: '/login',
		templateUrl: 'views/login.html'
	});

  $urlRouterProvider.otherwise('/');

});
