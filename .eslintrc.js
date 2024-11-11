module.exports = {
  root: true,
  extends: [
    'plugin:react-native/all',
    'prettier',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
},