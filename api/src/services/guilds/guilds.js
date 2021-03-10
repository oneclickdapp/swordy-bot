import { db } from 'src/lib/db'

export const guilds = () => {
  return db.guild.findMany()
}

export const createGuild = ({ input }) => {
  return db.guild.create({
    data: input,
  })
}
