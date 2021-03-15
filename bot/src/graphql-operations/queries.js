const gql = require('graphql-tag')

const userByDiscordId = gql`
  query USER_BY_DISCORD_ID($discordId: String!) {
    userByDiscordId(discordId: $discordId) {
      id
      nfts {
        website
        contractAddress
        tokenId
        uri
        chainId
        iconUrl
      }
    }
  }
`

const rolesByUserAndGuild = gql`
  query ROLES_BY_USER_AND_GUILD($guildId: String!, $platformId: String!) {
    rolesByUserAndGuild(guildId: $guildId, platformId: $platformId) {
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
        icon
      }
      isWorthy
    }
  }
`
module.exports = { userByDiscordId }
