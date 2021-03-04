import { db } from 'src/lib/db'

export const nfts = () => {
  return db.nft.findMany()
}

export const nft = ({ id }) => {
  return db.nft.findUnique({
    where: { id },
  })
}

export const createNft = ({ input }) => {
  return db.nft.create({
    data: input,
  })
}

export const updateNft = ({ id, input }) => {
  return db.nft.update({
    data: input,
    where: { id },
  })
}

export const deleteNft = ({ id }) => {
  return db.nft.delete({
    where: { id },
  })
}

export const Nft = {
  owner: (_obj, { root }) =>
    db.nft.findUnique({ where: { id: root.id } }).owner(),
}
