describe('View All Books', function() {

    var books = [];
    var request = require('request');
    var book = element.all(by.repeater('book in books'));
    var title = element(by.className('row book-name'));
    var login = element(by.id('loginNav'));
    var regis = element(by.id('regisNav'));
    var logout = element(by.css('[ng-click="logout()"]'));
    var memberEmail = element(by.id('dropdownMenu1'));
    var cart = element(by.id('item-cart'));
    var email = element(by.model('email'));
    var password = element(by.model('password'));
    var submit = element(by.id('submitB'));


    beforeEach(function() {
        browser.get('/#/');
    });

    request('https://bookieservice.herokuapp.com/api/books', function (error, response, body) {
        if (!error) {
            books = JSON.parse(body).books;
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

    // it('should match number of total books', function() {
    //     book.count().then(function(total) {
    //         expect(total).toEqual(books.length);
    //     });
    // }); 

    // // it('should match book title', function() {
    // //     console.log(book.row(1));
    // // });

    describe('if not login', function() {
        it('should show login button on nav bar', function() {
            expect(login.isDisplayed()).toBe(true);
            console.log(login.isDisplayed());
        });
    
    //     it('should show regis button on nav bar', function() {
    //        expect(regis.isDisplayed()).toBe(true); 
    //     });
    });

    // describe('if logged in', function() {
    //     it('should show logout button on nav bar', function() {
    //         // console.log(login.isDisplayed());
    //         // login.click()
    //         // email.sendKeys('mint@test.com');
    //         // password.sendKeys('11111111');
    //         // submit.click();
    //         // expect(logout.isDisplayed()).toBe(true);
    //     });
    
    //     // it('should show member email on nav bar', function() {
    //     //     expect(memberEmail.isDisplayed()).toBe(true); 
    //     // });

    //     // it('should show cart on nav bar', function() {
    //     //     expect(cart.isDisplayed()).toBe(true);
    //     //     logout.click();
    //     // });
    // });

    


    afterAll(function(done) {
        process.nextTick(done);
    });
});


