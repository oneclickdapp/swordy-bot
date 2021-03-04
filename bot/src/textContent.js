const DISCORD_SERVER_ERROR = 'Whoops... we had an internal issue'
const DISCORD_SUCCESS = `🤩 What fantastic NFTs you have!
I gave you some new roles. Head back to your server to use them. 👋 See ya`
const DISCORD_FAIL = `🤔 We couldn't find the relevant NFTs in your wallet. Contact us if you believe this is an error https://twitter.com/pi0neerpat`
const DISCORD_REPLY = `Please check your DMs`
const DISCORD_INITIAL_PROMPT = `👋 Hi there! Let's take a look at your NFTs.\n\nIn order to continue, you need to give the following permissions to the Unlock Protocol Bot:
\n\`- Fetch your wallet address from your CollabLand account\`
\n*Unlock Protocol Bot is a community-maintained project by @pi0neerpat*
\nMake your choice by clicking a button:`
const DISCORD_APPROVE_CONSENT = `Searching...`
const DISCORD_DENY_CONSENT = `Ok, no problem. Goodbye!`
const DISCORD_CONSENT_TIMEOUT = `👻 Ghosted! If you'd like to continue, you'll need to start over.
In your server, type "${process.env.INVOCATION_STRING}"`

module.exports = {
  DISCORD_SERVER_ERROR,
  DISCORD_SUCCESS,
  DISCORD_FAIL,
  DISCORD_REPLY,
  DISCORD_INITIAL_PROMPT,
  DISCORD_APPROVE_CONSENT,
  DISCORD_DENY_CONSENT,
  DISCORD_CONSENT_TIMEOUT,
}
