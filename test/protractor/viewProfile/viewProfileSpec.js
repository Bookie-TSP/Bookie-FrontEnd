describe('View Profile', function() {

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

     describe('other cases', function() {
        it('can not edit profile if not login', function() {
            expect(browser.getTitle()).toEqual('Login');
        });
    });

    afterAll(function(done) {
        process.nextTick(done);
    });
});