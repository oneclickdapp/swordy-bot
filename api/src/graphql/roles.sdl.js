export const schema = gql`
  type Role {
    id: String!
    guild: Guild!
    name: String!
    platformId: String!
    description: String
    token: Token!
    balance: String!
    users: [User]!
    guildPlatformId: String!
    tokenId: String!
  }

  type Query {
    roles: [Role!]!
    rolesByUserAndGuild(input: rolesByUserAndGuildInput): [Role!]!
  }

  input rolesByUserAndGuildInput {
    guildId: String
    platformId: String
  }

  type Mutation {
    updateRoleByBot(
      platform: String!
      guildPlatformId: String!
      guildName: String!
      guildDescription: String
      guildIconUrl: String!
      roleName: String!
      rolePlatformId: String!
      roleDescription: String
      balance: String!
      chainId: String!
      contractAddress: String!
      purchaseUrl: String!
    ): Role!
  }

  input CreateRoleInput {
    name: String!
    platformId: String!
    description: String
    balance: String!
    guildPlatformId: String!
    tokenId: String!
  }

  input UpdateRoleInput {
    name: String
    platformId: String
    description: String
    balance: String
    guildPlatformId: String
    tokenId: String
  }
`
