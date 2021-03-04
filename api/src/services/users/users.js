import { db } from 'src/lib/db'
import { fetchCollabLandUserWallets } from 'src/lib/collabLand'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const userByDiscordId = async ({ discordId }) => {
  // DELETE ME
  await db.user.delete({
    where: { discordId },
  })
  let user = await db.user.findUnique({
    where: { discordId },
  })
  if (user) console.log(`User "${discordId}" found.`)
  if (!user) {
    console.log(`User "${discordId}" not found. Asking CollabLand...`)
    const wallets = await fetchCollabLandUserWallets(discordId)
    if (!wallets) throw Error('User is not signed up with Collab Land')
    // TODO: check multiple wallets
    const userAddress = wallets[0].address

    user = await db.user.create({
      data: { discordId, address: userAddress },
    })
  }
  return user
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  authDetail: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).authDetail(),
  nftsOwned: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).nftsOwned(),
}
