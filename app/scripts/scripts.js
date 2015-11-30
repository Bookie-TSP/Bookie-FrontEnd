var app = angular.module('app', ['ui.router', 'ngStorage', 'ui.bootstrap', 'uiGmapgoogle-maps', 'ngFileUpload', 'cloudinary']);
app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html',
			data : { pageTitle: 'Home' }
		})
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			data : { pageTitle: 'Login' }
		})
		.state('register', {
			url: '/register',
			templateUrl: 'views/register.html',
			data : { pageTitle: 'Register' }
		})
		.state('viewProfile', {
			url: '/viewProfile',
			templateUrl: 'views/viewProfile.html',
			data : { pageTitle: 'View Profile' }
		})
		.state('editProfile', {
			url: '/editProfile',
			templateUrl: 'views/editProfile.html',
			data : { pageTitle: 'Edit Profile' }
		})
		.state('bookProfile', {
			url: '/book/:bookId',
			templateUrl: 'views/bookProfile.html',
			data : { pageTitle: 'Book Profile' }
		})
		.state('editAddress', {
			url: '/editAddress',
			templateUrl: 'views/editAddress.html',
			data : { pageTitle: 'Edit Address' }
		})
		.state('cart', {
			url: '/cart',
			templateUrl: 'views/cart.html',
			data : { pageTitle: 'My Cart' }
		})
		.state('viewStock', {
			url: '/viewStock',
			templateUrl: 'views/viewStock.html',
			data : { pageTitle: 'My Stock' }
		})
		.state('newStock',{
			url: '/newStock',
			templateUrl: 'views/newStock.html',
			data : { pageTitle: 'New Stock' }
		})
		.state('newStock.first', {
			url: '/1',
			templateUrl: 'views/searchStock.html',
			data : { pageTitle: 'Search Stock' }
		})
		.state('newStock.second', {
			url: '/2',
			templateUrl: 'views/photoStock.html',
			data : { pageTitle: 'Add Photo' }
		})
		.state('newStock.third', {
			url: '/3',
			templateUrl: 'views/infoStock.html',
			data : { pageTitle: 'Add Information' }
		})
		.state('newStock.fourth', {
			url: '/4',
			templateUrl: 'views/completeStock.html',
			data : { pageTitle: 'Confirm Stock' }
		});
	$urlRouterProvider.otherwise('/');

});
app.run([ '$rootScope', '$state', '$stateParams',
function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);

app.animation('.photo', function() {

  var animateUp = function(element, className, done) {
    if(className != 'active') {
      return;
    }
    element.css({
      position: 'absolute',
      top: 500,
      left: 0,
      display: 'block'
    });

    jQuery(element).animate({
      top: 0
    }, done);

    return function(cancel) {
      if(cancel) {
        element.stop();
      }
    };
  };

  var animateDown = function(element, className, done) {
    if(className != 'active') {
      return;
    }
    element.css({
      position: 'absolute',
      left: 0,
      top: 0
    });

    jQuery(element).animate({
      top: -500
    }, done);

    return function(cancel) {
      if(cancel) {
        element.stop();
      }
    };
  };

  return {
    addClass: animateUp,
    removeClass: animateDown
  };
});

app.controller('bookCatalogCtrl', ['$scope', '$http', '$state', 'authFactory',
function ($scope, $http, $state, authFactory) {
		//no need for auth factory
		// if (authFactory.getAuth() === undefined) {
		// 	$state.go("home");
		// }

		//getting books from api
		$http.get('https://bookieservice.herokuapp.com/api/books')
			.success(function (data) {
				$scope.books = data.books;
				console.log("success");
				console.log($scope.books);
			})
			.error(function (data) {
				console.log(data);
			});

}]);

app.controller('bookProfileCtrl', ['$scope', '$http', '$anchorScroll', '$location', '$state', '$stateParams', '$uibModal', 'mapFactory', 'authFactory', '$rootScope',
    function ($scope, $http, $anchorScroll, $location, $state, $stateParams, $uibModal, $map, authFactory, $rootScope) {
        $scope.loggedIn = false;

        console.log("Start");
        // Check whether the Member has logged in or not
        if (authFactory.getAuth() !== undefined) {
            $scope.loggedIn = true;
        }

        // Tab array of stocks
        $scope.buyNewBook = [];
        $scope.buyUsedBook = [];
        $scope.rentBook = [];

        // Max showing page for Pagers
        $scope.maxSize = 4;

        // Number of items in each page of the tab
        $scope.itemPerPage = 4;

        // Initialize pager variables for total items in each tab
        $scope.buyNewBookTotalItems = 0;
        $scope.buyUsedBookTotalItems = 0;
        $scope.rentBookTotalItems = 0;

        // Initialize pager variables for the current page of each tab
        $scope.buyNewBookCurrentPage = 1;
        $scope.buyUsedBookCurrentPage = 1;
        $scope.rentBookCurrentPage = 1;

        // Initialize temporary variable for adding line stock from the modal to the cart
        $scope.tempLineStock = {};

        // Initialize Google Map from the mapFactory.js
        // googleMap.initialize();

        // Define bookInfo
        $scope.bookInfo = {};

        // Get information of the book from the API
        $scope.getBookProfile = function(id) {
            $http.get('https://bookieservice.herokuapp.com/api/books/'+id)
            .success(function (data) {
                console.log(data);
                $scope.bookInfo = data;
                $scope.seperate();
                $scope.setPagerTotalItems();
            })
            .error(function (data) {
                console.log(data);
            });
        };

        // Seperate books into categories
        $scope.seperate = function() {
            for (var i = 0; i < $scope.bookInfo.line_stocks.length; i++) {
                if ($scope.bookInfo.line_stocks[i].type === 'sell') {
                    if ($scope.bookInfo.line_stocks[i].condition === 'new') {
                        $scope.buyNewBook.push($scope.bookInfo.line_stocks[i]);
                    }
                    else if ($scope.bookInfo.line_stocks[i].condition === 'used') {
                        $scope.buyUsedBook.push($scope.bookInfo.line_stocks[i]);
                    }
                }
                else if ($scope.bookInfo.line_stocks[i].type === 'lend') {
                    $scope.rentBook.push($scope.bookInfo.line_stocks[i]);
                }
            }
            console.log($scope.buyNewBook);
            console.log($scope.rentBook);
        };

        // Set the amount of total items used for showing items in pages of each of the tabs
        $scope.setPagerTotalItems = function() {
            $scope.buyNewBookTotalItems = $scope.buyNewBook.length * (10 / $scope.itemPerPage);
            $scope.buyUsedBookTotalItems = $scope.buyUsedBook.length * (10 / $scope.itemPerPage);
            $scope.rentBookTotalItems = $scope.rentBook.length * (10 / $scope.itemPerPage);
        };

        // Call getBookProfile()
        $scope.getBookProfile($stateParams.bookId);

        // Use for adding the book to the cart with its details
        $scope.addToCart = function(line_stock) {
            console.log(line_stock);
            var config = {
                headers: {
                    'Authorization': authFactory.getAuth()
                }
            };
            $http.post('https://bookieservice.herokuapp.com/api/members/cart/add', {
                line_stock: {
                    line_stock_id: line_stock.id
                }
            }, config)
            .success(function(data){
                console.log(JSON.stringify(data));
                console.log(data);
                $scope.auth = data.auth_token;
                $rootScope.$broadcast('cart');
                $scope.errorMessage = 'no error';
            })
            .error(function(data){
                console.log(JSON.stringify(data));
                $scope.errorMessage = JSON.stringify(data.errors);
                console.log($scope.errorMessage);
            });
            console.log("The book that costs $" + line_stock.price + " has been added to the cart.");
        };

        //
        $scope.setTempLineStock = function(line_stock){
            $scope.tempLineStock = line_stock;
        };

        // Use for scrolling the page to bottom
        $scope.moveToBottom = function() {
            $location.hash('bottom');
            $anchorScroll();
        };
    }
]);

app.controller('cartCtrl',['$scope','$http', '$state', 'authFactory', '$rootScope',
    function ($scope, $http, $state, authFactory, $rootScope){
        var config = {
            headers: {
                'Authorization': authFactory.getAuth()
            }
        };
        $scope.getTotal = function() {
            $scope.total = 0;
            for(var i = 0, len = $scope.stocks.length; i < len; i++) {
                $scope.total += $scope.stocks[i].price;
            }
        };

        $scope.countStocks = function() {
            $scope.buyLength = 0;
            for(var i = 0; i < $scope.stocks.length; i++){
                if($scope.stocks[i].type === 'sell'){
                    $scope.buyLength++;
                }
            }

            $scope.rentLength = 0;
            for(var j = 0; j < $scope.stocks.length; j++){
                if($scope.stocks[j].type === 'lend'){
                    $scope.rentLength++;
                }
            }
        };

		$scope.getCart = function() {
            $http.get('https://bookieservice.herokuapp.com/api/members/cart/show',config)
            .success(function (data) {
                console.log(data);
                $scope.cart = data;
                $scope.stocks = $scope.cart.stocks;
                $scope.getTotal();
                $scope.countStocks();
                console.log($scope.total);
            })
            .error(function (data) {
                console.log(data);
            });
        };
        $scope.removeStock = function(id) {
            console.log(id);
            $http.post('https://bookieservice.herokuapp.com/api/members/cart/remove',{
                stock: {
                    stock_id: id
                }
            },config)
            .success(function(data){
                $rootScope.$broadcast('cart');
                $scope.cart = data;
                $scope.stocks = $scope.cart.stocks;
                $scope.getTotal();
                $scope.countStocks();
            })
            .error(function(data){
                console.log(data);
            });
        };

        //initialize
        $scope.getCart();
}]);

app.controller('completeStockCtrl', ['$scope', '$http', '$state', '$rootScope', 'authFactory',
    function ($scope, $http, $state, $rootScope, authFactory) {
        $scope.confirmStock = function(){
            var config = {
    			headers: {
    				'Authorization': authFactory.getAuth()
    			}
    		};
            $http.post('https://bookieservice.herokuapp.com/api/members/stocks',{
                stock: $rootScope.newStock
            }, config)
            .success(function(data){
                console.log(data);
                $state.go("home");
            })
            .error(function(data){
                console.log(data);
            });
        };
}]);

app.controller('addressCtrl',['$scope','$http', '$state', 'authFactory', '$rootScope', 'mapFactory',
    function($scope, $http, $state, authFactory, $rootScope, $map){
        if (authFactory.getAuth() === undefined) {
			$state.go('login');
		}

        $scope.info = '';
        $scope.initial = function(){
            $scope.address = authFactory.getMember().addresses[0];
            $scope.map = $map.map;
            $scope.marker = $map.marker;
            $scope.map.center = {
    			latitude: $scope.address.latitude,
    			longitude: $scope.address.longitude
    		};
            $scope.marker.coords = {
                latitude: $scope.address.latitude,
    			longitude: $scope.address.longitude
            };
            $scope.options = $map.options;
        };

        $scope.editAddress = function() {
            $scope.address.information = $scope.info + $scope.address.information;
            var config = {
				headers: {
					'Authorization': authFactory.getAuth()
				}
			};
            $http.post('https://bookieservice.herokuapp.com/api/members/edit_address',{
                address: $scope.address
            },config)
            .success(function(data){
                console.log(data);
                authFactory.setMember(data);
                $state.go('viewProfile');
            })
            .error(function(data){
                $scope.error = true;
                console.log(data);
            });

        };

        $scope.$on('marker', function () {
			console.log('marker');
            $scope.address.latitude = $map.getLat().toFixed(5);
            $scope.address.longitude = $map.getLng().toFixed(5);
            $scope.address.information = $map.getAddress();
            $scope.$digest();
		});

        $scope.initial();

}]);

app.controller('editProfileCtrl', ['$scope', '$http', 'authFactory', '$q', '$state', 'dateFactory',
	function ($scope, $http, authFactory, $q, $state, $date) {
		if (authFactory.getAuth() === undefined) {
			$state.go('login');
		}

		var config = {
			headers: {
				'Authorization': authFactory.getAuth()
			}
		};

		$scope.initDate = function() {
			$scope.initDates = $date.days;
            $scope.initMonths = $date.months;
            $scope.initYears = $date.years;
        };

		$scope.setDate = function () {
			if($scope.profileData.birth_date !== null){
				birth = $scope.profileData.birth_date.split('-');
				$scope.date = birth[2];
				$scope.month = $scope.initMonths[birth[1]-1];
				$scope.year = birth[0];
			}
		};

		$scope.getProfile = function () {
			console.log('Getting the profile');
			var birth = '';
			$q.all([
					$http.get('https://bookieservice.herokuapp.com/api/myprofile', config)
					.success(function (data) {
						$scope.profileData = data;
						authFactory.setMember(data);
						$scope.profileData = authFactory.getMember();
						console.log(data);
					})
					.error(function (data) {
						console.log(data);
					})
			])
			.then(function () {
				$scope.setDate();
				$state.go('viewProfile');
			});
		};

		$scope.editProfile = function () {
			console.log('Editing the profile');
			$scope.errorRequired = false;
			$scope.errorEmail = false;
			$scope.errorPass = false;
			var birth_date = $scope.date + '/' + ($scope.initMonths.indexOf($scope.month)+1) + '/' + $scope.year;
			$http.put('https://bookieservice.herokuapp.com/api/members', {
					member: {
						email: $scope.profileData.email,
						password: $scope.profileData.password,
						password_confirmation: $scope.profileData.password,
						first_name: $scope.profileData.first_name,
						last_name: $scope.profileData.last_name,
						phone_number: $scope.profileData.phone_number,
						identification_number: $scope.profileData.identification_number,
						gender: $scope.profileData.gender,
						birth_date: birth_date
					}
				}, config)
				.success(function (data) {
					$scope.getProfile();
					console.log(data);
					$scope.profileData.password = '';
				})
				.error(function (data) {
					if( data.errors.email !== undefined){
						$scope.errorEmail = true;
					}
					if( data.errors === 'Wrong password'){
						$scope.errorPass = true;
					}
					if( data.errors.password === 'parameter is required'){
						$scope.errorRequired = true;
					}
					console.log(data);
				});
		};

		$scope.initial = function () {
			$scope.initDate();
			var profile = authFactory.getMember();
			var text = JSON.stringify(profile);
			$scope.profileData = JSON.parse(text);
			$scope.setDate();
		};

		$scope.initial();
	}
]);

app.controller('homeCtrl',['$scope','$http', '$state', '$rootScope',
    function($scope, $http, $state, $rootScope){
    	$scope.bookProfile = function() {
    		$state.go("bookProfile");
    	}
}]);

app.controller('infoStockCtrl', ['$scope', '$http', '$state', '$rootScope',
    function ($scope, $http, $state, $rootScope) {
			//console.log($rootScope.newBook);

		$scope.type = '';

		$scope.nextStep = function () {
			$rootScope.newStock = {
				book_id: $rootScope.newBook.id,
				status: 'stock',
				price: $scope.price,
				type: $scope.type,
				condition: $scope.condition,
				description: $scope.description,
				quantity: $scope.quantity
			};
			if ($scope.type === 'lend') {
				$rootScope.newStock.terms = $scope.terms;
				$rootScope.newStock.duration = $scope.duration;
			}
			console.log($rootScope.newStock);
            $rootScope.steps[2] = null;
            $rootScope.steps[3] = true;
			$state.go('newStock.fourth');
		};
}]);

app.controller('loginCtrl', ['$scope', '$http', '$state', 'authFactory',
	function ($scope, $http, $state, authFactory) {
		if (authFactory.getAuth() !== undefined) {
			$state.go('home');
		}
		$scope.validation = '';
		setValidation = function (s) {
			$scope.validation = s;
		};

		$scope.login = function () {
			$http.post('https://bookieservice.herokuapp.com/api/sessions', {
					email: $scope.email,
					password: $scope.password
				})
				.success(function (data) {
					$scope.auth = data.auth_token;
					authFactory.setAuth($scope.auth);
					$state.go('home');
				})
				.error(function (data) {
					console.log(data);
					setValidation('Invalid email or password');
				});
		};
	}
]);

app.controller('navCtrl', ['$scope', '$http', '$state', 'authFactory', '$rootScope',
  function ($scope, $http, $state, authFactory, $rootScope) {
		$scope.totalPrice = 0;
		$scope.totalCount = 0;
		$scope.logout = function () {
			authFactory.setAuth(undefined);
		};
		$scope.getMember = function () {
			if (authFactory.getAuth() !== undefined) {
				var config = {
					headers: {
						'Authorization': authFactory.getAuth()
					}
				};
				$http.get('https://bookieservice.herokuapp.com/api/myprofile', config)
					.success(function (data) {
						$rootScope.member = data;
						authFactory.setMember(data);
					})
					.error(function (data) {
						authFactory.setAuth(undefined);
						console.log(data);
					});
			} else {
				$rootScope.member = undefined;
			}
		};

		$scope.getCart = function () {
			if (authFactory.getAuth() !== undefined) {
				var config = {
					headers: {
						'Authorization': authFactory.getAuth()
					}
				};
				$http.get('https://bookieservice.herokuapp.com/api/members/cart/show', config)
					.success(function (data) {
						$scope.totalPrice = 0;
						$scope.totalCount = 0;
						$scope.stocks = data.stocks;
						for (var i = 0; i < $scope.stocks.length; i++) {
							$scope.totalPrice += $scope.stocks[i].price;
							$scope.totalCount++;
						}
					})
					.error(function (data) {
						authFactory.setAuth(undefined);
						console.log(data);
					});
			} else {
				$scope.totalPrice = 0;
				$scope.totalCount = 0;
			}
		};

		$rootScope.member = $scope.getMember();
		$scope.getCart();
		$scope.$on('authenticate', function () {
			console.log('Change');
			$rootScope.member = $scope.getMember();
		});

		$scope.$on('cart', function () {
			$scope.getCart();
		});
}]);

app.controller('newStockCtrl', ['$scope', '$http', '$state', 'authFactory', '$rootScope',
	function ($scope, $http, $state, authFactory, $rootScope) {
		if (authFactory.getAuth() === undefined) {
			$state.go('login');
		}
		else{
			// go to first step
			$state.go("newStock.first");
		}

		// New book and stock
		$rootScope.newBook = {};
		$rootScope.newStock = {};

		// steps
		$rootScope.steps = [true, false, false, false];

		$rootScope.changeStep = function (step) {
			$scope.stepsName = ['first', 'second', 'third', 'fourth'];
			if ($rootScope.steps[step - 1] !== false) {
				for (var i = 0; i < 4; i++) {
					if (i === step - 1) {
						$rootScope.steps[i] = true;
					} else {
						if ($rootScope.steps[i] === true || $rootScope.steps[i] === null) {
							$rootScope.steps[i] = null;
						} else {
							$rootScope.steps[i] = false;
						}
					}
				}
				$state.go('newStock.' + $scope.stepsName[step - 1]);
			}
			console.log($rootScope.steps);
		};

}]);

app.controller('photoStockCtrl', ['$scope', '$rootScope', '$stateParams', '$location', 'Upload', 'authFactory', '$http', '$state',
  /* Uploading with Angular File Upload */
  function ($scope, $rootScope, $stateParams, $location, $upload, authFactory, $http, $state) {
		$.cloudinary.config()
			.cloud_name = 'tbookie';
		$.cloudinary.config()
			.upload_preset = 'jukcxy4z';

		var d = new Date();
		$scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";

        $scope.selectFiles = function(files){
            $scope.files = files;
        };

		$scope.uploadFiles = function () {
			angular.forEach($scope.files, function (file) {
				if (file && !file.$error) {
					file.upload = $upload.upload({
							url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config()
								.cloud_name + "/upload",
							fields: {
								upload_preset: $.cloudinary.config()
									.upload_preset,
								tags: 'myphotoalbum',
								context: 'photo=' + $scope.title
							},
							file: file
						})
						.progress(function (e) {
							file.progress = Math.round((e.loaded * 100.0) / e.total);
							file.status = "Uploading... " + file.progress + "%";
						})
						.success(function (data, status, headers, config) {
							data.context = {
								custom: {
									photo: $scope.title
								}
							};
							file.result = data;
                            $rootScope.newBook.cover_image_url = file.result.url;
						})
						.error(function (data, status, headers, config) {
							file.result = data;
						});
				}
			});
		};
		//});

		/* Modify the look and fill of the dropzone when files are being dragged over it */
		$scope.dragOverClass = function ($event) {
			var items = $event.dataTransfer.items;
			var hasFile = false;
			if (items !== null) {
				for (var i = 0; i < items.length; i++) {
					if (items[i].kind == 'file') {
						hasFile = true;
						break;
					}
				}
			} else {
				hasFile = true;
			}
			return hasFile ? "dragover" : "dragover-err";
		};

        $scope.addBook = function(){
            var config = {
    			headers: {
    				'Authorization': authFactory.getAuth()
    			}
    		};

            $http.post('https://bookieservice.herokuapp.com/api/books',{
                book: $rootScope.newBook
            }, config)
            .success(function(data){
                $rootScope.newBook = data;
                console.log(data);
                    $rootScope.steps[2] = true;
                    $rootScope.steps[1] = null;
    				$state.go('newStock.third');
            })
            .error(function(data){
                console.log(data);
            });
        };

        $scope.backToFirst = function(){
            $scope.files = [];
            $rootScope.changeStep(1);
            $state.go('newStock.first');
        };
  }]);

app.controller('registerCtrl', ['$scope', '$http', 'mapFactory', '$state', 'authFactory', 'dateFactory',
        function ($scope, $http, $map, $state, authFactory, $date) {
		if (authFactory.getAuth() !== undefined) {
			$state.go("home");
		}
        $scope.latitude = "";
        $scope.longitude = "";
        $scope.address = "";
        
        $scope.initDate = function() {
            $scope.initDates = $date.days;
            $scope.initMonths = $date.months;
            $scope.initYears = $date.years;
		};

		$scope.submit = function () {
			var birth_date = $scope.day_birth + "/" + ($scope.initMonths.indexOf($scope.month_birth)+1) + "/" + $scope.year_birth;
            var address_info = $scope.address;
            if( $scope.more_info !== undefined){
                address_info = $scope.more_info + " " + address_info;
            }

			if (!$scope.agreeTerm) {
				alert("Please agree the term of condition");
			} else {
				var member = {
					email: $scope.email,
					password: $scope.password,
					password_confirmation: $scope.password_confirmation,
					first_name: $scope.first_name,
					last_name: $scope.last_name,
					phone_number: $scope.phone_number,
					identification_number: $scope.identification_number,
					gender: $scope.gender,
					birth_date: birth_date
				};
				var address = {
					first_name: $scope.first_name,
					last_name: $scope.last_name,
					latitude: $scope.latitude,
					longitude: $scope.longitude,
					information: address_info
				};

				//send member&address
				$http.post('https://bookieservice.herokuapp.com/api/members', {
						member: member,
						address: address
					})
					.success(function (data) {
						console.log(data);
						$state.go("login");
					})
					.error(function (data) {
						console.log(data);
						alert("error : " + data.errors);
					});
			}
		};

        $scope.initial = function() {
            $scope.initDate();
            $scope.map = $map.map;
            $scope.marker = $map.marker;
            $scope.options = $map.options;
        };
        $scope.$on('marker', function () {
			console.log("marker");
            $scope.latitude = $map.getLat().toFixed(5);
            $scope.longitude = $map.getLng().toFixed(5);
            $scope.address = $map.getAddress();
            $scope.$digest();
		});
        $scope.initial();
}]);

app.controller('searchStockCtrl', ['$scope', '$http', '$state', '$rootScope', 'dateFactory', '$timeout', 'authFactory',
    function ($scope, $http, $state, $rootScope, $date, $timeout, authFactory) {
		// amount of books from api
		$scope.totalBooks = -1;
		$scope.hadSearch = false;
		$scope.wantAdd = false;

		// language selections
		$scope.langs = ['English', 'Thai', 'Japanese', 'Chinese'];

		// date
		$scope.initDates = $date.days;
		$scope.initMonths = $date.months;
		$scope.initYears = $date.years;

		// search books
		$scope.resultsGG = [];
        $scope.resultsDB = [];

		// specific book chosen
		$scope.specBook = {};

		var maxResults = 10;
		var startIndex = 0;
		var apiKey = "AIzaSyAY-BLl9HgepqEFBxR5YJbC_qdE4PZF_6g";

		$scope.hasNext = function () {
			return (startIndex + maxResults <= $scope.totalBooks);
		};

		$scope.hasPrevious = function () {
			return startIndex !== 0;
		};

		$scope.manualAdd = function () {
			$scope.wantAdd = true;
		};

		$scope.cancelManual = function () {
			$scope.wantAdd = false;
		};

		$scope.getBooksDB = function () {
            $http.post('https://bookieservice.herokuapp.com/api/books/search',{
                search: $scope.searchField
            })
            .success(function(data){
                console.log(data);
                $scope.resultsDB = data.books;
            })
            .error(function(data){
                console.log(data);
            });
		};

		$scope.getBooksGoogle = function (searchKey, operation, startIndex, maxResults, apiKey) {
			$http.get("https://www.googleapis.com/books/v1/volumes?q=" + operation + ":" + searchKey +
					"&maxResults=" + maxResults + "&startIndex=" + startIndex +
					"&key=" + apiKey)
				.success(function (data) {
					console.log("https://www.googleapis.com/books/v1/volumes?q=" + operation + ":" + searchKey +
						"&maxResults=" + maxResults + "&startIndex=" + startIndex +
						"&key=" + apiKey);
					//data is the matched items that returned from Google books API
					console.log(data);
					$scope.resultsGG = data.items;
					$scope.totalBooks = data.totalItems;
					if ($scope.totalBooks !== 0) {
						$scope.hadSearch = true;
						$scope.wantAdd = false;
					}
				})
				.error(function (data) {
					console.log(data);
				});
		};

		$scope.search = function () {
			startIndex = 0;
            $scope.getBooksDB();
			$scope.getBooksGoogle($scope.searchField, $scope.searchCat, startIndex, maxResults, apiKey);
		};

		$scope.nextPage = function () {
			startIndex += maxResults;
			$scope.getBooksGoogle($scope.searchField, $scope.searchCat, startIndex, maxResults, apiKey);
		};

		$scope.previousPage = function () {
			startIndex -= maxResults;
			$scope.getBooksGoogle($scope.searchField, $scope.searchCat, startIndex, maxResults, apiKey);
		};

		$scope.chooseBook = function (book, type) {
			$scope.type = type;
			if (type === 'google') {
				$scope.specBook = {
					title: book.title,
					authors: book.authors,
					language: book.language,
					publisher: book.publisher,
					publish_date: book.publishedDate,
					pages: book.pageCount,
					description: book.description,
					cover_image_url: book.imageLinks.smallThumbnail
				};
				if (book.industryIdentifiers !== undefined) {
					$scope.specBook.ISBN13 = book.industryIdentifiers[0].identifier;
					$scope.specBook.ISBN10 = book.industryIdentifiers[1].identifier;
				}
			} else if (type === 'manual') {
				if ($scope.day !== undefined || $scope.initMonths.indexOf($scope.month) + 1 > 0 ||
					$scope.year !== undefined) {
					$scope.final_date = $scope.day + "/" + ($scope.initMonths.indexOf($scope.month) + 1) +
						"/" + $scope.year;
				} else {
					$scope.final_date = null;
				}
				$scope.specBook = {
					title: $scope.title,
					ISBN13: $scope.ISBN13 || null,
					ISBN10: $scope.ISBN10 || null,
					authors: [$scope.author],
					language: $scope.language,
					publisher: $scope.publisher || null,
					publish_date: $scope.final_date,
					pages: $scope.pageCount || null,
					description: $scope.description,
					cover_image_url: undefined
				};
			} else if (type === 'db'){
                $scope.specBook = book;
            }
			console.log($scope.specBook);
		};

		$scope.addBook = function () {
			var config = {
				headers: {
					'Authorization': authFactory.getAuth()
				}
			};

			$http.post('https://bookieservice.herokuapp.com/api/books', {
					book: $scope.specBook
				}, config)
				.success(function (data) {
					$rootScope.newBook = data;
					console.log(data);
					$timeout(function () {
						$rootScope.steps[2] = true;
						$rootScope.steps[0] = null;
						$state.go('newStock.third');
					}, 500);
				})
				.error(function (data) {
					console.log(data);
				});
		};

		$scope.goToPhoto = function () {
			$timeout(function () {
				$rootScope.newBook = $scope.specBook;
				$rootScope.steps[1] = true;
				$rootScope.steps[0] = null;
				$state.go('newStock.second');
			}, 500);
		};

        $scope.addCurrent = function(){
            $rootScope.newBook = $scope.specBook;
            $timeout(function () {
                $rootScope.steps[2] = true;
                $rootScope.steps[0] = null;
                $state.go('newStock.third');
            }, 500);
        };
}]);

app.controller('profileCtrl', ['$scope', '$http', '$state', 'authFactory',
	function ($scope, $http, $state, authFactory) {
		if (authFactory.getAuth() === undefined) {
			$state.go("login");
		}
		$scope.profileData = authFactory.getMember();
}]);

app.controller('stockCtrl', ['$scope', '$http', '$state', 'authFactory',
	function ($scope, $http, $state, authFactory) {
		if (authFactory.getAuth() === undefined) {
			$state.go("login");
		}

        $scope.getStock = function(){
            var config = {
                headers: {
                    'Authorization': authFactory.getAuth()
                }
            };
            $http.get('https://bookieservice.herokuapp.com/api/mystocks',config)
            .success(function(data){
				$scope.data = data;
                $scope.stocks = data.stocks;
				console.log($scope.stocks);
            })
            .error(function(data){

            });
        };

		$scope.getStock();
}]);

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
		}
	};
});

app.factory('dateFactory', function () {
    var initDates = new Array(31);
    for( var i = 1; i <=31 ; i++ ){
        initDates[i-1] = i;
    }

     var initMonths = ['January', 'February', 'March', 'April', 'May',
                        'June', 'July', 'August', 'September', 'October',
                        'November', 'December'];

    var d = new Date();
    var n = d.getFullYear();
    var initYears = new Array(100);
    for( i = 0; i < 100; i++ ){
        initYears[i] = n-i;
    }

	return {
		days: initDates,
        months: initMonths,
        years: initYears
	};
});

app.factory('mapFactory', function ($log, $rootScope) {
	var latitude = 13.725;
	var longitude = 100.493;
	var address = "";

	function geocodeLatLng(latitude, longitude) {
		var latlng = {
			lat: latitude,
			lng: longitude
		};
		var geocoder = new google.maps.Geocoder;
		geocoder.geocode({
			'location': latlng
		}, function (results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					address = results[0].formatted_address;
					$rootScope.$broadcast('marker');
				}
			} else {
				window.alert('Geocoder failed due to: ' + status);
			}
		});
	}

	var map = {
		center: {
			latitude: 13.725,
			longitude: 100.493
		},
		zoom: 8
	};
	var options = {
		scrollwheel: false
	};

	var marker = {
		id: 0,
		coords: {
			latitude: 13.725,
			longitude: 100.493
		},
		options: {
			draggable: true
		},
		events: {
			dragend: function (marker, eventName, args) {
				$log.log('marker dragend');
				var lat = marker.getPosition()
					.lat();
				var lon = marker.getPosition()
					.lng();
				setPosition(lat, lon);
				geocodeLatLng(lat, lon);
			}
		}
	};

	var setPosition = function (lat, long) {
		latitude = lat;
		longitude = long;
	};

	var getLat = function () {   
		return latitude;
	};

	var getLng = function () {
		return longitude;
	};

	var getAddress = function () {
		return address;
	};

	return {
		map: map,
		marker: marker,
		options: options,
		getLat: getLat,
		getLng: getLng,
		getAddress: getAddress,
		setPosition: setPosition
	};
});
