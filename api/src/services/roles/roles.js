import { db } from 'src/lib/db'
import { checkWorthiness } from 'src/lib/token'

export const roles = () => {
  return db.role.findMany()
}

export const rolesByUserAndGuild = async ({ input }) => {
  const { platformId, guildId } = input
  const user = await db.user.findFirst({ where: { platformId } })
  const { address: userAddress } = user
  const roles = await db.guild.findFirst({ where: { guildId } }).roles()
  await Promise.all(
    roles.map(async (role, index) => {
      console.log(role.name)
      const token = await role.token()
      roles[index].isWorthy = await checkWorthiness({
        token,
        balance: role.balance,
        userAddress,
      })
    })
  )
  return roles
}

export const updateRoleByBot = async ({
  platform,
  guildPlatformId,
  guildName,
  guildDescription,
  guildIconUrl,
  roleName,
  rolePlatformId,
  roleDescription,
  balance,
  chainId,
  contractAddress,
  purchaseUrl,
}) => {
  // Create guild
  let guild = await db.guild.findOne({ where: { platformId: guildPlatformId } })
  if (!guild)
    guild = await db.guild.create({
      data: {
        platform,
        platformId: guildPlatformId,
        name: guildName,
        description: guildDescription,
        iconUrl: guildIconUrl,
      },
    })

  // Create token
  let token = await db.token.findFirst({
    where: {
      contractAddress,
      chainId,
    },
  })
  if (!token) {
    token = await db.token.create({
      data: {
        chainId,
        contractAddress,
        // TODO: Check contract for token type
        type: 'erc721',
      },
    })
  }
  // Create role
  let role = await db.role.findFirst({
    where: {
      platformId: rolePlatformId,
      guild: {
        platformId: guildPlatformId,
      },
    },
  })
  if (!role)
    role = await db.role.create({
      data: {
        platformId: rolePlatformId,
        name: roleName,
        guild: { connect: { platformId: guildPlatformId } },
        token: { connect: { id: token.id } },
        balance,
        purchaseUrl,
      },
    })
  return role
}
