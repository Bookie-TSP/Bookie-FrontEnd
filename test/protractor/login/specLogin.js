describe('Test Login Bookie App', function() {
    var email = element(by.model('email'));
    var password = element(by.model('password'));

    beforeEach(function() {
        browser.get('');
    });

    it('password should have 8 letters long', function() {
        password.sendKeys('12345678');
        password.getAttribute('value').then(function(psw) {
            var size = psw.length;
            expect(size).toEqual(8)
        });
    });

    // it('email ', function() {
    //     email.sendKeys('1111@a.com');
    //     email.getAttribute('value').then(function(mail) {
    //         // var at = "";
    //         // for(var i=0 , i<mail.length , i++){
    //         //     if(mail.charAt(i) == "@"){
    //         //         at = "@";
    //         //         break;
    //         //     }
    //         // }
    //         var at = mail.charAt(4);
    //         expect(at).toEqual('@');
    //     });
    //     // expect('111@a.com').toEqual('111@a.com');
    // });

    afterAll(function(done) {
        process.nextTick(done);
    });
});