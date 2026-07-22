module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./__tests__/setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/setup.js'],
  testTimeout: 20000
};