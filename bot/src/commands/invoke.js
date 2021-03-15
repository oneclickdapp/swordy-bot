const fetch = require('node-fetch')

const ApiMgr = require('../apiMgr')

const apiMgr = new ApiMgr()

const {
  DISCORD_SERVER_ERROR,
  DISCORD_SUCCESS_START,
  DISCORD_SUCCESS_ACTION,
  DISCORD_SUCCESS_FINISH,
  DISCORD_FAIL,
  DISCORD_REPLY,
  DISCORD_INITIAL_PROMPT,
  DISCORD_APPROVE_CONSENT,
  DISCORD_DENY_CONSENT,
  DISCORD_CONSENT_TIMEOUT,
  DISCORD_INVALID_PERMISSIONS,
  DISCORD_ALREADY_HAVE_ROLE,
  DISCORD_CHECKING_ACCOUNT,
} = require('../textContent')

const UNLOCKED_ROLE_BASE = 'Unlocked-Holder'
const CHIEV_ROLE_BASE = 'one-snoo-club'

const checkNftAndAssignRoles = async ({ message, guildMember, guild }) => {
  try {
    await message.reply(DISCORD_APPROVE_CONSENT)

    const roles = await apiMgr.getRolesByUserAndGuild({
      platformId: guildMember.id,
      guildId: guild.id,
    })
    if (!roles) return message.reply(DISCORD_FAIL)

    await message.reply(DISCORD_SUCCESS_START)
    await Promise.all(
      roles.map(async (role) => {
        if (!role.isWorthy) return
        // Check if the role still exists in the guild
        const existingRole = guild.roles.cache.find(
          (guildRole) => guildRole.id === role.platformId
        )
        if (!existingRole)
          // TODO: Update guild earlier during the process
          // to avoid the need for this
          return console.log(
            `Role "${role.name}" does not exist for this guild.`
          )

        guildMember.roles.add(role.id)
        await message.reply(DISCORD_SUCCESS_ACTION + `\`${role.name}\``)
      })
    )
    await message.reply(DISCORD_SUCCESS_FINISH)
  } catch (e) {
    console.log(e)
    if (e.message.startsWith('#')) {
      // User error, so reply with message
      message.reply(e.message.slice(1))
      return message.channel.send(ADMIN_PROPER_SYNTAX)
    }
    message.reply(DISCORD_SERVER_ERROR)
  }
}

const handleInvoke = async (message) => {
  // console.log(message)
  try {
    const guild = message.guild
    const guildMember = message.member

    // Check bot is set up properly
    if (!message.guild.me.hasPermission(['MANAGE_ROLES']))
      return message.channel.send(DISCORD_INVALID_PERMISSIONS)

    // Tell user to check DMs
    message.reply(DISCORD_REPLY)

    // Start DM with user
    let lastBotMessage = await message.author.send(DISCORD_CHECKING_ACCOUNT)

    const haveUserAddress = await apiMgr.haveUserAddress({
      platformId: message.author.id,
    })
    if (haveUserAddress)
      return checkNftAndAssignRoles({
        message: lastBotMessage,
        guildMember,
        guild,
      })
    // Otherwise do auth flow

    // Start DM with user
    lastBotMessage = await message.author.send(DISCORD_INITIAL_PROMPT)
    await lastBotMessage.react('❌')
    await lastBotMessage.react('✅')

    // Wait for Emoji reply
    const filter = (reaction, user) => {
      return (
        ['❌', '✅'].includes(reaction.emoji.name) &&
        user.id === message.author.id
      )
    }
    lastBotMessage
      .awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      .then((collected) => {
        const reaction = collected.first()
        if (reaction.emoji.name === '✅') {
          // Approved consent
          checkNftAndAssignRoles({
            message: lastBotMessage,
            guildMember,
            guild,
          })
        } else {
          // Denied consent
          lastBotMessage.reply(DISCORD_DENY_CONSENT)
        }
      })
      .catch((collected) => {
        console.log(collected)
        console.log(`Timeout for emoji response ${sentMessage.author}`)
        lastBotMessage.reply(DISCORD_CONSENT_TIMEOUT)
      })
  } catch (e) {
    console.log(e)
    message.reply(DISCORD_SERVER_ERROR)
  }
}

module.exports = { handleInvoke }
