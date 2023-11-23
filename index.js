// Import ApolloServer from apollo-server
const { ApolloServer } = require("apollo-server");

// Import importSchema method from graphql-import
const { importSchema } = require("graphql-import");

// Import EtherDataSource class 
const EtherDataSource = require("./datasource/ethDatasource");

// Import schema from schema.graphql file
const typeDefs = importSchema("./schema.graphql");

// Load environment variables from .env file  
require("dotenv").config();

// Define resolvers
const resolvers = {
  Query: {
    // Get ether balance for an address    
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Get total ether supply
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Get latest ethereum price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Get block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    // Instantiate EtherDataSource
    ethDataSource: new EtherDataSource(),
  }),
});

// Set timeout to 0
server.timeout = 0;

// Start the server
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});

