const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { HttpLink } = require('apollo-link-http')
const fetch = require('cross-fetch')
const {
  rolesByUserAndGuild,
  haveUserAddress,
  userByPlatformId,
} = require('./graphql-operations/queries')
const { updateRole } = require('./graphql-operations/mutations')

class ApiMgr {
  constructor() {
    const debug = true
    const cache = new InMemoryCache()
    const link = new HttpLink({
      uri: process.env.API_URL,
      fetch,
    })
    this.client = new ApolloClient({
      link,
      cache,
      onError: (e) => {
        debug && console.log(e)
      },
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only',
        },
      },
    })
  }

  async haveUserAddress({ platformId }) {
    try {
      const res = await this.client.query({
        query: haveUserAddress,
        variables: { platformId },
      })
      return res.data.haveUserAddress.haveUserAddress
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }

  async userByPlatformId({ platformId, platform, guildId }) {
    try {
      const res = await this.client.query({
        query: userByPlatformId,
        variables: { platformId, platform, guildId },
      })
      return res.data.userByPlatformId
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }

  async getRolesByUserAndGuild({ platformId, guildId }) {
    if (!guildId || !platformId) throw new Error('no platformId or guildId')
    try {
      // TODO: send all guild roles, so we can remove them from db if they were deleted
      const res = await this.client.query({
        query: rolesByUserAndGuild,
        variables: { platformId, guildId },
      })
      return { roles: res.data.rolesByUserAndGuild.roles }
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }

  async getNfts(discordId) {
    if (!discordId) throw new Error('no discordId')
    try {
      const user = await this.client.query({
        query: userByDiscordId,
        variables: { discordId },
      })
      return { nfts: user.data.userByDiscordId.nfts }
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }

  async updateRole(input) {
    try {
      await this.client.mutate({
        mutation: updateRole,
        variables: { ...input },
      })
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }
}

module.exports = ApiMgr
