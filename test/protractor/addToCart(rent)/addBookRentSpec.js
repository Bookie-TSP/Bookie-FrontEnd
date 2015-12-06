describe('Add book to cart (buying)', function() {
    var cartHeader = element(by.id('item-cart'));
    var request = require('request');
    var bookTitle = element(by.id('title-header'));
    var selectedBook;
    var bookPrice;
    var books;
    var bookStocks;
    var carts;

    beforeEach(function() {
        browser.get('/#');
        getRequest('https://bookieservice.herokuapp.com/api/books/', 'indiBook');
        getRequest('https://bookieservice.herokuapp.com/api/books/6', 'selectBook');
        // getRequest('https://bookieservice.herokuapp.com/api/members/cart/show', 'cart')
    });

    function getRequest(link, vari){
        browser.waitForAngular();
        request(link, function (error, response, body) {
            if (!error && vari=='indiBook') {
                books = JSON.parse(body).books;
                // console.log(books);
            }
            else if(!error && vari=='selectBook') {
                bookStocks = JSON.parse(body).line_stocks;
                console.log(bookStocks);
            }
            else if(!error && vari=='cart') {
                carts = JSON.parse(body);
                console.log(carts);
            }
        });
    };

    function login(){
        element(by.id('loginNav')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/login', 5000);
        var email = element(by.model('email'));
        var password = element(by.model('password'));
        var submit = element(by.id('submitB'));
        email.sendKeys('tester@ku.th');
        password.sendKeys('11111111');
        submit.click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/');
    };

    describe('if login', function() {
        it('should be able to add RENTABLE book to cart', function() {
            login();
            // select book
            element.all(by.repeater('book in books')).get(5).click();
            selectedBook =  element(by.linkText('Rent Books')).click();
            // pick the first order
            element.all(by.repeater('line_stock in rentBook')).then(function(buyUsedBook) {
                selectedBook = buyUsedBook[0];
                selectedBook.element(by.className('ng-scope')).click();
            });

            $('.modal-dialog').element(by.buttonText('Add To Cart')).click();
            browser.pause();
        });
    });
    
    describe('if not login', function() {
        it('should be prevented to add book to cart', function(){
            element(by.css('[ng-click="logout()"]')).click();
            element.all(by.repeater('book in books')).get(0).click();

            var stocks =  element(by.linkText('Buy Used Books'));
            expect(stocks.isPresent()).toBeFalsy();
        });
    });

    afterAll(function(done) {
        process.nextTick(done);
    });
});