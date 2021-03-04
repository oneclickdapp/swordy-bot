import { db } from 'src/lib/db'

export const authDetails = () => {
  return db.authDetail.findMany()
}

export const authDetail = ({ id }) => {
  return db.authDetail.findUnique({
    where: { id },
  })
}

export const createAuthDetail = ({ input }) => {
  return db.authDetail.create({
    data: input,
  })
}

export const updateAuthDetail = ({ id, input }) => {
  return db.authDetail.update({
    data: input,
    where: { id },
  })
}

export const deleteAuthDetail = ({ id }) => {
  return db.authDetail.delete({
    where: { id },
  })
}

export const AuthDetail = {
  User: (_obj, { root }) =>
    db.authDetail.findUnique({ where: { id: root.id } }).User(),
}
