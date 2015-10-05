var app = angular.module('app');

app.factory('authFactory', function () {
    this.authToken = "";
    return {
        getAuth: function() {
            return this.authToken;
        },
        setAuth: function(token) {
            this.authToken = token;
        }
    };
});
