describe('View Profile', function() {
    var dropdown = element(by.id('dropdownMenu1'));
    var viewProfile = element(by.id('viewProfile'));
    var loginEmail = element(by.model('email'));
    var loginPassword = element(by.model('password'));
    var submit = element(by.id('submitB'));
    var email = element(by.id('viewEmail'));
    var firstname = element(by.id('viewFirstname'));
    var lastname = element(by.id('viewLastname'));
    var phoneNo = element(by.id('viewPhoneNo'));
    var idenNo = element(by.id('viewIdenNo'));
    var gender = element(by.id('viewGender'));
    var birthdate = element(by.id('viewBD'));
    var emailLabel = element(by.id('viewEmailLabel'));
    var firstnameLabel = element(by.id('viewFirstnameLabel'));
    var lastnameLabel = element(by.id('viewLastnameLabel'));
    var phoneNoLabel = element(by.id('viewPhoneNoLabel'));
    var idenNoLabel = element(by.id('viewIdenNoLabel'));
    var genderLabel = element(by.id('viewGenderLabel'));
    var bdLabel = element(by.id('viewBDLabel'));
    var latitudeLabel = element(by.id('viewLatLabel'));
    var longitudeLabel = element(by.id('viewLongLabel'));
    var infoLabel = element(by.id('viewInfoLabel'));
    var editProfile = element(by.id('editProfile'));
    var editAddress = element(by.id('editAddress'));

    beforeEach(function() {
        browser.get('/#/viewProfile');
    });

    var urlChanged = function(url) {
        return function () {
            return browser.getCurrentUrl().then(function(actualUrl) {
                return url != actualUrl;
            });
        };
    };

    describe('other cases',function() {
        it('can not view profile if not login', function() {
            expect(browser.getTitle()).toEqual('Login');
        });

        it('should login to view profile',function() {
            loginEmail.sendKeys('mint@test.com ');
            loginPassword.sendKeys('11111111');
            submit.click();
            dropdown.click();
            viewProfile.click();
            expect(browser.getTitle()).toEqual('View Profile');
            expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/viewProfile');
        });
    });

    describe('should match information to the account', function() {
        it('email',function() {
            expect(email.isDisplayed()).toBe(true);
            expect(email.getText()).toEqual('mint@test.com');
        });

        it('firstname',function() {
            expect(firstname.isDisplayed()).toBe(true);
            expect(firstname.getText()).toEqual('Mintra');
        });

        it('lastname',function() {
            expect(lastname.isDisplayed()).toBe(true);
            expect(lastname.getText()).toEqual('Thirasirisin');
        });

        it('phone number',function() {
            expect(phoneNo.isDisplayed()).toBe(true);
            expect(phoneNo.getText()).toEqual('0897606689');
        });

        it('identification number',function() {
            expect(idenNo.isDisplayed()).toBe(true);
            expect(idenNo.getText()).toEqual('1100400740297');
        });

        it('gender',function() {
            expect(gender.isDisplayed()).toBe(true);
            expect(gender.getText()).toEqual('Female');
        });

        it('birth date',function() {
            expect(birthdate.isDisplayed()).toBe(true);
            expect(birthdate.getText()).toEqual('1995-02-20');
        });
    });

    describe('should have correct label', function() {
        it('email',function() {
            expect(emailLabel.isDisplayed()).toBe(true);
            expect(emailLabel.getText()).toEqual('Email');
        });

        it('firstname',function() {
            expect(firstnameLabel.isDisplayed()).toBe(true);
            expect(firstnameLabel.getText()).toEqual('Firstname');
        });

        it('lastname',function() {
            expect(lastnameLabel.isDisplayed()).toBe(true);
            expect(lastnameLabel.getText()).toEqual('Lastname');
        });

        it('phone number',function() {
            expect(phoneNoLabel.isDisplayed()).toBe(true);
            expect(phoneNoLabel.getText()).toEqual('Phone Number');
        });

        it('identification number',function() {
            expect(idenNoLabel.isDisplayed()).toBe(true);
            expect(idenNoLabel.getText()).toEqual('Identification Number');
        });

        it('gender',function() {
            expect(genderLabel.isDisplayed()).toBe(true);
            expect(genderLabel.getText()).toEqual('Gender');
        });

        it('birth date',function() {
            expect(bdLabel.isDisplayed()).toBe(true);
            expect(bdLabel.getText()).toEqual('Birth Date');
        });

        it('latitude',function() {
            expect(latitudeLabel.isDisplayed()).toBe(true);
            expect(latitudeLabel.getText()).toEqual('Latitude');
        });

        it('longitude',function() {
            expect(longitudeLabel.isDisplayed()).toBe(true);
            expect(longitudeLabel.getText()).toEqual('Longitude');
        });

        it('information',function() {
            expect(infoLabel.isDisplayed()).toBe(true);
            expect(infoLabel.getText()).toEqual('Information');
        });
    });

    describe('should have correct label on button', function() {
        it('edit profile button', function() {
            expect(editProfile.isDisplayed()).toBe(true);
            expect(editProfile.getText()).toEqual('Edit Profile');
        });

        it('edit address button', function() {
            expect(editAddress.isDisplayed()).toBe(true);
            expect(editAddress.getText()).toEqual('Edit Address');
        });
    });

    afterAll(function(done) {
        process.nextTick(done);
    });
});


