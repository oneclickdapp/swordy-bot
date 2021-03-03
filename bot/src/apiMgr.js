import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import fetch from 'cross-fetch'

import { SUBGRAPH_URLS } from './constants'

class ApiMgr {
  constructor({ url, network, debug }) {
    const cache = new InMemoryCache()
    const link = new HttpLink({
      uri: subgraphURL,
      fetch,
    })
    this.store = new ApolloClient({
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

  async saveRequest({ username, did, userId }) {
    if (!did) throw new Error('no did')
    if (!username) throw new Error('no discord handle')
    if (!userId) throw new Error('no user ID')

    let challengeCode = randomString(32)

    const data = {
      did,
      username,
      timestamp: Date.now(),
      challengeCode,
      userId,
    }
    try {
      await this.store.set(did, JSON.stringify(data))
      // console.log('Saved: ' + JSON.stringify(data))
    } catch (e) {
      console.log(e)
      throw new Error(`issue writing to the database for ${did}. ${e}`)
    }
    // await this.store.quit()
    return challengeCode
  }
}

module.exports = ApiMgr
