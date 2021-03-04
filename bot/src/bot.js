require('dotenv').config()
const Discord = require('discord.js')
const fetch = require('node-fetch')
const ApiMgr = require('./apiMgr')

const discordClient = new Discord.Client()
const apiMgr = new ApiMgr()

const DISCORD_SERVER_ERROR = 'Whoops... we had an internal issue'
const DISCORD_CHALLENGE_SUCCESS = 'Great! Your challenge code is: '
const DISCORD_INVALID_DID =
  "Oops! That doesn't look right. It looks like this: `did:key:z6MkkyAkqY9bPr8gyQGuJTwQvzk8nsfywHCH4jyM1CgTq4KA`"
const DISCORD_REPLY = `Please check your DMs`
const DISCORD_INITIAL_PROMPT = `Hi there! Lets get you verified. Reply with your did. It should look similar to this example: \`did:key:z6MkkyAkqY9bPr8gyQGuJTwQvzk8nsfywHCH4jyM1CgTq4KA\``

discordClient.once('ready', async () => {
  console.log('Ready!')
})

discordClient.on('message', async (message) => {
  /////////////////////////////
  // VERIFICATION IN DIRECT MESSAGE
  /////////////////////////////
  console.log(message)
  if (message.channel.type === 'dm') {
    const { username: handle, discriminator, id: userId } = message.author
    if (handle === '3box-verifications-v2') return
    const username = `${handle}#${discriminator}`

    let did
    try {
      did = message.content.match(/did:key:[a-zA-z0-9]{48}/)[0]
    } catch (e) {
      if (!did) return message.channel.send(DISCORD_INVALID_DID)
    }

    const challengeCode = await apiMgr.saveRequest({
      did,
      username,
      userId,
    })

    message.channel.send(`${DISCORD_CHALLENGE_SUCCESS} \`${challengeCode}\``)

    /////////////////////////////
    // INVOCATION IN PULIC CHANNEL
    /////////////////////////////
  } else if (message.content === process.env.INVOCATION_STRING) {
    // console.log(message);
    message.reply(DISCORD_REPLY)
    message.author.send(DISCORD_INITIAL_PROMPT)
  }
})

discordClient.login(process.env.DISCORD_TOKEN)
