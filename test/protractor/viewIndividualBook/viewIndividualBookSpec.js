describe('View Individual Book', function() {
    

    beforeEach(function() {
        browser.get('/#/');
    });

    var urlChanged = function(url) {
        return function () {
            return browser.getCurrentUrl().then(function(actualUrl) {
                return url != actualUrl;
            });
        };
    };

    describe(' cases',function() {
        it('test', function() {
            expect(browser.getTitle()).toEqual('Home');
        });

    });


    afterAll(function(done) {
        process.nextTick(done);
    });
});


