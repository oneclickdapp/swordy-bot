import { guilds } from './guilds'

describe('guilds', () => {
  scenario('returns all guilds', async (scenario) => {
    const result = await guilds()

    expect(result.length).toEqual(Object.keys(scenario.guild).length)
  })
})
