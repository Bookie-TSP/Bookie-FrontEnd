describe('View All Books', function() {

    var books = [];
    var first = 0;
    var middle;
    var last;
    var request = require('request');
    var book = element.all(by.repeater('book in books'));
    var title = element(by.className('row book-name'));

    beforeEach(function() {
        browser.get('/#/');
    });

    request('https://bookieservice.herokuapp.com/api/books', function (error, response, body) {
        if (!error) {
            books = JSON.parse(body).books;
            middle = Math.round(books.length/2);
            last = books.length - 1;
        }
    });

    var urlChanged = function(url) {
        return function () {
            return browser.getCurrentUrl().then(function(actualUrl) {
                return url != actualUrl;
            });
        };
    };

    it('should match title tab', function() {
        expect(browser.getTitle()).toEqual('Home');
    }); 

    it('should match number of total books', function() {
        book.count().then(function (total) {
            expect(total).toEqual(books.length);
        });
    });   

    afterAll(function(done) {
        process.nextTick(done);
    });
});


