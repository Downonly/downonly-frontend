export const typeDefs = `#graphql 
  type Mint {
    id:            ID!
    jobState:      String
    surface:       String
    obstacle:      String
    figure:        String
    ipfsVideo:     String
    openSea:       String
    ipfsSound:     String
    fullname:      String
    mintdate:      String
  }

  type Query {
    mint(id: ID!): Mint 
    mints: [Mint]
  }
`
