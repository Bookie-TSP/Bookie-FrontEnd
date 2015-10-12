
.controller( 'editProfileCtrl', [ '$scope', '$http', 'googleMap',
  function ( $scope, $http, googleMap ) {
			$scope.profileData = {};
			$scope.login = function () {
				console.log( "Loging In" );
				$http.post( 'https://bookieservice.herokuapp.com/api/sessions', {
						email: "bookie@ku.th",
						password: "12345678"
					} )
					.success( function ( data ) {
						console.log( JSON.stringify( data ) );
						console.log( data );
					} )
					.error( function ( data ) {
						console.log( JSON.stringify( data ) );
					} );
			};
			$scope.getProfile = function () {
				console.log( "Getting the profile" );
				var config = {
					headers: {
						'Authorization': "nZVpNDd93-vbK5QRZuts"
					}
				};
				$http.get( 'https://bookieservice.herokuapp.com/api/myprofile', config )
					.success( function ( data ) {
						$scope.profileData = data;

						console.log( JSON.stringify( data ) );
						console.log( data );
					} )
					.error( function ( data ) {
						console.log( JSON.stringify( data ) );
					} );
			}
			$scope.editProfile = function () {
				console.log( "Editing the profile" );
				var config = {
					headers: {
						'Authorization': "nZVpNDd93-vbK5QRZuts"
					}
				};
				// $scope.member.password = "123451234";
				// $scope.member.password_confirmation = "123451234";
				console.log( $scope.profileData );
				console.log( "Password: " + $scope.profileData.password );
				console.log( "Information: " + $scope.profileData.information );
				$scope.email = $scope.profileData.email
				$http.put( 'https://bookieservice.herokuapp.com/api/members', {
						member: {
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
						address: {
							first_name: $scope.profileData.first_name,
							last_name: $scope.profileData.last_name,
							latitude: "12",
							longitude: "24",
							information: $scope.profileData.information
						}
					}, config )
					.success( function ( data ) {
						console.log( "Success" );
						console.log( JSON.stringify( data ) );
						console.log( data );
					} )
					.error( function ( data ) {
						console.log( "Error" );
						console.log( JSON.stringify( data ) );
					} );
			};

  } ] );
