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
    var editProfileButton = element(by.id('editProfileBtn'));
    var incorrectConfirm = element(by.id('incorrectPass'));
    var requireConfirm = element(by.id('requiredPass'));
    var duplicateEmail = element(by.id('emailValid'));
    var male = element(by.id('male'));
    var female = element(by.id('female'));
    var date = element.all(by.repeater('d in initDates'));
    var dateValue = element(by.model('date'));
    var month = element.all(by.repeater('m in initMonths'));
    var monthValue = element(by.model('month'));
    var year = element.all(by.repeater('y in initYears'));
    var yearValue = element(by.model('year'));
    var dropdown = element(by.id('dropdownMenu1'));
    var emailLabel = element(by.id('emailLabel'));
    var firstnameLabel = element(by.id('firstnameLabel'));
    var lastnameLabel = element(by.id('lastnameLabel'));
    var phoneNoLabel = element(by.id('phoneNoLabel'));
    var idenNoLabel = element(by.id('idenNoLabel'));
    var genderLabel = element(by.id('genderLabel'));
    var bdLabel = element(by.id('bdLabel'));
    var confirmLabel = element(by.id('confirmLabel'));
    var backButton = element(by.id('backToViewProfileBtn'));

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

    describe('other cases', function() {
        it('can not edit profile if not login', function() {
            expect(browser.getTitle()).toEqual('Login');
        });

        it('should match the title', function() {
            loginEmail.sendKeys('edit@test.com');
            loginPassword.sendKeys('11111111');
            submit.click();
            dropdown.click();
            viewProfile.click();
            editProfile.click();
            expect(browser.getTitle()).toEqual('Edit Profile');
            expect(browser.getCurrentUrl()).toBe('http://localhost:8000/#/editProfile');
        });

        it('correctly label on edit profile button', function() {
            expect(editProfileButton.isDisplayed()).toBe(true);
            expect(editProfileButton.getText()).toEqual('Edit');
        });

        it('correctly label on back button', function() {
            expect(backButton.isDisplayed()).toBe(true);
            expect(backButton.getText()).toEqual('Back');
            logout.click();
        });
    });

    describe('should match with the content on the left', function() {
        it('email', function() {
            loginEmail.sendKeys('edit@test.com');
            loginPassword.sendKeys('11111111');
            submit.click();
            dropdown.click();
            viewProfile.click();
            editProfile.click();

            expect(emailLabel.isDisplayed()).toBe(true);
            expect(emailLabel.getText()).toEqual('Email');
        });

        it('firstname', function() {
            expect(firstnameLabel.isDisplayed()).toBe(true);
            expect(firstnameLabel.getText()).toEqual('Firstname');
        });

        it('lastname', function() {
            expect(lastnameLabel.isDisplayed()).toBe(true);
            expect(lastnameLabel.getText()).toEqual('Lastname');
        });

        it('phone number', function() {
            expect(phoneNoLabel.isDisplayed()).toBe(true);
            expect(phoneNoLabel.getText()).toEqual('Phone Number');
        });

        it('identification number', function() {
            expect(idenNoLabel.isDisplayed()).toBe(true);
            expect(idenNoLabel.getText()).toEqual('Identification Number');
        });

        it('gender', function() {
            expect(genderLabel.isDisplayed()).toBe(true);
            expect(genderLabel.getText()).toEqual('Gender');
        });

        it('birth date', function() {
            expect(bdLabel.isDisplayed()).toBe(true);
            expect(bdLabel.getText()).toEqual('Birth Date');
        });

        it('confirmation password', function() {
            expect(confirmLabel.isDisplayed()).toBe(true);
            expect(confirmLabel.getText()).toEqual('Confirmation Password');
        });
    });

    //not enter password confirmation
    describe('should not complete without password confirmation', function() {
        it('edit email', function() {
            email.clear();
            email.sendKeys('edittttttt@t.com');
            editProfileButton.click();
        
            expect(requireConfirm.isDisplayed()).toBe(true);
            expect(requireConfirm.getText()).toBe('Password is required');
            browser.refresh();
            expect(email.getAttribute('value')).toBe('edit@test.com');
        });

        it('edit firstname', function() {
            firstname.clear();
            firstname.sendKeys('1234');
            editProfileButton.click();
        
            expect(requireConfirm.isDisplayed()).toBe(true);
            expect(requireConfirm.getText()).toBe('Password is required');
            browser.refresh();
            expect(firstname.getAttribute('value')).toBe('Mintra');
        });

        it('edit lastname', function() {
            lastname.clear();
            lastname.sendKeys('1234');
            editProfileButton.click();
        
            expect(requireConfirm.isDisplayed()).toBe(true);
            expect(requireConfirm.getText()).toBe('Password is required');
            browser.refresh();
            expect(lastname.getAttribute('value')).toBe('Thirasirisin');
        });

        it('edit phone number', function() {
            phoneNo.clear();
            phoneNo.sendKeys('1234');
            editProfileButton.click();
        
            expect(requireConfirm.isDisplayed()).toBe(true);
            expect(requireConfirm.getText()).toBe('Password is required');
            browser.refresh();
            expect(phoneNo.getAttribute('value')).toBe('0897606689');
        });

        it('edit identification number', function() {
            idenNo.clear();
            idenNo.sendKeys('1111111111111');
            editProfileButton.click();
        
            expect(requireConfirm.isDisplayed()).toBe(true);
            expect(requireConfirm.getText()).toBe('Password is required');
            browser.refresh();
            expect(idenNo.getAttribute('value')).toBe('1100400740297');
        });

        it('edit gender', function() {
            male.click();
            editProfileButton.click();
        
            expect(requireConfirm.isDisplayed()).toBe(true);
            expect(requireConfirm.getText()).toBe('Password is required');
            browser.refresh();
            expect(male.isSelected()).toBe(false);
        });

        it('edit date', function() {
            date.get(0).click();
            editProfileButton.click();
        
            expect(requireConfirm.isDisplayed()).toBe(true);
            expect(requireConfirm.getText()).toBe('Password is required');
            browser.refresh();
            expect(dateValue.getAttribute('value')).toBe('20');
        });

        it('edit month', function() {
            month.get(0).click();
            editProfileButton.click();
        
            expect(requireConfirm.isDisplayed()).toBe(true);
            expect(requireConfirm.getText()).toBe('Password is required');
            browser.refresh();
            expect(monthValue.getAttribute('value')).toBe('February');
        });

        it('edit year', function() {
            year.get(0).click();
            editProfileButton.click();
        
            expect(requireConfirm.isDisplayed()).toBe(true);
            expect(requireConfirm.getText()).toBe('Password is required');
            browser.refresh();
            expect(yearValue.getAttribute('value')).toBe('1995');
        });
    });

    //enter wrong password confirmation
    describe('should not complete when enter wrong password confirmation', function() {
        it('edit email', function() {
            email.clear();
            email.sendKeys('edittttttt@t.com');
            confirmation.sendKeys('1');
            editProfileButton.click();
        
            expect(incorrectConfirm.isDisplayed()).toBe(true);
            expect(incorrectConfirm.getText()).toBe('Incorrect Password');
            browser.refresh();
            expect(email.getAttribute('value')).toBe('edit@test.com');
        });

        it('edit firstname', function() {
            firstname.clear();
            firstname.sendKeys('1234');
            confirmation.sendKeys('1');
            editProfileButton.click();
        
            expect(incorrectConfirm.isDisplayed()).toBe(true);
            expect(incorrectConfirm.getText()).toBe('Incorrect Password');
            browser.refresh();
            expect(firstname.getAttribute('value')).toBe('Mintra');
        });

        it('edit lastname', function() {
            lastname.clear();
            lastname.sendKeys('1234');
            confirmation.sendKeys('1');
            editProfileButton.click();
        
            expect(incorrectConfirm.isDisplayed()).toBe(true);
            expect(incorrectConfirm.getText()).toBe('Incorrect Password');
            browser.refresh();
            expect(lastname.getAttribute('value')).toBe('Thirasirisin');
        });

        it('edit phone number', function() {
            phoneNo.clear();
            phoneNo.sendKeys('1234');
            confirmation.sendKeys('1');
            editProfileButton.click();
        
            expect(incorrectConfirm.isDisplayed()).toBe(true);
            expect(incorrectConfirm.getText()).toBe('Incorrect Password');
            browser.refresh();
            expect(phoneNo.getAttribute('value')).toBe('0897606689');
        });

        it('edit identification number', function() {
            idenNo.clear();
            idenNo.sendKeys('1111111111111');
            confirmation.sendKeys('1');
            editProfileButton.click();
        
            expect(incorrectConfirm.isDisplayed()).toBe(true);
            expect(incorrectConfirm.getText()).toBe('Incorrect Password');
            browser.refresh();
            expect(idenNo.getAttribute('value')).toBe('1100400740297');
        });

        it('edit gender', function() {
            male.click();
            confirmation.sendKeys('1');
            editProfileButton.click();
        
            expect(incorrectConfirm.isDisplayed()).toBe(true);
            expect(incorrectConfirm.getText()).toBe('Incorrect Password');
            browser.refresh();
            expect(male.isSelected()).toBe(false);
        });

        it('edit date', function() {
            date.get(0).click();
            confirmation.sendKeys('1');
            editProfileButton.click();
        
            expect(incorrectConfirm.isDisplayed()).toBe(true);
            expect(incorrectConfirm.getText()).toBe('Incorrect Password');
            browser.refresh();
            expect(dateValue.getAttribute('value')).toBe('20');
        });

        it('edit month', function() {
            month.get(0).click();
            confirmation.sendKeys('1');
            editProfileButton.click();
        
            expect(incorrectConfirm.isDisplayed()).toBe(true);
            expect(incorrectConfirm.getText()).toBe('Incorrect Password');
            browser.refresh();
            expect(monthValue.getAttribute('value')).toBe('February');
        });

        it('edit year', function() {
            year.get(0).click();
            confirmation.sendKeys('1');
            editProfileButton.click();
        
            expect(incorrectConfirm.isDisplayed()).toBe(true);
            expect(incorrectConfirm.getText()).toBe('Incorrect Password');
            browser.refresh();
            expect(yearValue.getAttribute('value')).toBe('1995');
        });
    });

    //enter correct password confirmation
    describe('should complete when enter password confirmation', function() {
        it('edit email', function() {
            email.clear();
            email.sendKeys('edittttttt@t.com');
            confirmation.sendKeys('11111111');
            editProfileButton.click();
            editProfile.click();
            expect(email.getAttribute('value')).toBe('edittttttt@t.com');
        });

        it('edit firstname', function() {
            firstname.clear();
            firstname.sendKeys('1234');
            confirmation.sendKeys('11111111');
            editProfileButton.click();
            editProfile.click();
            expect(firstname.getAttribute('value')).toBe('1234');
        });

        it('edit lastname', function() {
            lastname.clear();
            lastname.sendKeys('1234');
            confirmation.sendKeys('11111111');
            editProfileButton.click();
            editProfile.click();
            expect(lastname.getAttribute('value')).toBe('1234');
        });

        it('edit phone number', function() {
            phoneNo.clear();
            phoneNo.sendKeys('1234');
            confirmation.sendKeys('11111111');
            editProfileButton.click();
            editProfile.click();
            expect(phoneNo.getAttribute('value')).toBe('1234');
        });

        it('edit identification number', function() {
            idenNo.clear();
            idenNo.sendKeys('1111111111111');
            confirmation.sendKeys('11111111');
            editProfileButton.click();
            editProfile.click();
            expect(idenNo.getAttribute('value')).toBe('1111111111111');
        });

        it('edit gender', function() {
            male.click();
            confirmation.sendKeys('11111111');
            editProfileButton.click();
            editProfile.click();
            expect(male.isSelected()).toBe(true);
        });

        it('edit date', function() {
            date.get(0).click();
            confirmation.sendKeys('11111111');
            editProfileButton.click();
            editProfile.click();
            expect(dateValue.getAttribute('value')).toBe('1');
        });

        it('edit month', function() {
            month.get(0).click();
            confirmation.sendKeys('11111111');
            editProfileButton.click();
            editProfile.click();
            expect(monthValue.getAttribute('value')).toBe('January');
        });

        it('edit year', function() {
            year.get(0).click();
            confirmation.sendKeys('11111111');
            editProfileButton.click();
            editProfile.click();
            expect(yearValue.getAttribute('value')).toBe('2015');
        });
    });

    describe('should not complete when enter duplicate email', function() {
        it('should show error message that email is already taken', function() {
            email.clear();
            email.sendKeys('mint@test.com');
            confirmation.sendKeys('11111111');
            editProfileButton.click();

            expect(duplicateEmail.isDisplayed()).toBe(true);
            expect(duplicateEmail.getText()).toBe('Email has already been taken');
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
            date.get(19).click();
            month.get(1).click();
            year.get(20).click();

            confirmation.sendKeys('11111111');
            editProfileButton.click();
            logout.click();
        });
    });

    afterAll(function(done) {
        process.nextTick(done);
    });
});