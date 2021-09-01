const PURCHASE_URL = `https://staging-app.unlock-protocol.com/checkout?paywallConfig={%22network%22:4,%22locks%22:{%220x2bc1Cf6a2BEb499d33f0C5E52363E49fb94e2E9a%22:{}},%22callToAction%22:{}}`

const DISCORD_SERVER_ERROR = `⛈️ Sorry, something went wrong.`
const DISCORD_SUCCESS_START = "Yup, you've got the right stuff!"
const DISCORD_SUCCESS_ACTION = '\n✨🗡️ I knight thee with '
const DISCORD_SUCCESS_FINISH = 'Now arise and head back to your guild'

const DISCORD_INSUFFICIENT_BALANCE = `🏳️ Looks like you don't have the right tokens in your wallet.\n`
const DISCORD_INITIAL_PROMPT = `⚔️ Ready to be knighted? \n\nTo continue, I need the following permissions:
\n-\`Fetch your wallet address from your CollabLand account\`
\n If you agree, click the ✅`
const DISCORD_INITIAL_AUTH = `⚔️ Ready to be knighted? \n\nJust one more thing I need from you:
\n-\`Ethereum wallet address\`
\n Click the link to login using your wallet:\n`
const DISCORD_ABOUT_BOT =
  '*Swordy is a community-maintained project by @pi0neerpat*'
const DISCORD_GETTING_ROLES = `Loading roles...`
const DISCORD_DENY_CONSENT = `Ok, no problem. Goodbye!`
const DISCORD_TIMEOUT = `👻 Ghosted! If you want to continue, you'll need to start over.`
const DISCORD_INVALID_PERMISSIONS = `⛈️ Sorry, I'm powerless. Someone must have revoked my permission to manage roles.`
const DISCORD_ALREADY_HAVE_ROLE = `You already have the role `
const DISCORD_GUILD_DOESNT_HAVE_ROLE = `This role does not exist. Please create it first.`
const INVALID_ETHEREUM_ADDRESS = 'The ethereum address you provided is invalid.'
const ADMIN_PROPER_SYNTAX =
  'The proper syntax is: \n`<chain ID> <contract address> <required balance> <role rame> <purchase url (optional)>`\neg. `100 0x30D7b586F4fbd52ce164C1c204DD33BE49F53c7B 1 unlock-holder https://unlock-protocol.com/myNft`'
const DISCORD_NO_DM_INVOCATION = 'Sorry, you can only do that from a server'
const DISCORD_CONTINUE_AUTH =
  "\n\nAfter you're done, click the ✅ emoji to continue."

module.exports = {
  DISCORD_SERVER_ERROR,
  DISCORD_SUCCESS_START,
  DISCORD_SUCCESS_ACTION,
  DISCORD_SUCCESS_FINISH,
  DISCORD_INSUFFICIENT_BALANCE,
  DISCORD_REPLY,
  DISCORD_INITIAL_PROMPT,
  DISCORD_INITIAL_AUTH,
  DISCORD_ABOUT_BOT,
  DISCORD_GETTING_ROLES,
  DISCORD_DENY_CONSENT,
  DISCORD_TIMEOUT,
  DISCORD_INVALID_PERMISSIONS,
  DISCORD_ALREADY_HAVE_ROLE,
  DISCORD_GUILD_DOESNT_HAVE_ROLE,
  INVALID_ETHEREUM_ADDRESS,
  ADMIN_PROPER_SYNTAX,
  DISCORD_CHECKING_ACCOUNT,
  DISCORD_NO_DM_INVOCATION,
  DISCORD_CONTINUE_AUTH,
}
