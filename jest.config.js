const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');
module.exports = {
    ...jestConfig,
    // add any custom configurations here
    moduleNameMapper: {
        '^lightning/button$': '<rootDir>/force-app/test/jest-mocks/lightning/button',//The first dash is converted to a forward slash and the rest of the component name goes from kebab to camel case. 
        //The reason for the forward slash is because the module resolver treats everything before the first dash as the namespace. 
        '^thunder/hammerButton$': '<rootDir>/force-app/test/jest-mocks/thunder/hammerButton',
        '^c/displayPanel$': '<rootDir>/force-app/test/jest-mocks/c/displayPanel',
      }
};