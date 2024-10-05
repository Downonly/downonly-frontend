export const typeDefs = `#graphql 
  type Mint {
    id:               ID!
    jobState:         String
    surface:          String
    surfaceSmiley:    String
    obstacle:         String
    obstacleSmiley:   String
    figure:           String
    figureSmiley:     String
    openSea:          String
    ipfsMP3:          String
    ipfsJPG:          String
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
