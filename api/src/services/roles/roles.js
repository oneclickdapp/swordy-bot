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
  let token = await db.token.findOne({
    where: {
      contractAddress,
      chainId,
    },
  })
  if (!token) {
    // TODO: Add check for token type
    token = await sb.token.create({
      data: {
        chainId,
        contractAddress,
        type: 'erc720',
      },
    })
  }
  // Create role
  return db.role.findMany()
}
