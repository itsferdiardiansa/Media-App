module.exports = {
  'apps/*/src/**/*.{js,ts}': [
    'pnpm run lint',
    'pnpm run format',
    'pnpm run test'
  ],
  'packages/**/*.{js,ts}': [
    'pnpm run lint',
    'pnpm run format',
    'pnpm run test'
  ]
}