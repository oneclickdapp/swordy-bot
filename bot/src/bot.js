require('dotenv').config()
const Discord = require('discord.js')

const { handleInvoke } = require('./commands/invoke')
const { handleAdminUpdate } = require('./commands/admin')

const discordClient = new Discord.Client()

discordClient.once('ready', async () => {
  console.log('Ready!')
})

discordClient.on('message', async (message) => {
  if (process.env.INVOCATION_STRING.split(',').includes(message.content))
    handleInvoke(message)
  if (message.content.startsWith('!add-lock')) handleAdminUpdate(message)
})

discordClient.on('guildMemberUpdate', (oldMember, newMember) => {
  notifyMemberUpdate({ oldMember, newMember })
})

discordClient.login(process.env.DISCORD_TOKEN)
