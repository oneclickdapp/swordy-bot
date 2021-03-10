import { db } from 'src/lib/db'

export const roles = () => {
  return db.role.findMany()
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
    // TODO: Add check for token type
    token = await db.token.create({
      data: {
        chainId,
        contractAddress,
        type: 'erc720',
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
