describe('Add book to cart (buying)', function() {
    var cartHeader = element(by.id('item-cart'));
    var selectedBook;
    var bookPrice;

    beforeEach(function() {
        browser.get('/#');
    });

    function login(){
        element(by.id('loginB')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/login', 5000);
        var email = element(by.model('email'));
        var password = element(by.model('password'));
        var submit = element(by.id('submitB'));
        email.sendKeys('neen@ku.th');
        password.sendKeys('12345678');
        submit.click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/');
    }

    function cancelOrder(){
        element(by.id('item-cart')).click();
        element.all(by.repeater('stock in stocks')).then(function(stocks) {
            var size = stocks.length/2;
            for(var i=0;i<size;i++){
                selectedBook = stocks[i];
                selectedBook.element(by.css('[ng-click="removeStock(stock.id)"]')).click();
            }
        });
        browser.pause();
    }

    describe('if login', function() {
        it('should be able to add NEW book to cart', function() {
            login();
            //select book
            element.all(by.repeater('book in books')).get(0).click();
            //pick the first order
            element.all(by.repeater('line_stock in buyNewBook')).then(function(buyNewBook) {
                selectedBook = buyNewBook[0];
                selectedBook.element(by.className('ng-scope')).click();
                bookPrice = selectedBook.element(by.className('col-sm-1')).getText();
                // expect(bookPrice).toEqual('aaaa');
            });
        
            $('.modal-dialog').element(by.buttonText('Add To Cart')).click();
            expect(cartHeader.getText()).toEqual(bookPrice+' (1 item)');
            browser.pause();
        });

        it('should be able to add USED book to cart', function() {
            //select book
            element.all(by.repeater('book in books')).get(0).click();
            
            selectedBook =  element(by.linkText('Buy Used Books')).click();
            //pick the first order
            element.all(by.repeater('line_stock in buyUsedBook')).then(function(buyUsedBook) {
                selectedBook = buyUsedBook[0];
                selectedBook.element(by.className('ng-scope')).click();
                bookPrice = selectedBook.element(by.className('col-sm-1')).getText();
            });

            $('.modal-dialog').element(by.buttonText('Add To Cart')).click();
            expect(cartHeader.getText()).toEqual(bookPrice+' (2 item)');
            cancelOrder();
        });
    });


// var condition = EC.and(urlChanged, EC.textToBePresentInElement($('abc'), 'bar'), isClickable)

    afterAll(function(done) {
        process.nextTick(done);
    });
});