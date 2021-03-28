const fetch = require('node-fetch')
const ApiMgr = require('../apiMgr')
const apiMgr = new ApiMgr()

const {
  DISCORD_SERVER_ERROR,
  DISCORD_INVALID_PERMISSIONS,
  INVALID_ETHEREUM_ADDRESS,
  ADMIN_PROPER_SYNTAX,
} = require('../textContent')

const INVALID_NUMBER_OF_PARAMETERS = 'Invalid number of parameters'

const { verifyInstall, getRoleFromName } = require('./common')

const parseParams = ({ text }) => {
  // !eg. add-lock 0xabc1 100 "role name" url-for-buying"
  const initialParams = text.split(' ').slice(0, 2)
  const role = text.split('"')[1]
  if (initialParams.length < 4 || !role)
    throw Error('#' + INVALID_NUMBER_OF_PARAMETERS)
  const purchaseUrl = text.split('"')[2]
  const [_, chainId, contractAddress, balance] = initialParams
  if (!chainId.match(/^[0-9]+$/)) throw Error('#' + 'Invalid chain ID')
  if (!contractAddress.match(/^0x[0-9a-fA-F]{40}$/))
    throw Error('#' + INVALID_ETHEREUM_ADDRESS)
  if (!balance.match(/^[0-9\.]+$/)) throw Error('#' + 'Invalid balance')
  return { chainId, contractAddress, balance, roleName, purchaseUrl }
}

const handleAdminUpdate = async (message) => {
  try {
    const platform = 'discord'
    const guild = message.guild
    const guildPlatformId = guild.id
    const guildName = guild.name
    const guildDescription = guild.description
    const guildIconUrl = guild.iconURL()

    // Validate parameters
    const {
      contractAddress,
      chainId,
      roleName,
      balance,
      purchaseUrl,
    } = parseParams({
      text: message.content,
    })

    // Check bot has proper permissions
    verifyInstall(guild)

    // Check if role exists on server
    const role = getRoleFromName({ name: roleName, guild })

    // Update the backend
    await apiMgr.updateRole({
      platform,
      guildPlatformId,
      guildName,
      guildDescription,
      guildIconUrl,
      roleName: roleName,
      rolePlatformId: role.id,
      roleDescription: '', // maybe unnecessary
      balance,
      chainId,
      contractAddress,
      purchaseUrl,
    })

    // Respond with success message
    message.react('👌')
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

module.exports = { handleAdminUpdate }
