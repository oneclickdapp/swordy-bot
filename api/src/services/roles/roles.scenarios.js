export const standard = defineScenario({
  role: {
    one: {
      name: 'String',
      platformId: 'String',
      balance: 'String',
      guild: { create: { platformId: 'String', name: 'String' } },
      token: {
        create: { chainId: 1044128, contractAddress: 'String', type: 'String' },
      },
    },

    two: {
      name: 'String',
      platformId: 'String',
      balance: 'String',
      guild: { create: { platformId: 'String', name: 'String' } },
      token: {
        create: { chainId: 9963793, contractAddress: 'String', type: 'String' },
      },
    },
  },
})
