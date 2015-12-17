app.controller('photoStockCtrl', ['$scope', '$rootScope', '$stateParams', '$location', 'Upload', 'authFactory', '$http', '$state',
  /* Uploading with Angular File Upload */
  function ($scope, $rootScope, $stateParams, $location, $upload, authFactory, $http, $state) {
      $rootScope.changeStep(2);

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
