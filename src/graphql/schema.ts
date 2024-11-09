export const typeDefs = `#graphql 
  type Mint {
    id:               ID!
    jobState:         String
    surface:          String
    obstacle:         String
    figure:           String
    openSea:          String
    ipfsMP3:          String
    ipfsJPEG:         String
    ipfsMP4:          String
    ipfsGLB:          String
    mintprice:        String
    fullname:         String
    mintdate:         String
    buyerAddress:     String
    buytxHash:        String
    blockHeight:      Number
  }

  type Query {
    mint(id: ID!): Mint 
    mints: [Mint]
  }
`
