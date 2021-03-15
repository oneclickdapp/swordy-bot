import { db } from 'src/lib/db'
import { fetchCollabLandUserWallets } from 'src/lib/collabLand'
import { fetchUnlockProtocolNfts } from 'src/lib/unlockProtocol'
import { fetchChievNfts } from 'src/lib/chiev'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findOne({
    where: { id },
  })
}

export const haveUserAddress = async ({ platformId }) => {
  let haveUserAddress = false
  const userAddress = await db.user.findOne({ where: { platformId } }).address
  if (userAddress) haveUserAddress = true
  return { haveUserAddress }
}

export const userByDiscordId = async ({ discordId }) => {
  // DELETE ME only for testing purposes
  // await db.user.delete({
  //   where: { discordId },
  // })
  let user = await db.user.findOne({
    where: { discordId },
  })
  if (user) console.log(`User "${discordId}" found.`)
  if (!user) {
    console.log(`User "${discordId}" not found. Asking CollabLand...`)
    const wallets = await fetchCollabLandUserWallets(discordId)
    // TODO: throw error if no wallets?
    if (!wallets.length) throw Error('User is not signed up with Collab Land')

    // TODO: check multiple wallets
    const userAddress = wallets[0].address

    user = await db.user.create({
      data: { discordId, address: userAddress },
    })
  }

  // NOTE: NFT ownership data is ephemeral, so we should not store it in the database
  const nfts = await fetchUnlockProtocolNfts(user.address)
  const chievs = await fetchChievNfts(user.address)
  return { ...user, nfts: [...nfts, ...chievs] }
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
    db.user.findOne({ where: { id: root.id } }).authDetail(),
  nftsOwned: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).nftsOwned(),
}
