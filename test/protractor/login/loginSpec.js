describe('Login', function() {
    var email = element(by.model('email'));
    var password = element(by.model('password'));
    var submit = element(by.id('submitB'));
    var errormsg = element(by.binding('validation'));
    var navEmail = element(by.binding('member.email'));
    var logout = element(by.id('logoutB'));

    beforeEach(function() {
        browser.get('/#/login');
    });

    var urlChanged = function(url) {
        return function () {
            return browser.getCurrentUrl().then(function(actualUrl) {
                return url != actualUrl;
            });
        };
    };

    describe('title', function() {
        it('should have a title', function() {
            expect(browser.getTitle()).toEqual('Login');
        });
    });

    describe('email', function() {
        it('should have @ symbol', function() {
            email.sendKeys('1111@a.com');
            email.getAttribute('value').then(function(mail) {
                expect(mail).toContain("@");
            });
        });

        it('should display error message when enter wrong email', function(){
            email.sendKeys('wrong_email@ku.th');
            password.sendKeys('12345678');
            submit.click();
            expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/login');
            expect(errormsg.isDisplayed()).toBeTruthy();
        });

        it('should enter valid email', function(){
            email.sendKeys('mint@test.com');
            password.sendKeys('11111111');
            submit.click();
            expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/');
            logout.click();
        });

        it('field can not be blank', function() {
            password.sendKeys('12345678');
            submit.click();
            expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/login');
            expect(errormsg.isDisplayed()).toBeTruthy();
        });

        it('should have @ only once', function() {
            email.sendKeys('@@@@@@@.com');
            password.sendKeys('12345678');
            submit.click();
            expect(errormsg.isDisplayed()).toBeTruthy();
        });
    });

    describe('password', function() {
        it('should have more than 8 letters long', function() {
            password.sendKeys('12345678');
            password.getAttribute('value').then(function(psw) {
                var size = psw.length;
                expect(size).toBeGreaterThan(7);
            });
        });

        it('can not less than 8 letters long', function() {
            password.sendKeys('123');
            password.getAttribute('value').then(function(psw) {
                var size = psw.length;
                expect(size).toBeLessThan(7);
            });
        });

        it('can not more than 72 letters long', function() {
            password.sendKeys('1111111111111111111111111111111111111111111111111111111111111111111111111');
            password.getAttribute('value').then(function(psw) {
                var size = psw.length;
                expect(size).toBeGreaterThan(72);
            });
        });

        it('space should be allowed', function() {
            password.sendKeys('        ');
            password.getAttribute('value').then(function(psw) {
                var size = psw.length;
                expect(size).toBeGreaterThan(7);
            });
        });

        it('field can not be blank', function() {
            email.sendKeys('123@ku.th');
            submit.click();
            expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/login');
            expect(errormsg.isDisplayed()).toBeTruthy();
        });
    });

    describe('nav bar', function() {
        var loginButton = element(by.id('loginB'));
        var registButton = element(by.id('registB'));

        it('should match with wrong input', function(){
            email.sendKeys('wrong_email');
            password.sendKeys('12345678');
            submit.click();
            expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/login');
            expect(errormsg.getText()).toBe('Invalid email or password');
            expect(loginButton.isDisplayed()).toBe(true);
            expect(registButton.isDisplayed()).toBe(true);
            expect(navEmail.isDisplayed()).toBe(false);
        });

        it('should match with correct input', function(){
            email.sendKeys('mint@test.com');
            password.sendKeys('11111111');
            submit.click();
            expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/');
            expect(navEmail.getText()).toBe('mint@test.com');
            expect(loginButton.isDisplayed()).toBe(false);
            expect(registButton.isDisplayed()).toBe(false);
        });
    });

    afterAll(function(done) {
        process.nextTick(done);
    });
});