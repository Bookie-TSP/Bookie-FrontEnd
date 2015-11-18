describe('View Individual Book', function() {
    
    var books = [];
    var titleHeader = element(by.id('title-header'));


    beforeEach(function() {
        browser.get('/#/');
    });

    beforeAll(function() {
        $http.get('https://bookieservice.herokuapp.com/api/books')
            .success(function(data) {
                books = data.books;
            })
            .error(function(data) {
                console.log(data);
            });
    });

    var urlChanged = function(url) {
        return function () {
            return browser.getCurrentUrl().then(function(actualUrl) {
                return url != actualUrl;
            });
        };
    };

    describe('case',function() {
        it('should match title', function() {
            expect(browser.getTitle()).toEqual('Home');
        });

        it('info', function() {
            expect(titleHeader).toEqual(books[0].title);
        });

    });

    function httpGet(https://bookieservice.herokuapp.com/api/books) {
        var http = require('http');
        var defer = protractor.promise.defer();

        http.get("https://bookieservice.herokuapp.com/api/books", function(data) {

            var bodyString = '';

            data.setEncoding('utf8');

            data.on("data", function(chunk) {
                bodyString += chunk;
            });

            data.on('end', function() {
                defer.fulfill({
                    statusCode: data.statusCode,
                    bodyString: bodyString
                });
            });

        }).on('error', function(e) {
                defer.reject("Got http.get error: " + e.message);
        });

        return defer.promise;
    };


    afterAll(function(done) {
        process.nextTick(done);
    });
});


