describe('Login', function() {
    var email = element(by.model('email'));
    var password = element(by.model('password'));
    var submit = element(by.css('[ng-click="login()"]'));
    var errormsg = element(by.binding('validation'));
    var navEmail = element(by.binding('member.email'));

    beforeEach(function() {
        browser.get('/#/register');
    });

    describe('title', function() {
        it('should have a title', function() {
            expect(browser.getTitle()).toEqual('register');
        });
    });

    afterAll(function(done) {
        process.nextTick(done);
    });
});