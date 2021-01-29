module.exports = {
    root: true,
    extends: ['@react-native-community', 'prettier'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'react-native/no-inline-styles': 'off',
        'react/no-did-mount-set-state': 'off',
        'dot-notation': 'off',
        'handle-callback-err': 'off',
    },
};
