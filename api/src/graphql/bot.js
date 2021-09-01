export const schema = gql`
  type Response {
    response: String!
  }
  type Query {
    postMessage(
      content: String!
      platformUserId: String!
      platform: String!
      guildId: String!
    ): Response!
  }
`
