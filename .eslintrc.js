module.exports = {
    'env': {
        'es6': true,
        'node': true
    },
    'extends': ['eslint:recommended'],
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'rules': {
        'indent': ['error'],
        'semi': ['error', 'never'],
        'quotes': ['error', 'single']
    }
}
