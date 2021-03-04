import gql from 'graphql-tag'

export const userByDiscordId = gql`
  query USER_BY_DISCORD_ID($discordId: String) {
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
