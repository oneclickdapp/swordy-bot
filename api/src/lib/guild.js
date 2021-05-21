import { db } from './db'

const fetchGuild = async (data) => {
  const { platformId } = data
  let guild = await db.guild.findFirst({ where: platformId })
  if (!guild) {
    guild = await db.guild.create(data)
  }
  return guild
}
