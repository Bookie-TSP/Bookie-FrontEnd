angular.module('app', [])
.controller('editProfileCtrl', ['$scope', '$http',
    function ($scope, $http) {
       $scope.profileData = {};
       $scope.login = function(){
          console.log("Loging In");
          $http.post('https://bookieservice.herokuapp.com/api/sessions',{
              email: "bookie@ku.th",
              password: "12345678"
          })
          .success(function(data){
              console.log(JSON.stringify(data));
              console.log(data);
          }).error(function(data){
              console.log(JSON.stringify(data));
          });
      };
      $scope.getProfile = function() {
          console.log("Getting the profile");
          var config = {headers: {
            'Authorization': "M8LzsSzLYD-7mCfMgqf7"
        }};
        $http.get('https://bookieservice.herokuapp.com/api/myprofile', config)
        .success(function(data){
            $scope.profileData = data;

            console.log(JSON.stringify(data));
            console.log(data);
        }).error(function(data){
            console.log(JSON.stringify(data));
        });
    }
    $scope.editProfile = function(){
        console.log("Editing the profile");
        var config = {headers: {
            'Authorization': "M8LzsSzLYD-7mCfMgqf7"
        }};
        // $scope.member.password = "123451234";
        // $scope.member.password_confirmation = "123451234";
        console.log($scope.profileData);
        console.log("Password: " + $scope.profileData.password);
        $scope.email = $scope.profileData.email
        $http.put('https://bookieservice.herokuapp.com/api/members/1', {
            member: 
                {
                    email: $scope.profileData.email,
                    password: "12340000",
                    password_confirmation: "12340000",
                    first_name: "Varis",
                    last_name: "Kritpolchai",
                    phone_number: "0909839367",
                    identification_number: "1101700175626",
                    gender: "Male",
                    birth_date: "15/07/95"
                }
            },config)
      .success(function(data){
        console.log("Success");
        console.log(JSON.stringify(data));
        console.log(data);
        $scope.getProfile();
    }).error(function(data){
        console.log("Error");
        console.log(JSON.stringify(data));
    });
};
}]);