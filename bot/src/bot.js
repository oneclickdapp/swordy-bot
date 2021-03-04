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
  DISCORD_APPROVE_CONSENT,
  DISCORD_DENY_CONSENT,
  DISCORD_CONSENT_TIMEOUT,
} = require('./textContent')

discordClient.once('ready', async () => {
  console.log('Ready!')
})

discordClient.on('message', async (message) => {
  if (message.content === process.env.INVOCATION_STRING) {
    // console.log(message);
    message.reply(DISCORD_REPLY)
    const sentMessage = await message.author.send(DISCORD_INITIAL_PROMPT)
    await sentMessage.react('❌')
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
          sentMessage.reply(DISCORD_DENY_CONSENT)
        }
      })
      .catch((collected) => {
        console.log(`Timeout for emoji response ${sentMessage.author}`)
        sentMessage.reply(DISCORD_CONSENT_TIMEOUT)
      })
  }
})

const checkNftAndAssignRoles = async (message, authorId) => {
  await message.reply(DISCORD_APPROVE_CONSENT)
  const { nfts, error } = await apiMgr.getNfts(authorId)
  if (error) return message.reply(error)
  if (!nfts) return message.reply(DISCORD_FAIL)
  // TODO: assign roles in server
  await message.reply(DISCORD_SUCCESS)
}

discordClient.login(process.env.DISCORD_TOKEN)
