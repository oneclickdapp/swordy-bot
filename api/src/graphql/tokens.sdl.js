export const schema = gql`
  type Token {
    id: String!
    chainId: Int!
    contractAddress: String!
    type: String!
    tokenId: Int
    uri: String
    website: String
    iconUrl: String
    purchaseUrl: String
    Role: [Role]!
  }

  type Query {
    tokens: [Token!]!
  }

  input CreateTokenInput {
    chainId: Int!
    contractAddress: String!
    type: String!
    tokenId: Int
    uri: String
    website: String
    iconUrl: String
    purchaseUrl: String
  }

  input UpdateTokenInput {
    chainId: Int
    contractAddress: String
    type: String
    tokenId: Int
    uri: String
    website: String
    iconUrl: String
    purchaseUrl: String
  }
`
