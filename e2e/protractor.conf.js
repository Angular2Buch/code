exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['*.spec.js'],

    // TODO: this is only a temporary solution
    onPrepare: function() {
        browser.ignoreSynchronization = true;
    }
};
