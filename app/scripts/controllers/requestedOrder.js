app.controller('requestedOrderCtrl', ['$scope', '$http', '$state', 'authFactory',
	function ($scope, $http, $state, authFactory) {
		if (authFactory.getAuth() === undefined) {
			$state.go('login');
		}

		$scope.dataReady = false;

		$scope.getOrderInfo = function() {
			var config = {
				headers: {
					'Authorization': authFactory.getAuth()
				}
			};
			$http.get('https://bookieservice.herokuapp.com/api/mysupplyorders', config)
				.success(function (data) {
					$scope.orderInfo = data;
					console.log(data);
					$scope.dataReady = true;
				})
				.error(function (data) {
					console.log(data);
				});
		}

		$scope.acceptOrder = function() {
            var config = {
				headers: {
					'Authorization': authFactory.getAuth()
				}
			};
            $http.post('https://bookieservice.herokuapp.com/api/members/orders/accept',{
                order: {
                	order_id: 4,
                	stock_id: 3
                }
            },config)
            .success(function(data){
                console.log(data);
            })
            .error(function(data){
                console.log(data);
            });
		}

		$scope.declineOrder = function() {
            var config = {
				headers: {
					'Authorization': authFactory.getAuth()
				}
			};
            $http.post('https://bookieservice.herokuapp.com/api/members/orders/decline',{
                order: {
                	order_id: 4,
                	stock_id: 3
                }
            },config)
            .success(function(data){
                console.log(data);
            })
            .error(function(data){
                console.log(data);
            });
		}
		
		$scope.getOrderInfo();
	}
]);