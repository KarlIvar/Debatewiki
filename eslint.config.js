module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script'
    },
    rules: {
      'no-console': 'error'
    }
  },
  {
    files: ['test/**/*.js'],
    rules: {
      'no-console': 'off'
    }
  }
];
