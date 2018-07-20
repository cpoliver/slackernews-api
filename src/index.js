const R = require('ramda');
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const resolvers = require('./resolvers');

const server = new GraphQLServer({
    resolvers,
    typeDefs: './src/schema.graphql',
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
