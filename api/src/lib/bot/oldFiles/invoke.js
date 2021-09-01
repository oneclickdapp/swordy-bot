const ApiMgr = require('../apiMgr')

const apiMgr = new ApiMgr()

const {
  DISCORD_SERVER_ERROR,
  DISCORD_SUCCESS_START,
  DISCORD_SUCCESS_ACTION,
  DISCORD_SUCCESS_FINISH,
  DISCORD_INSUFFICIENT_BALANCE,
  DISCORD_REPLY,
  DISCORD_INITIAL_PROMPT,
  DISCORD_INITIAL_AUTH,
  DISCORD_GETTING_ROLES,
  DISCORD_DENY_CONSENT,
  DISCORD_TIMEOUT,
  DISCORD_INVALID_PERMISSIONS,
  DISCORD_ALREADY_HAVE_ROLE,
  DISCORD_CHECKING_ACCOUNT,
  DISCORD_CONTINUE_AUTH,
} = require('../textContent')
const {
  UNLOCKED_ROLE_BASE,
  CHIEV_ROLE_BASE,
  LOGIN_UR,
} = require('../constants')

const checkNftAndAssignRoles = async ({ message, guildMember, guild }) => {
  try {
    await message.reply(DISCORD_GETTING_ROLES)

    const { roles } = await apiMgr.getRolesByUserAndGuild({
      platformId: guildMember.id,
      guildId: guild.id,
    })
    // TODO: we need all role data, so we can have the URL for buying the token
    if (!roles.length) return message.reply(DISCORD_INSUFFICIENT_BALANCE)
    await message.reply(DISCORD_SUCCESS_START)
    await Promise.all(
      roles.map(async (role) => {
        // Check if the role still exists in the guild
        // TODO: Update guild earlier during the process
        // to avoid needing to do this
        const existingRole = guild.roles.cache.find(
          (guildRole) => guildRole.id === role.platformId
        )
        if (!existingRole) {
          return console.log(
            `Role "${role.name}" does not exist for this guild.`
          )
        }
        guildMember.roles.add(role.platformId)
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

const doCollabAuth = async ({ message, lastBotMessage }) => {
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
}

const doSwordyAuth = async ({ message, guildMember, guild }) => {
  // Create the user in the database
  const { id: userId } = await apiMgr.userByPlatformId({
    platformId: guildMember.id,
    platform: 'discord',
    guildId: guild.id,
  })
  const prompt = await message.reply(
    DISCORD_INITIAL_AUTH + LOGIN_URL + userId + DISCORD_CONTINUE_AUTH
  )
  await prompt.react('✅')
  const filter = (reaction, user) => {
    return ['✅'].includes(reaction.emoji.name)
  }
  prompt
    .awaitReactions(filter, { max: 1, time: 120000, errors: ['time'] })
    .then(() => {
      checkNftAndAssignRoles({
        message,
        guildMember,
        guild,
      })
    })
    .catch((collected) => {
      console.log(collected)
      console.log(`Timeout for emoji response ${message.author}`)
      message.reply(DISCORD_TIMEOUT)
    })
}

module.exports = { handleInvoke }
