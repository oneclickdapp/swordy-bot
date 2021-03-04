import fetch from 'node-fetch'

const URL_COLLAB_LAND_AUTH =
  'https://api-qa.collab.land/client-applications/login-as-user?ttl=500'
const URL_COLLAB_LAND_USER_WALLETS =
  'https://api-qa.collab.land/account/wallets'

export const fetchCollabLandUserWallets = async (discordId) => {
  // Auth session
  const response = await fetch(URL_COLLAB_LAND_AUTH, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-client-id': process.env.COLLAB_LAND_APP_ID,
      'x-client-secret': process.env.COLLAB_LAND_APP_SECRET,
    },
    body: JSON.stringify({ id: discordId, platform: 'discord' }),
  })
  const json = await response.json()
  const jwt = json.message

  // Get wallet details
  const response2 = await fetch(URL_COLLAB_LAND_USER_WALLETS, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-run-as-token': jwt,
    },
  })
  const json2 = await response2.json()
  const wallets = json2.items
  return wallets
}
