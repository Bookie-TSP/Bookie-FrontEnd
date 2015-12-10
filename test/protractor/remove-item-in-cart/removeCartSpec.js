describe('Cart', function() {
    var cartButton = element(by.id('item-cart'));
    // var cancelButton = element(by.css('[ng-click="removeStock(stock.id)"]'));
    var bookAmount = 3;

    beforeAll(function() {
        browser.get('/#');
        login();
        addBookToCart();
    });

    afterAll(function(){
        element(by.css('[ng-click="logout()"]'));
    });

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

    function addBookToCart(){
        element.all(by.repeater('book in books')).get(2).click();
        for (var round = bookAmount; round >= 1; round--) {
            element.all(by.repeater('line_stock in buyNewBook')).then(function(buyNewBook) {
                selectedBook = buyNewBook[0];
                selectedBook.element(by.className('ng-scope')).click();
            });
            $('.modal-dialog').element(by.buttonText('Add To Cart')).click();
        };
    }

    it('cart button should be visible', function(){
        expect(cartButton.isDisplayed()).toBeTruthy();
        cartButton.click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/cart', 5000);
    });

    it('cancle button should be clickable', function(){
        var EC = protractor.ExpectedConditions;
        var isClickable = EC.elementToBeClickable(cancelButton);
        expect(isClickable).toBeTruthy();
    });

    it('[BUY] item should disappear immediately after canceled', function(){
        // cancelButton.click();
        var buyStocks = element.all(by.repeater('stock in stocks'));
        var beforeRemove = buyStocks.count();
        (buyStocks[0].element(by.buttonText('Cancel'))).click();
        var afterRemove = buyStocks.count();
        console.log(beforeRemove +" ||| "+ afterRemove);
        expect(parseInt(beforeRemove)-1).toEqual(afterRemove);
    });
    
    

    afterAll(function(done) {
        process.nextTick(done);
    });
});