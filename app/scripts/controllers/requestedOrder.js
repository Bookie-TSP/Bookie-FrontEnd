app.controller('requestedOrderCtrl', ['$scope', '$http', '$state', 'authFactory',
	function ($scope, $http, $state, $auth) {
		if ($auth.getAuth() === undefined) {
			$state.go('login');
		}

		$scope.getOrderInfo = function() {
			$http.get('https://bookieservice.herokuapp.com/api/mysupplyorders', $auth.getConfigHead())
			.success(function (data) {
				$scope.orderInfo = data;
				console.log(data);
			})
			.error(function (data) {
				console.log(data);
			});
		};

		$scope.acceptOrder = function(acceptedOrder, acceptedStock) {
            $http.post('https://bookieservice.herokuapp.com/api/members/orders/accept',{
                order: {
                	order_id: acceptedOrder.id,
                	stock_id: acceptedStock.id
                }
            }, $auth.getConfigHead())
            .success(function(data){
                console.log(data);
                $scope.getOrderInfo();
            })
            .error(function(data){
                console.log(data);
            });
		};

		$scope.declineOrder = function(declinedOrder, declinedStock) {
            $http.post('https://bookieservice.herokuapp.com/api/members/orders/decline',{
                order: {
                	order_id: declinedOrder.id,
                	stock_id: declinedStock.id
                }
            }, $auth.getConfigHead())
            .success(function(data){
                console.log(data);
                $scope.getOrderInfo();
            })
            .error(function(data){
                console.log(data);
            });
		};

		$scope.deliverOrder = function(order, stock) {
            $http.post('https://bookieservice.herokuapp.com/api/members/orders/delivering',{
                order: {
                	order_id: order.id,
                	stock_id: stock.id
                }
            }, $auth.getConfigHead())
            .success(function(data){
                console.log(data);
                $scope.getOrderInfo();
            })
            .error(function(data){
                console.log(data);
            });
		};

		$scope.returned = function(returnedOrder, returnedStock) {
            $http.post('https://bookieservice.herokuapp.com/api/members/orders/returned',{
                order: {
                	order_id: returnedOrder.id,
                	stock_id: returnedStock.id
                }
            }, $auth.getConfigHead())
            .success(function(data){
                console.log(data);
                $scope.getOrderInfo();
            })
            .error(function(data){
                console.log(data);
            });
		};

        $scope.sortOrder = function(order) {
            var date = new Date(order.created_at.substring(0, 10) + " " + order.created_at.substring(11, 19));
            return date;
        };

		$scope.getOrderInfo();
	}
]);
