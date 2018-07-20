const R = require('ramda');
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const resolvers = {
    Query: {
        info: () => 'This is the Slackernews API',
        feed: (root, args, context, info) => context.db.query.links({}, info),
    },
    Mutation: {
        post: (root, args, context, info) =>
            context.db.mutation.createLink(
                {
                    data: {
                        url: args.url,
                        description: args.description,
                    },
                },
                info,
            ),
    },
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: R.assoc(
        'db',
        new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://eu1.prisma.sh/charlie-oliver-3fc193/database/dev',
            secret: 'mysupercerealsecret',
            debug: true,
        }),
    ),
});

server.start(() => console.log('Server is running on http://localhost:4000'));
