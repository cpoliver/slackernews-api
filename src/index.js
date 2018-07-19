const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
    type Query {
      info: String!
      feed: [Link!]!
    }

    type Link {
        id: ID!,
        description: String!,
        url: String!,
    }
`;

const links = [
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Full-stack tutorial fro GraphQL',
    },
];

const resolvers = {
    Query: {
        info: () => 'This is the Slackernews API',
        feed: () => links,
    },
    Link: {
        id: root => root.id.toUpperCase(),
        description: root => root.description,
        url: root => root.url,
    },
};

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(() => console.log('Server is running on http://localhost:4000'));
