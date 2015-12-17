describe('View cart' ,function() {

    var email = element(by.model('email'));
    var password = element(by.model('password'));
    var submit = element(by.id('submitB'));
    var buyLength = element(by.id('buyLength'));
    //var noBook = element(by.id('noBook'));
    var homeNav = element(by.id('home'));
    var cartNav = element(by.id('item-cart'));

    var bookNumber;
    var bookIndex;

    var title;
    var isbn13;
    var author;
    var language;
    var pages;
    var publisher;
    var price;
    var condition;

    beforeEach(function() {
        browser.get('/#');
    });

    function getDetail(index) {
        homeNav.click();
        element.all(by.repeater('book in books')).get(index).click();
        title = element(by.id('individualBookTitle')).getText();
        isbn13 = element(by.id('individualBookISBNThirteen')).getText();
        author = element.all(by.repeater('author in bookInfo.authors'));
        language = element(by.id('individualBookLanguage')).getText();
        pages = element(by.id('individualBookPages')).getText();
        publisher = element(by.id('individualBookPublisher')).getText();
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
            element.all(by.repeater('book in books')).get(1).click();
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
            bookNumber = 2;
            for(var i=0; i<bookNumber; i++){
            homeNav.click();
            element.all(by.repeater('book in books')).get(2).click();
            //element(by.css('.btn.btn-warning')).click();
            element(by.repeater('line_stock in buyNewBook')).element(by.css('.btn.btn-warning')).click();
            element(by.css('.btn.btn-primary')).click();
            };
            cartNav.click();
            element.all(by.repeater('stock in stock')).then(function(cart) {
                expect((cart.length)/2).toBe(bookNumber);
            });
            for(var i=0; i<bookNumber; i++){
                element(by.css('.btn.btn-danger')).click();
            };
            element.all(by.repeater('stock in stock')).then(function(cart) {
                expect((cart.length)/2).toBe(0);
            });
        });
    });

    describe('correctly detail in cart when buy books' ,function() {
        it('should have correct detail' ,function() {
            homeNav.click();
            bookIndex = 2;
            element.all(by.repeater('book in books')).get(bookIndex).click();
            element(by.repeater('line_stock in buyNewBook')).element(by.css('.btn.btn-warning')).click();
            element(by.css('.btn.btn-primary')).click();

            getDetail(bookIndex);
            price = element(by.repeater('line_stock in buyNewBook')).element(by.id('individualPrice')).getText();
            condition = element(by.repeater('line_stock in buyNewBook')).element(by.id('individualCondition')).getText();


            cartNav.click();

            // Have to add element id in 'cart' b4 run this function like 'individualBookTitle'.
            // 'title ,isbn13 ,language ,pages ,publisher ,price ,condition'

            // Have to add element id in 'bookProfile' b4 run this function like 'individualBookTitle'.
            // 'individualPrice ,individualCondition'


            expect(title).toEqual(element(by.id('buy')).element(by.id('title')).getText());
            
        });

        it('should have correct isbn13' ,function() {
            cartNav.click();
            expect(isbn13).toEqual(element(by.id('buy')).element(by.id('isbn13')).getText());
        });

        it('should have correct author' ,function() {
            cartNav.click();
            expect(author).toEqual(element.all(by.repeater('author in bookInfo.authors')));
        });

        it('should have correct language' ,function() {
            cartNav.click();
            expect(language).toEqual(element(by.id('buy')).element(by.id('language')).getText());
        });

        it('should have correct pages' ,function() {
            cartNav.click();
            expect(pages).toEqual(element(by.id('buy')).element(by.id('pages')).getText());
        });

        it('should have correct publisher' ,function() {
            cartNav.click();
            expect(publisher).toEqual(element(by.id('buy')).element(by.id('publisher')).getText());
        });

        it('should have correct price' ,function() {
            cartNav.click();
            expect(price).toEqual(element(by.id('buy')).element(by.id('price')).getText());
        });

        it('should have correct condition' ,function() {
            cartNav.click();
            expect(condition).toEqual(element(by.id('buy')).element(by.id('condition')).getText());
            element(by.css('.btn.btn-danger')).click();
            browser.pause();
        });
    });

    describe('correctly detail in cart when rent books' ,function() {
        it('should have correct detail' ,function() {
            homeNav.click();
            bookIndex = 5;
            element.all(by.repeater('book in books')).get(bookIndex).click();
            element(by.linkText('Rent Books')).click();
            element(by.repeater('line_stock in rentBook')).element(by.css('.btn.btn-warning')).click();
            element(by.css('.btn.btn-primary')).click();
            
            getDetail(bookIndex);
            element(by.linkText('Rent Books')).click();
            price = element(by.repeater('line_stock in rentBook')).element(by.id('individualPrice')).getText();
            // condition = element(by.repeater('line_stock in rentBook')).element(by.id('individualCondition')).getText();

            cartNav.click();
            
            // Have to add element id in 'cart' b4 run this function like 'individualBookTitle'.
            // 'title ,isbn13 ,language ,pages ,publisher ,price ,condition'

            // Have to add element id in 'bookProfile' b4 run this function like 'individualBookTitle'.
            // 'individualPrice ,individualCondition'


            expect(title).toEqual(element(by.id('rent')).element(by.id('title')).getText());
            
        });

        it('should have correct isbn13' ,function() {
            cartNav.click();
            expect(isbn13).toEqual(element(by.id('rent')).element(by.id('isbn13')).getText());
        });

        it('should have correct author' ,function() {
            cartNav.click();
            expect(author).toEqual(element.all(by.repeater('author in bookInfo.authors')));
        });

        it('should have correct publisher' ,function() {
            cartNav.click();
            expect(publisher).toEqual(element(by.id('rent')).element(by.id('publisher')).getText());
        });

        it('should have correct price' ,function() {
            cartNav.click();
            expect(price).toEqual(element(by.id('rent')).element(by.id('price')).getText());
        });

        // it('should have correct condition' ,function() {
        //     cartNav.click();
        //     expect(condition).toEqual(element(by.id('rent')).element(by.id('condition')).getText());
        //     element(by.css('.btn.btn-danger')).click();
        //     browser.pause();
        // });
    });

    describe('correctly price details' ,function() {
        it('should calculate subtotal correctly' ,function() {
            homeNav.click();
            bookIndex = 2;
            element.all(by.repeater('book in books')).get(bookIndex).click();
            element(by.repeater('line_stock in buyNewBook')).element(by.css('.btn.btn-warning')).click();
            element(by.css('.btn.btn-primary')).click();

            getDetail(bookIndex);

            cartNav.click();

            // Have to add element id in 'cart' b4 run this function like 'individualBookTitle'.
            // 'subTotal ,total'

            expect(price).toEqual(element(by.id('subTotal')).getText());
        });

        it('should calculate total correctly' ,function() {
            cartNav.click();
            var totalPrice = price;
            expect(totalPrice).toEqual(element(by.id('total')).getText());
            element(by.css('.btn.btn-danger')).click();
            browser.pause();
        });
    });

     afterAll(function(done) {
        process.nextTick(done);
    });
});