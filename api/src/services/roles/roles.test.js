import { roles } from './roles'

describe('roles', () => {
  scenario('returns all roles', async (scenario) => {
    const result = await roles()

    expect(result.length).toEqual(Object.keys(scenario.role).length)
  })
})
