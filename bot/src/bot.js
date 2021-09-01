require('dotenv').config()
const Discord = require('discord.js')

const { handleAdminUpdate } = require('./commands/admin')
const { notifyMemberUpdate } = require('./commands/notifications')
const { DISCORD_NO_DM_INVOCATION } = require('./textContent')
const ApiMgr = require('../apiMgr')

const apiMgr = new ApiMgr()
const discordClient = new Discord.Client()

const handleInvoke = async (message) => {
  console.log(`New invocation from ${message.author.id}`)
  try {
    // Verify the bot still has role-granting priveledges
    if (!message.guild.me.hasPermission(['MANAGE_ROLES']))
      return message.channel.send(DISCORD_INVALID_PERMISSIONS)

    const { text, url, type } = await postMessage({ message })
    if (responseType === 'reply') message.reply(text)
    // TODO: Add embed response type
    // TODO: Add DM message response type
  } catch (e) {
    console.log(e)
    message.reply(DISCORD_SERVER_ERROR)
  }
}

discordClient.once('ready', async () => {
  console.log('Ready!')
})

discordClient.on('message', async (message) => {
  if (process.env.INVOCATION_STRING.split(',').includes(message.content)) {
    if (message.channel.type == 'dm') {
      // Direct messaging the bot won't work - we must know the Guild ID
      return message.reply(DISCORD_NO_DM_INVOCATION)
    }
    handleInvoke(message)
  }
})

// TODO: Remove if unused
discordClient.on('guildMemberUpdate', (oldMember, newMember) => {
  notifyMemberUpdate({ oldMember, newMember })
})

discordClient.login(process.env.DISCORD_TOKEN)
