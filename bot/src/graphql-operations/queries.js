const gql = require('graphql-tag')

const userByDiscordId = gql`
  query USER_BY_DISCORD_ID($discordId: String!) {
    userByDiscordId(discordId: $discordId) {
      id
      nftsOwned {
        id
        website
        contractAddress
        tokenId
        uri
        iconUrl
      }
    }
  }
`
module.exports = { userByDiscordId }
