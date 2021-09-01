const {
  DISCORD_INVALID_PERMISSIONS,
  DISCORD_GUILD_DOESNT_HAVE_ROLE,
} = require('../textContent')

const getRoleFromName = ({ name, guild }) => {
  const role = guild.roles.cache.find((role) => role.name === name)
  if (!role)
    throw Error(`#The role \`${name}\` doesn't exist. Please create it first.`)
  return role
}

module.exports = { verifyInstall, getRoleFromName }
