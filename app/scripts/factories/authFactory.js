app.factory('authFactory', function ($http, $rootScope, $localStorage) {
	return {
		getAuth: function () {
			return $localStorage.authToken;
		},
		setAuth: function (token) {
			$localStorage.authToken = token;
			$rootScope.$broadcast('authenticate');
			$rootScope.$broadcast('cart');
		},
		setMember: function (member) {
			$localStorage.member = member;
		},
		getMember: function () {
			return $localStorage.member;
		},
		getConfigHead: function(){
			return {
				headers: {
					'Authorization': $localStorage.authToken
				}
			};
		}
	};
});
