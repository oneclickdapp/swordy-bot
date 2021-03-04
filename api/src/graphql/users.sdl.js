export const schema = gql`
  type User {
    id: String!
    address: String!
    discordHandle: String!
    authDetail: AuthDetail!
    nftsOwned: [Nft]!
    authDetailId: String!
  }

  type Query {
    users: [User!]!
    user(id: String!): User
  }

  input CreateUserInput {
    address: String!
    discordHandle: String!
    authDetailId: String!
  }

  input UpdateUserInput {
    address: String
    discordHandle: String
    authDetailId: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: String!, input: UpdateUserInput!): User!
    deleteUser(id: String!): User!
  }
`
