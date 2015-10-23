describe('Edit Profile', function() {

    var loginEmail = element(by.model('email'));
    var loginPassword = element(by.model('password'));
    var submit = element(by.id('submitB'));
    var navEmail = element(by.binding('member.email'));
    var logout = element(by.id('logoutB'));
    var viewProfile = element(by.id('viewProfile'));
    var editProfile = element(by.id('editProfile'));
    var email = element(by.model('profileData.email'));
    var firstname = element(by.model('profileData.first_name'));
    var lastname = element(by.model('profileData.last_name'));
    var phoneNo = element(by.model('profileData.phone_number'));
    var idenNo = element(by.model('profileData.identification_number'));
    var gender = element(by.model('profileData.gender'));
    var confirmation = element(by.model('profileData.password'));
    var editButton = element(by.id('editProfileBtn'));
    var errormsg = element(by.id('validate'));
    var male = element(by.id('male'));
    var female = element(by.id('female'));
    var date = element(by.model('date'));
    var month = element(by.model('month'));
    var year = element(by.model('year'));

    beforeEach(function() {
        browser.get('/#/editProfile');
    });

    var urlChanged = function(url) {
        return function () {
            return browser.getCurrentUrl().then(function(actualUrl) {
                return url != actualUrl;
            });
        };
    };

    describe('title', function() {
        it('should match the title', function() {
            loginEmail.sendKeys('edit@test.com');
            loginPassword.sendKeys('11111111');
            submit.click();
            viewProfile.click();
            editProfile.click();
            expect(browser.getTitle()).toEqual('Edit Profile');
            logout.click();
        });

        it('can not edit profile if not login', function() {
            expect(browser.getTitle()).toEqual('Login');
        });
    });

    describe('can not complete without password confirmation', function() {
        it('edit email', function() {
            loginEmail.sendKeys('edit@test.com');
            loginPassword.sendKeys('11111111');
            submit.click();
            viewProfile.click();
            editProfile.click();
            email.clear();
            email.sendKeys('1234@a.com');
            editButton.click();
        
            expect(errormsg.isDisplayed()).toBe(true);
            expect(errormsg.getText()).toBe('Password is not correct');
            browser.refresh();
            expect(email.getAttribute('value')).toBe('edit@test.com');
        });

        it('edit firstname', function() {
            firstname.clear();
            firstname.sendKeys('1234');
            editButton.click();
        
            expect(errormsg.isDisplayed()).toBe(true);
            expect(errormsg.getText()).toBe('Password is not correct');
            browser.refresh();
            expect(firstname.getAttribute('value')).toBe('Mintra');
        });

        it('edit lastname', function() {
            lastname.clear();
            lastname.sendKeys('1234');
            editButton.click();
        
            expect(errormsg.isDisplayed()).toBe(true);
            expect(errormsg.getText()).toBe('Password is not correct');
            browser.refresh();
            expect(lastname.getAttribute('value')).toBe('Thirasirisin');
        });

        it('edit phone number', function() {
            phoneNo.clear();
            phoneNo.sendKeys('1234');
            editButton.click();
        
            expect(errormsg.isDisplayed()).toBe(true);
            expect(errormsg.getText()).toBe('Password is not correct');
            browser.refresh();
            expect(phoneNo.getAttribute('value')).toBe('0897606689');
        });

        it('edit identification number', function() {
            idenNo.clear();
            idenNo.sendKeys('1111111111111');
            editButton.click();
        
            expect(errormsg.isDisplayed()).toBe(true);
            expect(errormsg.getText()).toBe('Password is not correct');
            browser.refresh();
            expect(idenNo.getAttribute('value')).toBe('1100400740297');
        });

        it('edit gender', function() {
            male.click();
            editButton.click();
        
            expect(errormsg.isDisplayed()).toBe(true);
            expect(errormsg.getText()).toBe('Password is not correct');
            browser.refresh();
            expect(male.isSelected()).toBe(false);
        });

        it('edit date', function() {
            // date[0].click();
            element(by.css('select option[value="1"]')).click();
            editButton.click();
        
            expect(errormsg.isDisplayed()).toBe(true);
            expect(errormsg.getText()).toBe('Password is not correct');
            browser.refresh();
            expect(date.getAttribute('value')).toBe('20');
        });
       
       // it('edit month', function() {
       //      // date[0].click();
       //      element(by.css('select option[value="1"]')).click();
       //      editButton.click();
        
       //      expect(errormsg.isDisplayed()).toBe(true);
       //      expect(errormsg.getText()).toBe('Password is not correct');
       //      browser.refresh();
       //      expect(date.getAttribute('value')).toBe('2');
       //  });

    });

    describe('should complete when enter password confirmation', function() {
        it('edit email', function() {
            email.clear();
            email.sendKeys('1234@a.com');
            confirmation.sendKeys('11111111');
            editButton.click();
            editProfile.click();

            expect(email.getAttribute('value')).toBe('1234@a.com');
        });

        it('edit firstname', function() {
            firstname.clear();
            firstname.sendKeys('1234');
            confirmation.sendKeys('11111111');
            editButton.click();
            editProfile.click();
            expect(firstname.getAttribute('value')).toBe('1234');
        });

        it('edit lastname', function() {
            lastname.clear();
            lastname.sendKeys('1234');
            confirmation.sendKeys('11111111');
            editButton.click();
            editProfile.click();
            expect(lastname.getAttribute('value')).toBe('1234');
        });

        it('edit phone number', function() {
            phoneNo.clear();
            phoneNo.sendKeys('1234');
            confirmation.sendKeys('11111111');
            editButton.click();
            editProfile.click();
            expect(phoneNo.getAttribute('value')).toBe('1234');
        });

        it('edit identification number', function() {
            idenNo.clear();
            idenNo.sendKeys('1111111111111');
            confirmation.sendKeys('11111111');
            editButton.click();
            editProfile.click();
            expect(idenNo.getAttribute('value')).toBe('1111111111111');
        });

        it('edit gender', function() {
            male.click();
            confirmation.sendKeys('11111111');
            editButton.click();
            editProfile.click();
            expect(male.isSelected()).toBe(true);
        });

        it('edit date', function() {
            // date[0].click();
            element(by.css('select option[value="1"]')).click();
            editButton.click();
            editProfile.click();
            expect(date.getAttribute('value')).toBe('1');
        });

    });

describe('back to the default', function() {
        it('should be non-edit version', function() {
            email.clear();
            email.sendKeys('edit@test.com');
            firstname.clear();
            firstname.sendKeys('Mintra');
            lastname.clear();
            lastname.sendKeys('Thirasirisin');
            phoneNo.clear();
            phoneNo.sendKeys('0897606689');
            idenNo.clear();
            idenNo.sendKeys('1100400740297');
            female.click();

            confirmation.sendKeys('11111111');
            editButton.click();
            logout.click();
        });

        

       //  it('edit date', function() {
       //      // date[0].click();
       //      element(by.css('select option[value="1"]')).click();
       //      editButton.click();
        
       //      expect(errormsg.isDisplayed()).toBe(false);
       //      browser.refresh();
       //      expect(date.getAttribute('value')).toBe('20');
       //  });
       
       // it('edit month', function() {
       //      // date[0].click();
       //      element(by.css('select option[value="1"]')).click();
       //      editButton.click();
        
       //      expect(errormsg.isDisplayed()).toBe(false);
       //      browser.refresh();
       //      expect(date.getAttribute('value')).toBe('2');
       //      logout.click();
       //  });

    });


    afterAll(function(done) {
        process.nextTick(done);
    });
});