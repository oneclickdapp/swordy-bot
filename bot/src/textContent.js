const DISCORD_SERVER_ERROR = 'Whoops... we had an internal issue'
const DISCORD_SUCCESS = `🤩 What fantastic NFTs you have!
I gave you some new roles. Head back to your server to use them. 👋 See ya`
const DISCORD_FAIL = `🤔 We couldn't find the relevant NFTs in your wallet. Contact us if you believe this is an error.`
const DISCORD_REPLY = `Please check your DMs`
const DISCORD_INITIAL_PROMPT = `👋 Hi there! Let's take a look at your NFTs.\n\nIn order to continue, you need to give permission to the Unlock Protocol Bot (community-maintained project by @pi0neerpat) to fetch your wallet address from CollabLand.
\n👇 Select your choice by clicking a button below`
const DISCORD_CHECKING_MESSAGE = `Searching...`

module.exports = {
  DISCORD_SERVER_ERROR,
  DISCORD_SUCCESS,
  DISCORD_FAIL,
  DISCORD_REPLY,
  DISCORD_INITIAL_PROMPT,
  DISCORD_CHECKING_MESSAGE,
}
