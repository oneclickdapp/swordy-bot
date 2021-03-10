export const schema = gql`
  type Token {
    id: String!
    chainId: String!
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
    chainId: String!
    contractAddress: String!
    type: String!
    tokenId: Int
    uri: String
    website: String
    iconUrl: String
    purchaseUrl: String
  }

  input UpdateTokenInput {
    chainId: String
    contractAddress: String
    type: String
    tokenId: Int
    uri: String
    website: String
    iconUrl: String
    purchaseUrl: String
  }
`
