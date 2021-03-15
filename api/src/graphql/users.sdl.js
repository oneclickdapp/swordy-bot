export const schema = gql`
  type User {
    id: String!
    address: String
    platformId: String!
    platform: String!
    authDetail: AuthDetail
    guild: [Guild!]!
    roles: [Role!]!
  }

  type HaveUserAddress {
    haveUserAddress: Boolean!
  }

  type LimitedScopeUser {
    id: String
  }

  type Query {
    users: [User!]!
    user(id: String!): User
    haveUserAddress(platformId: String!): HaveUserAddress
    userByPlatformId(platformId: String!, platform: String!): LimitedScopeUser
    userByDiscordId(discordId: String!): User
  }

  input CreateUserInput {
    address: String
    platformId: String!
    platform: String!
    authDetailId: String
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
