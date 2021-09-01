import { db } from './db'
import { checkWorthiness } from './token'

export const updateRoles = async ({ platformId, guildId }) => {
  console.log('updateRoles() ...')
  const user = await db.user.findFirst({ where: { platformId } })
  const { address: userAddress } = user

  const roles = await db.guild
    .findFirst({ where: { platformId: guildId } })
    .roles()
  await Promise.all(
    roles.map(async (role, index) => {
      console.log('Checking worthiness for role: ', role.name)
      const token = await db.token.findFirst({ where: { id: role.tokenId } })
      const isWorthy = await checkWorthiness({
        token,
        balance: role.balance,
        userAddress,
      })
      if (isWorthy) {
        console.log('User is worthy')
        await db.user.update({
          where: { platformId },
          data: {
            roles: { connect: { id: role.id } },
          },
        })
      } else {
        console.log('User is not worthy')
        try {
          await db.user.update({
            where: { platformId },
            data: {
              roles: { disconnect: { id: role.id } },
            },
          })
        } catch (e) {
          // TODO: remove need for try-catch here.
          // console.log(e)
        }
      }
    })
  )
}
