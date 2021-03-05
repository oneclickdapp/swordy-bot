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
  DISCORD_INVALID_PERMISSIONS,
  DISCORD_ALREADY_HAVE_ROLE,
} = require('./textContent')

const UNLOCKED_ROLE_BASE = 'Unlocked-Holder'

discordClient.once('ready', async () => {
  console.log('Ready!')
})

const checkNftAndAssignRoles = async ({ message, guildMember, guild }) => {
  await message.reply(DISCORD_APPROVE_CONSENT)
  const { nfts, error } = await apiMgr.getNfts(guildMember.id)
  if (error) return message.reply(error)
  if (!nfts) return message.reply(DISCORD_FAIL)
  await Promise.all(
    nfts.map((nft) => {
      const roleName = `${UNLOCKED_ROLE_BASE}-${nft.chainId}`
      const role = guild.roles.cache.find((role) => role.name === roleName)
      // TODO: Handle non-existent roles better
      if (!role)
        return console.log(`Role "${roleName}" does not exist for this guild.`)
      guildMember.roles.add(role.id)
    })
  )
  await message.reply(DISCORD_SUCCESS)
}

discordClient.on('message', async (message) => {
  try {
    if (message.content === process.env.INVOCATION_STRING) {
      // console.log(message)

      const guild = message.guild
      const guildMember = message.member

      // Check bot is set up properly
      if (!message.guild.me.hasPermission(['MANAGE_ROLES']))
        return message.channel.send(DISCORD_INVALID_PERMISSIONS)

      // TODO: Remove/change after decisions are made re: role names
      // Check user already has role
      // const role = guild.roles.cache.find((role) => role.name === UNLOCKED_ROLE)
      // if (guildMember.roles.cache.has(role.id))
      //   return message.reply(`${DISCORD_ALREADY_HAVE_ROLE} "${UNLOCKED_ROLE}"`)

      // Tell user to check DMs
      message.reply(DISCORD_REPLY)

      // Start DM with user
      const sentMessage = await message.author.send(DISCORD_INITIAL_PROMPT)
      await sentMessage.react('❌')
      await sentMessage.react('✅')

      // Wait for Emoji reply
      const filter = (reaction, user) => {
        return (
          ['❌', '✅'].includes(reaction.emoji.name) &&
          user.id === message.author.id
        )
      }
      sentMessage
        .awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then((collected) => {
          const reaction = collected.first()
          if (reaction.emoji.name === '✅') {
            // Approved consent
            checkNftAndAssignRoles({
              message: sentMessage,
              guildMember,
              guild,
            })
          } else {
            // Denied consent
            sentMessage.reply(DISCORD_DENY_CONSENT)
          }
        })
        .catch((collected) => {
          console.log(collected)
          console.log(`Timeout for emoji response ${sentMessage.author}`)
          sentMessage.reply(DISCORD_CONSENT_TIMEOUT)
        })
    }
  } catch (e) {
    console.log(e)
    message.reply(DISCORD_SERVER_ERROR)
  }
})

discordClient.on('guildMemberUpdate', (oldMember, newMember) => {
  // If the role(s) are present on the old member object but no longer on the new one (i.e role(s) were removed)
  const removedRoles = oldMember.roles.cache.filter(
    (role) => !newMember.roles.cache.has(role.id)
  )
  if (removedRoles.size > 0)
    console.log(
      `The roles ${removedRoles.map((r) => r.name)} were removed from ${
        oldMember.displayName
      }.`
    )
  // If the role(s) are present on the new member object but are not on the old one (i.e role(s) were added)
  const addedRoles = newMember.roles.cache.filter(
    (role) => !oldMember.roles.cache.has(role.id)
  )
  if (addedRoles.size > 0)
    console.log(
      `The roles ${addedRoles.map((r) => r.name)} were added to ${
        oldMember.displayName
      }.`
    )
})

discordClient.login(process.env.DISCORD_TOKEN)
