describe('Test Login Bookie App', function() {
    var email = element(by.model('email'));
    var password = element(by.model('password'));
    var submit = element(by.css('[ng-click="login()"]'));
    var errormsg = element(by.binding('validation'));

    beforeEach(function() {
        browser.get('index.html#/login');
    });

    var urlChanged = function(url) {
        return function () {
            return browser.getCurrentUrl().then(function(actualUrl) {
                return url != actualUrl;
            });
        };
    };

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Bookie');
    });

    it('should check length of password', function() {
        password.sendKeys('12345678');
        password.getAttribute('value').then(function(psw) {
            var size = psw.length;
            expect(size).toBeGreaterThan(7);
        });
    });

     it('email should have @ symbol', function() {
        email.sendKeys('1111@a.com');
        email.getAttribute('value').then(function(mail) {
            expect(mail).toContain("@");
        });
    }); 

     it('should filter email', function(){
        //wrong email format
        email.sendKeys('wrong_email');
        password.sendKeys('12345678');
        submit.click();
        expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:8081/index.html#/login');
        expect(errormsg.getText()).toBe('Invalid email or password');

        //valid email
        email.sendKeys('bookie@ku.th');
        password.sendKeys('12345678');
        submit.click();
        expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:8081/index.html#/');
        expect(errormsg.getText()).toBe('Invalid email or password');
    });

    afterAll(function(done) {
        process.nextTick(done);
    });
});