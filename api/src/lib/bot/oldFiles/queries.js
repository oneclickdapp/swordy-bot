const gql = require('graphql-tag')

const POST_MESSAGE_QUERY = gql`
  query POST_MESSAGE_QUERY(
    $content: String!
    $platformUserId: String!
    $platform: String!
    $guildId: String!
  ) {
    haveUserAddress(
      content: $content
      platformUserId: $platformUserId
      platform: $platform
      guildId: $guildId
    ) {
      response
    }
  }
`
/////////////////////////////////
// TODO: Move to API or delete
const haveUserAddress = gql`
  query HAVE_USER_ADDRESS($platformId: String!) {
    haveUserAddress(platformId: $platformId) {
      haveUserAddress
    }
  }
`

const rolesByUserAndGuild = gql`
  query ROLES_BY_USER_AND_GUILD($guildId: String!, $platformId: String!) {
    rolesByUserAndGuild(input: { guildId: $guildId, platformId: $platformId }) {
      id
      name
      description
      purchaseUrl
      balance
      token {
        chainId
        contractAddress
        type
        website
        iconUrl
      }
      isWorthy
      platformId
    }
  }
`
module.exports = { rolesByUserAndGuild, haveUserAddress, POST_MESSAGE_QUERY }
