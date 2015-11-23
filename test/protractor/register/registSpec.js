describe('Register', function() {
    var email = element(by.model('email'));
    var password = element(by.model('password'));
    var submit = element(by.css('[ng-click="submit()"]'));
    var passwordMsg = element(by.id('validate'));
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

    describe('required field', function() {
        it('must not be blank', function() {
            submit.click();
            // wait up to 1000ms for alert to pop up.
            browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000); 
            var alertDialog = browser.switchTo().alert();
            expect(alertDialog.getText()).toEqual('Please agree the term of condition');
            alertDialog.accept();
            expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/register', 5000);
        });
    });

    // describe('email', function() {
    //     // it('should not pass with worng format', function() {
    //     //     // browser.refresh();
    //     //     email.sendKeys('@@@@@@@.com');
    //     //     password.sendKeys('password');
    //     //     confPass.sendKeys('password');
    //     //     firstname.sendKeys('test');
    //     //     lastname.sendKeys('test');
    //     //     id.sendKeys('1111111111111');
    //     //     date.element(by.cssContainingText('option', '31')).click();
    //     //     month.element(by.cssContainingText('option', 'January')).click();
    //     //     year.element(by.cssContainingText('option', '1995')).click();
    //     //     gender.get(0).click();
    //     //     phone.sendKeys('0814224100');
    //     //     browser.pause();
    //     //     agree.click();
    //     //     submit.click();
    //     //     isAlert('error : [object Object]');
    //     //     expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/register', 5000);
    //     // });

    //     // it('should not pass with incompleted email', function() {
    //     //     email.sendKeys('bookie');
    //     //     password.sendKeys('password');
    //     //     confPass.sendKeys('password');
    //     //     firstname.sendKeys('test');
    //     //     lastname.sendKeys('test');
    //     //     id.sendKeys('1111111111111');
    //     //     date.element(by.cssContainingText('option', '31')).click();
    //     //     month.element(by.cssContainingText('option', 'January')).click();
    //     //     year.element(by.cssContainingText('option', '1995')).click();
    //     //     gender.get(0).click();
    //     //     phone.sendKeys('0814224100');
    //     //     browser.pause();
    //     //     agree.click();
    //     //     submit.click();
    //     //     isAlert('error : [object Object]');
    //     //     expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/register', 5000);
    //     // });

    //     it('should pass with valid email', function() {
    //         email.sendKeys('3333@ku.th');
    //         password.sendKeys('password');
    //         confPass.sendKeys('password');
    //         firstname.sendKeys('test');
    //         lastname.sendKeys('test');
    //         id.sendKeys('1111111111111');
    //         date.element(by.cssContainingText('option', '31')).click();
    //         month.element(by.cssContainingText('option', 'January')).click();
    //         year.element(by.cssContainingText('option', '1995')).click();
    //         gender.get(0).click();
    //         phone.sendKeys('0814224100');
    //         browser.pause();
    //         agree.click();
    //         submit.click();
    //         // isAlert('error : [object Object]');
    //         expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/login', 5000);
    //     });
    // });

    describe('length of Password', function() {
        // it('should not pass with more than 72 characters', function() {
        //     // browser.refresh();
        //     email.sendKeys('3333.com');
        //     password.sendKeys('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890');
        //     confPass.sendKeys('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890');
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

        it('should not pass with less than 8 characters', function() {
            // browser.refresh();
            email.sendKeys('3333.com');
            password.sendKeys('123');
            confPass.sendKeys('123');
            passwordMsg.toEqual('Not enough characters');
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
    });

    describe('password checking', function() {
        it('should show errer message if password not match', function(){
            password.sendKeys('12345678');
            confPass.sendKeys('87654321');
            passwordMsg.toEqual('Not enough characters');
        });
    });

    afterAll(function(done) {
        process.nextTick(done);
    });
});