app.factory('configFactory', function ($rootScope, $localStorage) {
	return {
		getConfigHead: function () {
			return {
                headers: {
                    'Authorization': authFactory.getAuth()
                }
            };
		}
	};
});
