const DISCORD_SERVER_ERROR = `⛈️ Sorry, something went wrong.`
const DISCORD_SUCCESS = `Success! 🤩  You have some awesome NFTs, so I gave you a new role. Enjoy!`
const DISCORD_FAIL = `🤔 I couldn't find the relevant NFTs in your wallet. If you believe this is an error, contact us: https://twitter.com/pi0neerpat`
const DISCORD_REPLY = `Please check your DMs`
const DISCORD_INITIAL_PROMPT = `👋 Hi there! Let's take a look at your NFTs.\n\nIn order to continue, you need to give the following permissions to the Unlock Protocol Bot:
\n\`- Fetch your wallet address from your CollabLand account\`
\n*Unlock Protocol Bot is a community-maintained project by @pi0neerpat*
\nMake your choice by clicking a button:`
const DISCORD_APPROVE_CONSENT = `Searching...`
const DISCORD_DENY_CONSENT = `Ok, no problem. Goodbye!`
const DISCORD_CONSENT_TIMEOUT = `👻 Ghosted! If you want to continue, you'll need to start over. In your server, type "${process.env.INVOCATION_STRING}"`
const DISCORD_INVALID_PERMISSIONS = `⛈️ Sorry, I'm powerless. The admin must give me permission to manage roles.`
const DISCORD_ALREADY_HAVE_ROLE = `👍 You already have the role `

module.exports = {
  DISCORD_SERVER_ERROR,
  DISCORD_SUCCESS,
  DISCORD_FAIL,
  DISCORD_REPLY,
  DISCORD_INITIAL_PROMPT,
  DISCORD_APPROVE_CONSENT,
  DISCORD_DENY_CONSENT,
  DISCORD_CONSENT_TIMEOUT,
  DISCORD_INVALID_PERMISSIONS,
  DISCORD_ALREADY_HAVE_ROLE,
}
