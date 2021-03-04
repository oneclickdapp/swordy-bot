const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { HttpLink } = require('apollo-link-http')
const fetch = require('cross-fetch')

const DEFAULT_URL = 'http://localhost:8911/api/graphql'

class ApiMgr {
  constructor() {
    const url = DEFAULT_URL
    const debug = true
    const cache = new InMemoryCache()
    const link = new HttpLink({
      uri: url,
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
      const ownedNfts = await this.client
    } catch (e) {
      console.log(e)
      return { error: e }
    }
    return nfts
  }
}

module.exports = ApiMgr
