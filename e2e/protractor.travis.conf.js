exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['*.spec.js'],

    // TODO: this is only a temporary solution
    onPrepare: function() {
        browser.ignoreSynchronization = true;
    },

    // travis offers xvfb (XVirtual Frame Buffer) to support firefox
    // (chrome does not work that easy)
    capabilities: {
      'browserName': 'firefox'
    }
};
