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
} = require('../textContent')

const UNLOCKED_ROLE_BASE = 'Unlocked-Holder'
const CHIEV_ROLE_BASE = 'one-snoo-club'

const checkNftAndAssignRoles = async ({ message, guildMember, guild }) => {
  await message.reply(DISCORD_APPROVE_CONSENT)
  const { nfts, error } = await apiMgr.getNfts(guildMember.id)
  if (error) return message.reply(error)
  console.log(nfts)
  if (!nfts) return message.reply(DISCORD_FAIL)
  await message.reply(DISCORD_SUCCESS_START)
  await Promise.all(
    nfts.map(async (nft) => {
      let roleName = `${UNLOCKED_ROLE_BASE}-${nft.chainId}`
      let unlockRole = guild.roles.cache.find((role) => role.name === roleName)
      // TODO: Handle non-existent roles better
      if (unlockRole) {
        guildMember.roles.add(unlockRole.id)
        await message.reply(DISCORD_SUCCESS_ACTION + `\`${roleName}\``)
      }
      console.log(`Role "${roleName}" does not exist for this guild.`)

      roleName = `${CHIEV_ROLE_BASE}-${nft.chainId}`
      console.log(roleName)
      unlockRole = guild.roles.cache.find((role) => role.name === roleName)
      // TODO: Handle non-existent roles better
      if (!unlockRole)
        return console.log(`Role "${roleName}" does not exist for this guild.`)
      guildMember.roles.add(unlockRole.id)
      await message.reply(DISCORD_SUCCESS_ACTION + `\`${roleName}\``)
    })
  )
  await message.reply(DISCORD_SUCCESS_FINISH)
}

const handleInvoke = async (message) => {
  // console.log(message)
  try {
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
  } catch (e) {
    console.log(e)
    message.reply(DISCORD_SERVER_ERROR)
  }
}

module.exports = { handleInvoke }
