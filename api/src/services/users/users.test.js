import {
  users,
  user,
  createUser,
  userByDiscordId,
  updateUser,
  deleteUser,
} from './users'

describe('users', () => {
  scenario('returns a single user', async (scenario) => {
    const result = await user({ id: scenario.user.one.id })

    expect(result).toEqual(scenario.user.one)
  })
  scenario('returns a single user by discord handle', async (scenario) => {
    const result = await userByDiscordId({
      discordId: scenario.user.one.discordId,
    })

    expect(result).toEqual(scenario.user.one)
  })
})
