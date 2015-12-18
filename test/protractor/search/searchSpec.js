describe('Search books', function() {
    var request = require('request');
    var input = element(by.model('searchText'));

    beforeEach(function() {
        browser.get('/#');
    });

    beforeAll(function() {
        postRequest('https://bookieservice.herokuapp.com/api/books/');
    });

    function postRequest(link, vari){
        request(link, function (error, response, body) {
            if (!error) {
                books = JSON.parse(body).books;
                // console.log(books);
            }
        });
    };

    it('search textfield should be visible.', function() {
        expect(input.isPresent()).toBe(true)
    });

    it('search text field should be useable.', function() {
        input.sendKeys('harry');
        expect(input.getAttribute('value')).toEqual('harry');
    });

    it('should be searched by any category as a default.', function() {
        
    });

    afterAll(function(done) {
        process.nextTick(done);
    });
});