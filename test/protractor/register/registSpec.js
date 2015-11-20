describe('Register', function() {
    var email = element(by.model('email'));
    var password = element(by.model('password'));
    var submit = element(by.css('[ng-click="submit()"]'));
    var errormsg = element(by.binding('validation'));
    var navEmail = element(by.binding('member.email'));
    var confPass = element(by.model('password_confirmation'));
    var firstname = element(by.model('first_name'));
    var lastname = element(by.model('last_name'));
    var id = element(by.model('identification_number'));
    var date = element(by.id('date'));
    var month = element(by.id('month'));
    var year = element(by.id('year'));
    var gender = element.all(by.model('gender'));
    var phone = element(by.model('phone_number'));
    var map = element(by.tagName('ui-gmap-google-map'));
    var marker = element(by.id('0'));
    var agree = element(by.model('agreeTerm'));
    var submit = element(by.css('[ng-click="submit()"]'));

    beforeEach(function() {
        browser.get('/#/register');
    });

    function isAlert(alerttext){
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000); 
        var alertDialog = browser.switchTo().alert();
        expect(alertDialog.getText()).toEqual(alerttext);
        alertDialog.accept();
    }

    describe('title', function() {
        it('should have a title', function() {
            expect(browser.getTitle()).toEqual('Register');
        });
    });

    describe('email must be alphabet or number and follows email format', function() {
        it('should not pass with incompleted email', function() {
            email.sendKeys('bookie');
            password.sendKeys('password');
            confPass.sendKeys('password');
            firstname.sendKeys('test');
            lastname.sendKeys('test');
            id.sendKeys('1111111111111');
            date.element(by.cssContainingText('option', '31')).click();
            month.element(by.cssContainingText('option', 'January')).click();
            year.element(by.cssContainingText('option', '1995')).click();
            gender.get(0).click();
            phone.sendKeys('0814224100');
            browser.pause();
            agree.click();
            submit.click();
            isAlert('error : [object Object]');
            expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/register', 5000);
        });

        // it('shouldn''t pass with invalid email (not email format)', function() {
        //     email.sendKeys('@@@@@@@.com');
        //     password.sendKeys('password');
        //     confPass.sendKeys('password');
        //     firstname.sendKeys('test');
        //     lastname.sendKeys('test');
        //     id.sendKeys('1111111111111');
        //     date.element(by.cssContainingText('option', '31')).click();
        //     month.element(by.cssContainingText('option', 'January')).click();
        //     year.element(by.cssContainingText('option', '1995')).click();
        //     gender.get(0).click();
        //     phone.sendKeys('0814224100');
        //     browser.pause();
        //     agree.click();
        //     submit.click();
        //     isAlert('error : [object Object]');
        //     expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/register', 5000);
        // });

        // it('should pass with valid email', function() {
        //     email.sendKeys('1111@a.com');
        //     password.sendKeys('password');
        //     confPass.sendKeys('password');
        //     firstname.sendKeys('test');
        //     lastname.sendKeys('test');
        //     id.sendKeys('1111111111111');
        //     date.element(by.cssContainingText('option', '31')).click();
        //     month.element(by.cssContainingText('option', 'January')).click();
        //     year.element(by.cssContainingText('option', '1995')).click();
        //     gender.get(0).click();
        //     phone.sendKeys('0814224100');
        //     browser.pause();
        //     agree.click();
        //     submit.click();
        // });

        // it('should not be blank', function() {
        //     submit.click();
        //     // wait up to 1000ms for alert to pop up.
        //     browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000); 
        //     var alertDialog = browser.switchTo().alert();
        //     expect(alertDialog.getText()).toEqual('Please agree the term of condition');
        //     alertDialog.accept();
        //     expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/register', 5000);
        // });

    });

    afterAll(function(done) {
        process.nextTick(done);
    });
});