/**
 * Created by nathakorn on 10/5/15 AD.
 */
/**
 * Created by nathakorn on 9/28/15 AD.
 */
var app = angular.module('app')
    app.controller('registerCtrl', ['$scope','$http', 'todoApi',
        function ($scope, $http,$factory) {
            $scope.auth = "";
            $scope.submit = function () {
                console.log($scope.email);
                console.log($scope.password);
                console.log($scope.password_confirmation);
                console.log($scope.first_name);
                console.log($scope.last_name);
                console.log($scope.day_birth);
                console.log($scope.month_birth);
                console.log($scope.year_birth);
                console.log($scope.more_info);
                console.log($scope.phone_number);
                console.log($scope.identification_number);
                //console.log($scope.latitude);
                //console.log($scope.longtitude);

                if (!$scope.agreeTerm) {
                    alert("Please agree the term of condition");
                } else {
                    var member = [{
                        email: $scope.email,
                        password: $scope.password,
                        first_name: $scope.first_name,
                        last_name: $scope.last_name,
                        day_birth: $scope.day_birth,
                        month_birth: $scope.month_birth,
                        year_birth: $scope.year_birth,
                        phone_number: $scope.phone_number,
                        identification_number: $scope.identification_number
                    }];
                    var address = [{
                        first_name: $scope.first_name,
                        last_name: $scope.last_name,
                        //latitude: $scope.latitude,
                        //longitude: $scope.longtitude,
                        more_info: $scope.more_info
                    }]
                    //send member
                    $http.post('https://bookieservice.herokuapp.com/api/members', {
                        member: member
                    })
                    //send member address
                    $http.post('https://bookieservice.herokuapp.com/api/members', {
                        member: address
                    })
                        .success(function (data) {
                            console.log(JSON.stringify(data));
                            console.log(data);
                            $scope.auth = data.auth_token;
                        }).error(function (data) {
                            console.log(JSON.stringify(data));
                        });
                    alert("Thank you for sign up!");
                }
            }
        }])
    .factory('todoApi', [function () {

        return {};
    }]);
