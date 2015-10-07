/**
 * Created by nathakorn on 10/5/15 AD.
 */
/**
 * Created by nathakorn on 9/28/15 AD.
 */
var app = angular.module('register', [])
    app.controller('page', ['$scope','$http', 'todoApi',
        function ($s, $http,$factory) {
            $s.auth = "";
            $s.submit = function () {
                /*
                console.log($s.email);
                console.log($s.password);
                console.log($s.password_confirmation);
                console.log($s.first_name);
                console.log($s.last_name);
                console.log($s.birth_date);
                console.log($s.phone_number);
                console.log($s.identification_number);
                console.log($s.latitude);
                console.log($s.longtitude);
                 console.log($s.information);
                */
                var member = [{
                    email: email,
                    password: password,
                    first_name: first_name,
                    last_name: last_name,
                    birth_date: birth_date,
                    phone_number: phone_number,
                    identification_number:  identification_number
                }];
                var address = [{
                    first_name: first_name,
                    last_name: last_name,
                    latitude: latitude,
                    longitude: longtitude,
                    information: information
                }]
                //send member
                $http.post('https://bookieservice.herokuapp.com/api/members',{
                   member: member
                })
                //send member address
                $http.post('https://bookieservice.herokuapp.com/api/members',{
                    member: address
                })
                .success(function(data){
                    console.log(JSON.stringify(data));
                    console.log(data);
                    $s.auth = data.auth_token;
                }).error(function(data){
                    console.log(JSON.stringify(data));
                });
            };
        }])
    .factory('todoApi', [function () {

        return {};
    }]);
