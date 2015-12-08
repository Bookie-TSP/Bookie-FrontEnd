describe('View a Cart', function() {
    var cartButton = element(by.id('item-cart'));
    var request = require('request');
    var bookTitle = element(by.id('title-header'));
    var selectedBook;
    var bookPrice;
    var books;
    var bookStocks;
    var carts;

    beforeAll(function() {
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
            login();
            expect(cartButton.isDisplayed()).toBeTruthy();
            cartButton.click();
            // browser.pause();
            expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/cart', 5000);
        });
    });
    
    

    afterAll(function(done) {
        process.nextTick(done);
    });
});