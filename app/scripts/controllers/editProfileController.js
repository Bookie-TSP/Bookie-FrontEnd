angular.module('app', [])
.controller('editProfileCtrl', ['$scope', '$http', 'googleMap',
  function ($scope, $http, googleMap) {
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
            'Authorization': "nZVpNDd93-vbK5QRZuts"
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
            'Authorization': "nZVpNDd93-vbK5QRZuts"
        }};
        // $scope.member.password = "123451234";
        // $scope.member.password_confirmation = "123451234";
        console.log($scope.profileData);
        console.log("Password: " + $scope.profileData.password);
        console.log("Information: " + $scope.profileData.information);
        $scope.email = $scope.profileData.email
        $http.put('https://bookieservice.herokuapp.com/api/members', {
            member: 
            {
                email: $scope.profileData.email,
                password: $scope.profileData.password,
                password_confirmation: $scope.profileData.password,
                first_name: $scope.profileData.first_name,
                last_name: $scope.profileData.last_name,
                phone_number: $scope.profileData.phone_number,
                identification_number: $scope.profileData.identification_number,
                gender: $scope.profileData.gender,
                birth_date: $scope.profileData.birth_date
            },
            address:
            {
                first_name: $scope.profileData.first_name,
                last_name: $scope.profileData.last_name,
                latitude: "12",
                longitude: "24",
                information: $scope.profileData.information
            }
        },config)
        .success(function(data){
            console.log("Success");
            console.log(JSON.stringify(data));
            console.log(data);
        }).error(function(data){
            console.log("Error");
            console.log(JSON.stringify(data));
        });
    };
    $scope.mapInitialize = function() {
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;

        var bkk = new google.maps.LatLng(13.7522222, 100.4938889);
        var mapProp = {
            center: bkk,
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };

        var marker = new google.maps.Marker({
            position: bkk,
            draggable: true
        });

        var styles = [
        {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{"lightness": 57}]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 24
            }]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{"visibility": "off"}]
        },
        {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
        }]

        var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
        marker.setMap(map);
        map.setOptions({styles: styles});

        google.maps.event.addListener(marker, 'dragend', function(mark){
            var latitude = mark.latLng.lat();
            var longitude = mark.latLng.lng();
            geocodeLatLng(geocoder, map, marker, infowindow, latitude, longitude);

            document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + latitude.toFixed(3) + ' Current Lng: ' + latitude.toFixed(3) + '</p>';
        });
    }

    // this function is used for convert lat and lng into address
    function geocodeLatLng(geocoder, map, marker, infowindow, latitude, longitude) {
        var latlng = {
            lat: latitude, 
            lng: longitude
        };

        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    var address = results[1].formatted_address;
                    infowindow.setContent(address);
                    infowindow.open(map, marker);

                    document.getElementById('address').innerHTML = '<p>Current add: ' + address + '</p>';
                }
                else {
                    window.alert('No results found');
                }
            }
            else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
    // initial map and pin by calling initialize function
    google.maps.event.addDomListener(window, 'load', $scope.mapInitialize());
  }]);