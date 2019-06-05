module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'mocha': true
  },
  "overrides": {
    "files": ["*test.js"],
    "rules": {
      "handle-callback-err": "off"
    }
  },
  'extends': 'standard',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
  }
}
