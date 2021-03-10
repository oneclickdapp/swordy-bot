import { db } from 'src/lib/db'

export const tokens = () => {
  return db.token.findMany()
}
