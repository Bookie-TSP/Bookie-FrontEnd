describe('Register', function() {
    var email = element(by.model('email'));
    var password = element(by.model('password'));
    var submit = element(by.css('[ng-click="submit()"]'));
    var errormsg = element(by.binding('validation'));
    var navEmail = element(by.binding('member.email'));

    beforeEach(function() {
        browser.get('/#/register');
    });

    describe('title', function() {
        it('should have a title', function() {
            expect(browser.getTitle()).toEqual('Register');
        });
    });

    describe('email', function() {
        it('should have @ symbol', function() {
            email.sendKeys('1111@a.com');
            email.getAttribute('value').then(function(mail) {
                expect(mail).toContain("@");
            });
        });

        it('should not be blank', function() {
            browser.driver.navigate().refresh();
            submit.click();
            // wait up to 1000ms for alert to pop up.
            browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000); 

            var alertDialog = browser.switchTo().alert();
            expect(alertDialog.getText()).toEqual('Please agree the term of condition');
            alertDialog.accept();
            expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/register', 5000);
        });

        // it('should have @ only once', function() {
        //     email.sendKeys('@@@@@@@.com');
        //     expect(errormsg.getText()).toBe('Invalid email or password');
        // });
    });

    afterAll(function(done) {
        process.nextTick(done);
    });
});