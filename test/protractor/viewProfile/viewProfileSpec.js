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

    it('should match email',function() {
        expect(email.isDisplayed()).toBe(true);
        expect(email.getText()).toEqual('mint@test.com');
    });

    it('should match firstname',function() {
        expect(firstname.isDisplayed()).toBe(true);
        expect(firstname.getText()).toEqual('Mintra');
    });

    it('should match lastname',function() {
        expect(lastname.isDisplayed()).toBe(true);
        expect(lastname.getText()).toEqual('Thirasirisin');
    });

    it('should match phone number',function() {
        expect(phoneNo.isDisplayed()).toBe(true);
        expect(phoneNo.getText()).toEqual('0897606689');
    });

    it('should match identification number',function() {
        expect(idenNo.isDisplayed()).toBe(true);
        expect(idenNo.getText()).toEqual('1100400740297');
    });

    it('should match gender',function() {
        expect(gender.isDisplayed()).toBe(true);
        expect(gender.getText()).toEqual('Female');
    });

    it('should match birth date',function() {
        expect(birthdate.isDisplayed()).toBe(true);
        expect(birthdate.getText()).toEqual('1995-02-20');
    });

    afterAll(function(done) {
        process.nextTick(done);
    });
});


