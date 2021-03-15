const PURCHASE_URL = `https://staging-app.unlock-protocol.com/checkout?paywallConfig={%22network%22:4,%22locks%22:{%220x2bc1Cf6a2BEb499d33f0C5E52363E49fb94e2E9a%22:{}},%22callToAction%22:{}}`

const DISCORD_SERVER_ERROR = `⛈️ Sorry, something went wrong.`
const DISCORD_SUCCESS_START = "Yup, you've got the right stuff!"
const DISCORD_SUCCESS_ACTION = '\n✨🗡️ I knight thee with '
const DISCORD_SUCCESS_FINISH = 'Now arise and head back to your guild'

const DISCORD_FAIL = `💼 Looks like you don't have the right NFTs in your wallet. Purchase one here: ${PURCHASE_URL}`
const DISCORD_REPLY = `You think you're worthy? Check your DMs`
const DISCORD_INITIAL_PROMPT = `⚔️ Ready to be knighted? \n\nTo continue, I need the following permissions:
\n-\`Fetch your wallet address from your CollabLand account\`
\n If you agree, click the ✅`
const DISCORD_ABOUT_BOT =
  '*Swordy is a community-maintained project by @pi0neerpat*'
const DISCORD_APPROVE_CONSENT = `Searching...`
const DISCORD_DENY_CONSENT = `Ok, no problem. Goodbye!`
const DISCORD_CONSENT_TIMEOUT = `👻 Ghosted! If you want to continue, you'll need to start over. In your server, type "${process.env.INVOCATION_STRING}"`
const DISCORD_INVALID_PERMISSIONS = `⛈️ Sorry, I'm powerless. Someone must have revoked my permission to manage roles.`
const DISCORD_ALREADY_HAVE_ROLE = `You already have the role `
const DISCORD_GUILD_DOESNT_HAVE_ROLE = `This role does not exist. Please create it first.`
const INVALID_ETHEREUM_ADDRESS = 'The ethereum address you provided is invalid.'
const ADMIN_PROPER_SYNTAX =
  'The proper syntax is: \n`<chain ID> <contract address> <required balance> <role rame> <purchase url (optional)>`\neg. `100 0x30D7b586F4fbd52ce164C1c204DD33BE49F53c7B 1 unlock-holder https://unlock-protocol.com/myNft`'
const DISCORD_CHECKING_ACCOUNT = 'Looking up your account, one moment...'

module.exports = {
  DISCORD_SERVER_ERROR,
  DISCORD_SUCCESS_START,
  DISCORD_SUCCESS_ACTION,
  DISCORD_SUCCESS_FINISH,
  DISCORD_FAIL,
  DISCORD_REPLY,
  DISCORD_INITIAL_PROMPT,
  DISCORD_ABOUT_BOT,
  DISCORD_APPROVE_CONSENT,
  DISCORD_DENY_CONSENT,
  DISCORD_CONSENT_TIMEOUT,
  DISCORD_INVALID_PERMISSIONS,
  DISCORD_ALREADY_HAVE_ROLE,
  DISCORD_GUILD_DOESNT_HAVE_ROLE,
  INVALID_ETHEREUM_ADDRESS,
  ADMIN_PROPER_SYNTAX,
  DISCORD_CHECKING_ACCOUNT,
}
