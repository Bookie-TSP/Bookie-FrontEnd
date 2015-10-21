describe('Edit Profile', function() {

    var email = element(by.model('email'));
    var password = element(by.model('password'));
    var submit = element(by.css('.login-form'));
    var profile = element(by.css('[ng-click="profile()"]'));

    beforeEach(function() {
        browser.get('/#/editProfile');
        // email.sendKeys('tester@ku.th');
        // password.sendKeys('11111111');
        // submit.click();
        // profile.click();
        
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
            expect(browser.getTitle()).toEqual('Edit Profile');
        });
    });



    afterAll(function(done) {
        process.nextTick(done);
    });
});