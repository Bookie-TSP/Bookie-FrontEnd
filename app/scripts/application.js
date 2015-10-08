angular.module('app',['ui.router', 'ngStorage'])
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
	})
     .state('register', {
        url: '/register',
        templateUrl: 'views/register.html'
    });
  $urlRouterProvider.otherwise('/');

});
