var config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['*.spec.js'],

    onPrepare: function() {
        browser.ignoreSynchronization = true;
    }

    capabilities: {
      'browserName': 'chrome'
    }
};

if (process.env.TRAVIS_BUILD_NUMBER) {

  delete config.seleniumAddress;

  config.capabilities['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER;
  config.capabilities.build = process.env.TRAVIS_BUILD_NUMBER;
  config.capabilities.name = 'Angular2Buch';
};


exports.config = config;
