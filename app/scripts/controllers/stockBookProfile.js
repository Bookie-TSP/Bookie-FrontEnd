app.controller('stockBookProfileCtrl', ['$scope', '$http', '$anchorScroll', '$location', '$state', '$stateParams', '$uibModal', 'mapFactory', 'authFactory', '$rootScope',
    function ($scope, $http, $anchorScroll, $location, $state, $stateParams, $uibModal, $map, authFactory, $rootScope) {

        // Define bookInfo
        $scope.bookInfo = {};

        // Authenticate
        var config = {
            headers: {
                'Authorization': authFactory.getAuth()
            }
        };

        // Get Line Stock attribute()
        $scope.getLineStockQuantity = function(lineStockId) {
            $http.get('https://bookieservice.herokuapp.com/api/mystocks', config)
                .success(function (data) {
                    console.log(data.line_stocks);
                    var keepGoing = true;
                    angular.forEach(data.line_stocks, function(lineStock) {
                        if(lineStock.id == lineStockId && keepGoing) {
                            //Initialize current_lineStock_quantity
                            $scope.current_lineStock_quantity = lineStock.quantity;
                            $scope.lineStock_type = lineStock.type;
                            $scope.lineStock_price = lineStock.price;
                            keepGoing = false;
                        }
                    });
                })
                .error(function (data) {
                    console.log(data);
                });
        };

        // Get information of the book from the API
        $scope.getBookProfile = function(id) {
            // Initialise add_quantity and dec_quantity
            $scope.add_quantity = 0;
            $scope.dec_quantity = 0;
            $http.get('https://bookieservice.herokuapp.com/api/books/'+id)
                .success(function (data) {
                    console.log(data);
                    $scope.bookInfo = data;
                })
                .error(function (data) {
                    console.log(data);
                });
        };

        $scope.submitQuantity = function () {
            $http.post('https://bookieservice.herokuapp.com/api/members/line_stocks/quantity', {
                "line_stock" : {
                    "line_stock_id" : $stateParams.lineStockId,
                    "quantity" : $scope.new_quantity
                }
            },config)
                .success(function (data) {
                    console.log(data);
                    alert("Your current lineStock quantity is " + $scope.new_quantity);
                    $state.go('viewStock');
                })
                .error(function (data) {
                    console.log(data);
                    alert("error : " + data.errors);
                });
        };
        // Call getLineStockQuantity()
        $scope.getLineStockQuantity($stateParams.lineStockId);
        // Call getBookProfile()
        $scope.getBookProfile($stateParams.bookId);
    }
]);
