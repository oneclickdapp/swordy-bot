import { db } from 'src/lib/db'
import { updateRoles } from 'src/lib/roles'

export const roles = () => {
  return db.role.findMany()
}

export const rolesByUserAndGuild = async ({ input }) => {
  await updateRoles(input)
  const { platformId, guildId } = input
  const user = await db.user.findFirst({ where: { platformId } })
  await db.user.update({
    where: { platformId },
    data: {
      guilds: {
        connect: {
          platformId: guildId,
        },
      },
    },
  })
  const roles = await db.user.findFirst({ where: { platformId } }).roles()
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

export const Role = {
  token: (_obj, { root }) =>
    db.role.findOne({ where: { id: root.id } }).token(),
}
