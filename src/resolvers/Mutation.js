const R = require('ramda');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { APP_SECRET, getAuthedUserId } = require('../utils');

const userPayload = user => ({
    user,
    token: jwt.sign({ userId: user.id }, APP_SECRET),
});

const signup = async (root, args, context) => {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.db.mutation.createUser(
        {
            data: R.assoc('password', password, args),
        },
        `{ id }`,
    );

    return userPayload(user);
};

const login = async (root, args, context) => {
    const user = await context.db.query.user(
        {
            where: { email: args.email },
        },
        `{ id password }`,
    );
    const isValid = await bcrypt.compare(args.password, user.password);

    if (!isValid) throw new Error('Invalid username/password combination');

    return userPayload(user);
};

const post = (root, args, context, info) =>
    context.db.mutation.createLink(
        {
            data: {
                url: args.url,
                description: args.description,
                postedBy: {
                    connect: { id: getAuthedUserId(context) },
                },
            },
        },
        info,
    );

module.exports = {
    signup,
    login,
    post,
};
