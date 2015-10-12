var app = angular.module('app',['ui.router', 'ngStorage']);
app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'views/home.html'
    })
   .state('login', {
		url: '/login',
		templateUrl: 'views/login.html'
	})
     .state('register', {
        url: '/register',
        templateUrl: 'views/register.html'
    })
    .state('viewProfile', {
        url: '/viewProfile',
        templateUrl: 'views/viewProfile.html'
    })
    .state('editProfile', {
        url: '/editProfile',
        templateUrl: 'views/editProfile.html'
    });
  $urlRouterProvider.otherwise('/');

});
