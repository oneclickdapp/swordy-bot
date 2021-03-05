const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { HttpLink } = require('apollo-link-http')
const fetch = require('cross-fetch')
const { userByDiscordId } = require('./graphql-operations/queries')

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

  async getNfts(discordId) {
    if (!discordId) throw new Error('no discordId')
    let nfts = []
    try {
      const user = await this.client.query({
        query: userByDiscordId,
        variables: { discordId },
      })
      console.log(user)
    } catch (e) {
      console.log(e)
      return { error: e }
    }
    return nfts
  }
}

module.exports = ApiMgr
