describe('Add book to cart (buying)', function() {
    var cartButton = element(by.id('item-cart'));
    var request = require('request');
    var bookTitle = element(by.id('title-header'));
    var selectedBook;
    var bookPrice;
    var books;
    var bookStocks;
    var carts;

    beforeEach(function() {
        browser.get('/#');
        // getRequest('https://bookieservice.herokuapp.com/api/books/', 'indiBook');
        // getRequest('https://bookieservice.herokuapp.com/api/books/6', 'selectBook');
        // getRequest('https://bookieservice.herokuapp.com/api/members/cart/show', 'cart')
    });

    // function getRequest(link, vari){
    //     browser.waitForAngular();
    //     request(link, function (error, response, body) {
    //         if (!error && vari=='indiBook') {
    //             books = JSON.parse(body).books;
    //             // console.log(books);
    //         }
    //     });
    // };

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
        it ('cart button should be visible', function(){
            expect(cardButton.isPresent()).toBeTrue();
        });

        it('should be able to press cart button on nav bar', function() {
            login(); 
            cartButton.click();
            expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/cart', 5000);

            // browser.pause();
        });
    });
    
    // describe('if not login', function() {
    //     it('cart button should be invisible', function(){
    //         element(by.css('[ng-click="logout()"]')).click();
    //         element.all(by.repeater('book in books')).get(0).click();

    //         var stocks =  element(by.linkText('Buy Used Books'));
    //         expect(stocks.isPresent()).toBeFalsy();
    //     });
    // });

    afterAll(function(done) {
        process.nextTick(done);
    });
});