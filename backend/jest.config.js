const path = require('path');

module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: [path.join(__dirname, '__tests__', 'setup.js')],
  testTimeout: 20000
};