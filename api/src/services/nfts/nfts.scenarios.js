export const standard = defineScenario({
  nft: {
    one: {
      tokenId: 'String',
      owner: {
        create: {
          address: 'String9492383',
          authDetail: { create: { nonce: 'String' } },
        },
      },
    },

    two: {
      tokenId: 'String',
      owner: {
        create: {
          address: 'String6391091',
          authDetail: { create: { nonce: 'String' } },
        },
      },
    },
  },
})
