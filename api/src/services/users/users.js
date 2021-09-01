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

  return { id: user.id }
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
