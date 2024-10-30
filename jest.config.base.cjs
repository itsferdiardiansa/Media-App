module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  coverageDirectory: '<rootDir>/coverage',
  
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/coverage/',
    '<rootDir>/jest.config.js',
    '<rootDir>/eslint.config.js',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/',
    '/jest.config.js',
    '/eslint.config.js',
  ],
  
  transformIgnorePatterns: [
    '/node_modules/(?!(MODULE_NAME_1|MODULE_NAME_2)/)',
  ],

  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock image imports
  },
}
