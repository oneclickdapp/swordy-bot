export const schema = gql`
  type Nft {
    id: String
    website: String
    contractAddress: String
    tokenId: Int!
    uri: String!
    iconUrl: String
    owner: User
    chainId: Int!
    ownerAddress: String
  }

  type Query {
    nfts: [Nft!]!
    nft(id: String!): Nft
  }

  input CreateNftInput {
    website: String
    contractAddress: String
    tokenId: String!
    uri: String!
    iconUrl: String
    ownerAddress: String!
  }

  input UpdateNftInput {
    website: String
    contractAddress: String
    tokenId: String
    uri: String
    iconUrl: String
    ownerAddress: String
  }

  type Mutation {
    createNft(input: CreateNftInput!): Nft!
    updateNft(id: String!, input: UpdateNftInput!): Nft!
    deleteNft(id: String!): Nft!
  }
`
