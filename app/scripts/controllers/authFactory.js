var app = angular.module('app');

app.factory('authFactory', function ($http, $rootScope, $cookieStore) {
    return {
        getAuth: function() {
            return $cookieStore.get('authToken');
        },
        setAuth: function(token) {
            $cookieStore.put('authToken', token );
            $rootScope.$broadcast('authenticate');
        }
    };
});
