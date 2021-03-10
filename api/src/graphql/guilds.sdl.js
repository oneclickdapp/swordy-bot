export const schema = gql`
  type Guild {
    platformId: String!
    platform: String!
    name: String!
    description: String
    roles: [Role]!
    users: [User]!
  }

  type Query {
    guilds: [Guild!]!
  }

  input CreateGuildInput {
    platformId: String!
    platform: String!
    name: String!
    description: String
  }

  input UpdateGuildInput {
    platformId: String
    platform: String
    name: String
    description: String
  }
`
