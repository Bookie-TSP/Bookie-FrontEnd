describe('View cart' ,function() {

    var email = element(by.model('email'));
    var password = element(by.model('password'));
    var submit = element(by.id('submitB'));
    var buyLength = element(by.id('buyLength'));
    //var noBook = element(by.id('noBook'));
    var homeNav = element(by.id('home'));
    var cartNav = element(by.id('item-cart'));

    var title;
    var ISBN13;
    var author;
    var language;
    var pages;
    var publisher;
    var price;
    var condition;

    var checkTotal;

    beforeEach(function() {
        browser.get('/#');
    });

    function getDetail(index) {
        homeNav.click();
        element.all(by.repeater('book in books')).get(index).click();
        title = element(by.id('individualBookTitle')).getText();
        ISBN13 = element(by.id('individualBookISBNThirteen')).getText();
        // author = element.all(by.repeater('author in bookInfo.authors'));
        // language = element(by.id('individualBookLanguage')).getText();
        // pages = element(by.id('individualBookPages')).getText();
        // publisher = element(by.id('individualBookPublisher')).getText();
        // price = element(by.repeater('line_stock in buyNewBook')).getText();
        // condition = element(by.id('')).getText();
    }

    describe('login first' ,function() {
        it('should login before view cart' ,function() {
            // browser.get('/#/cart');
            // expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/');
            element(by.id('loginNav')).click();
            email.sendKeys('edit@test.com');
            password.sendKeys('11111111');
            submit.click();
            cartNav.click();
            expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/cart');
        });
    });

    describe('correctly number in cart' ,function() {
        it('should not have book' ,function() {
            expect(buyLength === 0);
            //expect(noBook.isDisplayed()).toBe(false);
        });

        it('should have a book' ,function() {
            homeNav.click();
            element.all(by.repeater('book in books')).get(0).click();
            //element(by.css('.btn.btn-warning')).click();
            element(by.repeater('line_stock in buyNewBook')).element(by.css('.btn.btn-warning')).click();
            element(by.css('.btn.btn-primary')).click();
            cartNav.click();
            element.all(by.repeater('stock in stock')).then(function(cart) {
                expect((cart.length)/2).toBe(1);
            });
            element(by.css('.btn.btn-danger')).click();
            element.all(by.repeater('stock in stock')).then(function(cart) {
                expect((cart.length)/2).toBe(0);
            });
            //browser.pause();
        });

        it('should have more than one book' ,function() {
            for(var i=0; i<3; i++){
            homeNav.click();
            element.all(by.repeater('book in books')).get(i).click();
            //element(by.css('.btn.btn-warning')).click();
            element(by.repeater('line_stock in buyNewBook')).element(by.css('.btn.btn-warning')).click();
            element(by.css('.btn.btn-primary')).click();
            };
            cartNav.click();
            element.all(by.repeater('stock in stock')).then(function(cart) {
                expect((cart.length)/2).toBe(3);
            });
            for(var i=0; i<3; i++){
                element(by.css('.btn.btn-danger')).click();
            };
            element.all(by.repeater('stock in stock')).then(function(cart) {
                expect((cart.length)/2).toBe(0);
            });
        });
    });

    describe('correctly detail in cart' ,function() {
        it('should have correct detail' ,function() {
            homeNav.click();
            var bookIndex = 0;
            element.all(by.repeater('book in books')).get(bookIndex).click();
            element(by.repeater('line_stock in buyNewBook')).element(by.css('.btn.btn-warning')).click();
            element(by.css('.btn.btn-primary')).click();

            getDetail(bookIndex);

            cartNav.click();

            // Have to add element id in 'cart' b4 run this function like 'title'.

            expect(title).toEqual(element(by.id('buy')).element(by.id('title')).getText());
            
            // pin
            // expect(ISBN13).toEqual(element(by.id('buy')).element(by.id('ISBN13')).getText());
            // expect(author).toEqual(element.all(by.repeater('author in bookInfo.authors')));
            // expect(language).toEqual(element(by.id('individualBookLanguage')).getText());
            // expect(pages).toEqual(element(by.id('individualBookPages')).getText());
            // expect(publisher).toEqual(element(by.id('individualBookPublisher')).getText());
            // expect(price).toEqual(element(by.repeater('line_stock in buyNewBook')).getText(););
            // expect(condition).toEqual('');

            element(by.css('.btn.btn-danger')).click();
            browser.pause();
        });

    });

    describe('correctly price details' ,function() {
        it('should calculate subtotal correctly' ,function() {
            checkTotal = 0;
            element.all(by.repeater('book in books')).get(0).click();
            element(by.repeater('line_stock in buyNewBook')).element(by.css('.btn.btn-warning')).click();
            element(by.css('.btn.btn-primary')).click();
            cartNav.click();
            expect(element(by.id('subTotal')).getText()).toBe(500.00);
            browser.pause();
        });
    });

     afterAll(function(done) {
        process.nextTick(done);
    });
});