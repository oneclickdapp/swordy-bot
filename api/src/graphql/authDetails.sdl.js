export const schema = gql`
  type AuthDetail {
    id: String!
    nonce: String!
    timestamp: DateTime!
    User: [User]!
  }

  type Query {
    authDetails: [AuthDetail!]!
    authDetail(id: String!): AuthDetail
  }

  input CreateAuthDetailInput {
    nonce: String!
    timestamp: DateTime!
  }

  input UpdateAuthDetailInput {
    nonce: String
    timestamp: DateTime
  }

  type Mutation {
    createAuthDetail(input: CreateAuthDetailInput!): AuthDetail!
    updateAuthDetail(id: String!, input: UpdateAuthDetailInput!): AuthDetail!
    deleteAuthDetail(id: String!): AuthDetail!
  }
`
