var app = angular.module('app');

app.factory('authFactory', function ($http, $rootScope, $cookieStore) {
    return {
        getAuth: function() {
            console.log($cookieStore.get('authToken'));
            return $cookieStore.get('authToken');
        },
        setAuth: function(token) {
            $cookieStore.put('authToken', token );
            console.log(token);
            $rootScope.$broadcast('authenticate');
        },
        getMember: function(){
            this.authToken = $cookieStore.get('authToken');
            if(this.authToken !== ""){
                console.log(this.authToken);
                var config = {headers: {
                        'Authorization': this.authToken
                }};
                $http.get('https://bookieservice.herokuapp.com/api/myprofile',config)
                .success(function(data){
                  this.member = data;
                  return this.member;
                }).error(function(data){
                  console.log(data);
                });
            }
        }
    };
});
