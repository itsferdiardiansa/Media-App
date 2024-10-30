const baseConfig = require('./jest.config.base.cjs');

module.exports = {
  ...baseConfig,
  projects: [
    {
      ...baseConfig,
      displayName: 'apps',
      testMatch: [
        '<rootDir>/apps/{clients,api}/*/*.spec.ts',
        '<rootDir>/apps/{clients,api}/*/__tests__/**/*.ts',
      ],
    },
    {
      ...baseConfig,
      displayName: 'packages',
      testMatch: [
        '<rootDir>/packages/*/*.spec.ts',
        '<rootDir>/packages/*/__tests__/**/*.ts',
        '<rootDir>/packages/*/src/__tests__/**/*.ts',
        '<rootDir>/packages/*/src/**/*.spec.ts',
      ],
    },
  ],
};
