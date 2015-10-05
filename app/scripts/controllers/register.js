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
                console.log($s.firstname);
                console.log($s.surname);
                console.log($s.gender);
                console.log($s.birthDate);
                console.log($s.IDNo);
                console.log($s.phoneNo);
                console.log($s.email);
                console.log($s.username);
                console.log($s.password);
                console.log($s.confirmPassword);

                $http.post('https://bookieservice.herokuapp.com/api/sessions',{
                    first_name: $s.firstname,
                    sur_name: $s.surname,
                    gender: $s.gender,
                    birth_date: $s.birthDate,
                    identification_number: $s.IDNo,
                    phone_number: $s.phoneNum,
                    email: $s.email,
                    username: $s.username,
                    password: $s.password,
                    confirmPassword: $s.confirmPassword
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
