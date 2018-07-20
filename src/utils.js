const jwt = require('jsonwebtoken');

const APP_SECRET = 'anothersupercerealsecret';

const getAuthedUserId = context => {
    const Authorization = context.request.get('Authorization');

    if (!Authorization) throw new Error('not authenticated');

    const token = Authorization.replace('Bearer', '');

    return jwt.verify(token, APP_SECRET).userId;
};

module.exports = {
    APP_SECRET,
    getAuthedUserId,
};
