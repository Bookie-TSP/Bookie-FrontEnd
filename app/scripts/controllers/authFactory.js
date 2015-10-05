var app = angular.module('app');

app.factory('authFactory', function ($http, $rootScope) {
    var promise;
    this.authToken = "";
    this.member = {};
    return {
        getAuth: function() {
            return this.authToken;
        },
        setAuth: function(token) {
            this.authToken = token;
            $rootScope.$broadcast('authenticate');
        },
        getMember: function(){
            if(this.authToken !== ""){
                console.log(this.authToken);
                var config = {headers: {
                        'Authorization': this.authToken
                }};
                $http.get('https://bookieservice.herokuapp.com/api/myprofile',config)
                .success(function(data){
                  this.member = data;
                  console.log("in sucess");
                  console.log(this.member);
                  console.log("out sucess");
                  console.log(this.member);
                  return this.member;
                }).error(function(data){
                  console.log(data);
                });
            }
        }
    };
});
