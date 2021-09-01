import { db } from 'src/lib/db'

import { LOGIN_URL, DISCORD_INITIAL_AUTH } from 'src/lib/bot/constants'

export const handleMessage = async ({
  content,
  platformUserId,
  platform,
  guildId,
}) => {
  // Create the user in the database
  const user = await db.user.upsert({
    where: { platformId: platformUserId },
    create: {
      platformId: platformUserId,
      platform,
      currentSessionGuild: {
        connect: { platformId: guildId },
      },
    },
    update: {
      currentSessionGuild: {
        connect: { platformId: guildId },
      },
    },
  })
  // Return the unique URL for the response
  return DISCORD_INITIAL_AUTH + LOGIN_URL + user.id
}
