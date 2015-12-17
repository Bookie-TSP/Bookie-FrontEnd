describe('Add book to cart (buying)', function() {
    var cartHeader = element(by.id('item-cart'));
    var request = require('request');
    var bookTitle = element(by.id('title-header'));
    var selectedBook;
    var bookPrice;
    var books;
    var bookStocks;
    var carts;
    var postData;

    beforeEach(function() {
        browser.get('/#');
    });

    beforeAll(function() {
        postRequest('https://bookieservice.herokuapp.com/api/books/', 'indiBook');
        postRequest('https://bookieservice.herokuapp.com/api/books/3', 'selectBook');
        // postRequest('https://bookieservice.herokuapp.com/api/members/cart/show', 'cart')
        // postRequest('https://bookieservice.herokuapp.com/api/sessions', 'login');
    });

    function postRequest(link, vari){
        // browser.waitForAngular();

        // var options = {
        //     method: 'post',
        //     body: postData,
        //     json: true,
        //     url: url
        // }
        // request(options, function (err, res, body) {
        //     console.log(body.token)
        // })

        
        request(link, function (error, response, body) {
            if (!error && vari=='indiBook') {
                books = JSON.parse(body).books;
                // console.log(books);
            }
            else if(!error && vari=='selectBook') {
                bookStocks = JSON.parse(body).line_stocks;
                // console.log(bookStocks);
            }
            else if(!error && vari=='login'){
                var loginAuth  = JSON.parse(body);
                console.log(loginAuth);
            }
            else if(!error && vari=='cart') {
                carts = JSON.parse(body);
                console.log(carts);

                // var postData = {
                //   "email": "nara@gmail.com",
                //   "password": "12345678"
                // }

                // var url = link;
                // var options = {
                //   method: 'post',
                //   body: postData,
                //   json: true,
                //   url: url
                // }
                // request(options, function (err, res, body) {
                //   console.log(body.token)
                // })
            }
        });
    };

    function login(){
        element(by.css('[ui-sref="login"]')).click();
        browser.pause();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/login', 5000);
        var email = element(by.model('email'));
        var password = element(by.model('password'));
        var submit = element(by.id('submitB'));
        email.sendKeys('tester@ku.th');
        password.sendKeys('11111111');
        submit.click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/');
    };

    // function logout(){
    //     element(by.id('dropdownProfile')).click();
    //     element(by.id('logout')).click();
    //     $('.modal-dialog').element(by.buttonText('Logout')).click();
    // }

    describe('if not login', function() {
        it('should be prevented to add book to cart', function(){
            expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/');
            element.all(by.repeater('book in books | filter:searchText')).get(0).click();

            var stocks =  element(by.linkText('Buy Used Books'));
            expect(stocks.isPresent()).toBeFalsy();
        });
    });

    describe('if login', function() {
        it('should be able to add NEW book to cart', function() {
            login();
            browser.pause();
            // select book id3
            // element.all(by.repeater('book in books | filter:searchText')).get(2).click();
            // // // pick the first book order
            // element.all(by.repeater('line_stock in buyNewBook')).then(function(buyNewBook) {
            //     selectedBook = buyNewBook[0];
            //     selectedBook.element(by.className('ng-scope')).click();
            // });
            // var modalText = 'AAAA';
            // modalText = $('.btn-primary').getText();
            // expect(modalText).toEqual('Add To Cart');
            // browser.executeScript("$('.btn-primary').click()");
            // browser.pause();
        });

        it('should be able to add USED book to cart', function() {
            // select book
            element.all(by.repeater('book in books | filter:searchText')).get(4).click();
            selectedBook =  element(by.linkText('Buy Used Books')).click();
            // pick the first order
            element.all(by.repeater('line_stock in buyUsedBook')).then(function(buyUsedBook) {
                selectedBook = buyUsedBook[0];
                selectedBook.element(by.className('ng-scope')).click();
            });

            // $('.modal-dialog').element(by.buttonText('Add To Cart')).click();
            // browser.pause();
        });
    });

    afterAll(function(done) {
        process.nextTick(done);
    });
});