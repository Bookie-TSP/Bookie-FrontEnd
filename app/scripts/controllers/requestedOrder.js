app.controller('requestedOrderCtrl', ['$scope', '$http', '$state', 'authFactory',
	function ($scope, $http, $state, authFactory) {
		if (authFactory.getAuth() === undefined) {
			$state.go('login');
		}

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
			})
			.error(function (data) {
				console.log(data);
			});
		}

		$scope.acceptOrder = function(acceptedOrder, acceptedStock) {
            var config = {
				headers: {
					'Authorization': authFactory.getAuth()
				}
			};
            $http.post('https://bookieservice.herokuapp.com/api/members/orders/accept',{
                order: {
                	order_id: acceptedOrder.id,
                	stock_id: acceptedStock.id
                }
            },config)
            .success(function(data){
                console.log(data);
            })
            .error(function(data){
                console.log(data);
            });
		}

		$scope.declineOrder = function(declinedOrder, declinedStock) {
            var config = {
				headers: {
					'Authorization': authFactory.getAuth()
				}
			};
            $http.post('https://bookieservice.herokuapp.com/api/members/orders/decline',{
                order: {
                	order_id: declinedOrder.id,
                	stock_id: declinedStock.id
                }
            },config)
            .success(function(data){
                console.log(data);
            })
            .error(function(data){
                console.log(data);
            });
		}

		$scope.returned = function(returnedOrder, returnedStock) {
            var config = {
				headers: {
					'Authorization': authFactory.getAuth()
				}
			};
            $http.post('https://bookieservice.herokuapp.com/api/members/orders/returned',{
                order: {
                	order_id: returnedOrder.id,
                	stock_id: returnedStock.id
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