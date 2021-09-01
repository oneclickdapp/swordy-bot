const gql = require('graphql-tag')

/////////////////////////////////
// TODO: Move to API or delete

const GET_OR_CREATE_USER_MUTATION = gql`
  query USER($platformId: String!, $platform: String!, $guildId: String) {
    getOrCreateUser(
      platformId: $platformId
      platform: $platform
      guildId: $guildId
    ) {
      id
    }
  }
`

const updateRole = gql`
  mutation UPDATE_ROLE_BY_BOT(
    $platform: String!
    $guildPlatformId: String!
    $guildName: String!
    $guildDescription: String
    $guildIconUrl: String!
    $roleName: String!
    $rolePlatformId: String!
    $roleDescription: String
    $balance: String!
    $chainId: String!
    $contractAddress: String!
    $purchaseUrl: String!
  ) {
    updateRoleByBot(
      platform: $platform
      guildPlatformId: $guildPlatformId
      guildName: $guildName
      guildDescription: $guildDescription
      guildIconUrl: $guildIconUrl
      roleName: $roleName
      rolePlatformId: $rolePlatformId
      roleDescription: $roleDescription
      balance: $balance
      chainId: $chainId
      contractAddress: $contractAddress
      purchaseUrl: $purchaseUrl
    ) {
      id
    }
  }
`
module.exports = { updateRole, GET_OR_CREATE_USER_MUTATION }
