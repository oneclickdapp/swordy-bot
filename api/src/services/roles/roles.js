import { db } from 'src/lib/db'

export const roles = () => {
  return db.role.findMany()
}
