import { db } from './db'
import { checkWorthiness } from './token'

export const updateRoles = async ({ platformId, guildId }) => {
  const user = await db.user.findFirst({ where: { platformId } })
  const { address: userAddress } = user

  const roles = await db.guild
    .findFirst({ where: { platformId: guildId } })
    .roles()
  await Promise.all(
    roles.map(async (role, index) => {
      const token = await db.token.findFirst({ where: { id: role.tokenId } })
      const isWorthy = await checkWorthiness({
        token,
        balance: role.balance,
        userAddress,
      })
      if (isWorthy) {
        await db.user.update({
          where: { platformId },
          data: {
            roles: { connect: { id: role.id } },
          },
        })
      } else {
        await db.user.update({
          where: { platformId },
          data: {
            roles: { disconnect: { id: role.id } },
          },
        })
      }
    })
  )
}
