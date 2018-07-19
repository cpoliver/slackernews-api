module.exports = {
    extends: [
        'casumo/configurations/es6-node',
        'casumo/configurations/es6-test',
        'casumo/configurations/es6-browser',
        'prettier',
    ],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
    },
};
