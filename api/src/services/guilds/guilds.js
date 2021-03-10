import { db } from 'src/lib/db'

export const guilds = () => {
  return db.guild.findMany()
}
