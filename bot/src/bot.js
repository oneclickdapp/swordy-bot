require('dotenv').config()
const Discord = require('discord.js')
const fetch = require('node-fetch')
const ApiMgr = require('./apiMgr')

const discordClient = new Discord.Client()
const apiMgr = new ApiMgr()

const {
  DISCORD_SERVER_ERROR,
  DISCORD_SUCCESS,
  DISCORD_FAIL,
  DISCORD_REPLY,
  DISCORD_INITIAL_PROMPT,
  DISCORD_CHECKING_MESSAGE,
} = require('./textContent')

discordClient.once('ready', async () => {
  console.log('Ready!')
})

discordClient.on('message', async (message) => {
  /////////////////////////////
  // DIRECT MESSAGE
  /////////////////////////////
  if (message.channel.type === 'dm') {
    // const { username: handle, discriminator, id: userId } = message.author
    // if (handle === '3box-verifications-v2') return
    // const username = `${handle}#${discriminator}`
    // const challengeCode = await apiMgr.saveRequest({
    //   did,
    //   username,
    //   userId,
    // })
    // message.channel.send(`${DISCORD_CHALLENGE_SUCCESS} \`${challengeCode}\``)
    /////////////////////////////
    // INVOCATION IN PULIC CHANNEL
    /////////////////////////////
  } else if (message.content === process.env.INVOCATION_STRING) {
    // console.log(message);
    message.reply(DISCORD_REPLY)
    const sentMessage = await message.author.send(DISCORD_INITIAL_PROMPT)
    await sentMessage.react('❌')
    // Order matters :)
    await sentMessage.react('✅')
    const filter = (reaction, user) => {
      return (
        ['❌', '✅'].includes(reaction.emoji.name) &&
        user.id === message.author.id
      )
    }
    // APPROVED CONSENT
    sentMessage
      .awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      .then((collected) => {
        const reaction = collected.first()
        if (reaction.emoji.name === '✅') {
          checkNftAndAssignRoles(sentMessage, message.author.id)
        } else {
          sentMessage.reply('Ok, no problem. Goodbye!')
        }
      })
      .catch((collected) => {
        console.log(`Timeout for emoji response ${sentMessage.author}`)
        // TODO: Add message if user doesn't react? Probably don't want to bother them
        // sentMessage.reply(
        //   'you did not reacted with neither a thumbs up, nor a thumbs down.'
        // )
      })
  }
})

const checkNftAndAssignRoles = async (message) => {
  await message.reply(DISCORD_CHECKING_MESSAGE)
  // const nfts = await apiMgr.getNfts(message.author.id)
  await message.reply(DISCORD_SUCCESS)
}

discordClient.login(process.env.DISCORD_TOKEN)
