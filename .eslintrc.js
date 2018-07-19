module.exports = {
    extends: ['casumo/configurations/es6-node', 'casumo/configurations/es6-test', 'casumo/configurations/es6-browser'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
        'comma-dangle': 'off',
    },
};
