import jsdoc from 'eslint-plugin-jsdoc';

export default [
    {
        files: ['app.js'],
        plugins: { jsdoc },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'script'
        },
        rules: {
            'jsdoc/require-jsdoc': ['error', { require: { FunctionDeclaration: true } }],
            'jsdoc/require-description': 'error',
            'jsdoc/require-param': 'error',
            'jsdoc/require-param-type': 'error',
            'jsdoc/require-param-description': 'error',
            'jsdoc/require-returns': 'error',
            'jsdoc/require-returns-type': 'error',
            'jsdoc/check-tag-names': 'error',
            'jsdoc/check-types': 'error',
            'jsdoc/valid-types': 'error'
        }
    }
];