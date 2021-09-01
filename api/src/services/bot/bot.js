import { handleMessage } from 'src/lib/bot/bot'

export const postMessage = async ({ input }) => {
  const response = await handleMessage(input)
  return response
}
