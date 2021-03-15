const gql = require('graphql-tag')

// Old way - deleteme
// const userByDiscordId = gql`
//   query USER_BY_DISCORD_ID($discordId: String!) {
//     userByDiscordId(discordId: $discordId) {
//       id
//       nfts {
//         website
//         contractAddress
//         tokenId
//         uri
//         chainId
//         iconUrl
//       }
//     }
//   }
// `

const haveUserAddress = gql`
  query HAVE_USER_ADDRESS($platformId: String!) {
    haveUserAddress(platformId: $platformId) {
      haveUserAddress
    }
  }
`
const userByPlatformId = gql`
  query USER($platformId: String!, $platform: String!) {
    userByPlatformId(platformId: $platformId, platform: $platform) {
      id
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
    }
  }
`
module.exports = { rolesByUserAndGuild, haveUserAddress, userByPlatformId }
