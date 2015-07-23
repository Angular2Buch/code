exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['*.spec.js'],

    // TODO: this is only a temporary solution
    onPrepare: function() {
        browser.ignoreSynchronization = true;
    },

    // Travis uses something called xvfb (XVirtual Frame Buffer), which uses Firefox exclusively.
    capabilities: {
      'browserName': 'firefox'
    }
};
