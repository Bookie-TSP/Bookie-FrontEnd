var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

exports.config = {
    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['specLogin.js'],
    baseUrl: 'file:///Users/naneen/Desktop/Bookie-FrontEnd/app/views/login.html',

    onPrepare: function() {
        jasmine.getEnv().addReporter(
            new HtmlScreenshotReporter({
                dest: 'test_results',
                filename: 'login-report.html'
            })
        );
        browser.resetUrl = 'file://';
    },

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            // --allow-file-access-from-files - allow XHR from file://
            args: ['allow-file-access-from-files']
        }
    }
}