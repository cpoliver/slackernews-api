const feed = (root, args, context, info) => context.db.query.links({}, info);

module.exports = {
    feed,
};
