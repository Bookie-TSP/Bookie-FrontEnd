describe('View Individual Book', function() {
    
    var books = [];
    var titleHeader = element(by.id('title-header'));
    var request = require('request');
    var book = element.all(by.repeater('book in books'));
    var home = element(by.id('home'));

    beforeEach(function() {
        browser.get('/#/');
    });

    beforeAll(function() {
        request('https://bookieservice.herokuapp.com/api/books', function (error, response, body) {
            if (!error) {
                books = JSON.parse(body).books;
                console.log(books.length);
                console.log(books[0]);
            }
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

        it('click to view individual book', function(){
            var j = 1;
            for(var i=0 ; i<books.length ; i++, j++){
                book.get(i).click();
                expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/book/' + j);
                home.click();
            }
        });
    });


    afterAll(function(done) {
        process.nextTick(done);
    });
});


