import { db } from 'src/lib/db'
import { fetchCollabLandUserWallets } from 'src/lib/collabLand'
import { fetchUnlockProtocolNfts } from 'src/lib/unlockProtocol'
import { fetchChievNfts } from 'src/lib/chiev'
import { requireAuth } from 'src/lib/auth'

export const users = () => {
  throw new Error('Unauthorized')
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findOne({
    where: { id },
  })
}

export const loginSuccess = async ({ ephemeralId }) => {
  // TODO: Get user ephemeralId from JWT auth

  // Remove the ephemeralId from the user
  const user = await db.user.update({
    where: { ephemeralId },
    data: {
      ephemeralId: null,
    },
  })

  const { platformId, platform } = temporaryUser
  // Merge the temporary user with the current one
  let user = await db.user.update({
    where: { id: context.currentUser.id },
    data: { platform, platformId },
  })

  return { id: user.id }
}

export const haveUserAddress = async ({ platformId }) => {
  let haveUserAddress = false
  const user = await db.user.findOne({ where: { platformId } })
  const userAddress = user?.address
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
  throw new Error('Unauthorized')
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  throw new Error('Unauthorized')
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  throw new Error('Unauthorized')
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  authDetail: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).authDetail(),
  nftsOwned: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).nftsOwned(),
  currentSessionGuild: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).currentSessionGuild(),
  roles: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).roles(),
}
