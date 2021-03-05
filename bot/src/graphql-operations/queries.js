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
module.exports = { userByDiscordId }
