<h1 align="center">Welcome to unlock-protocol-discord-bot 👋</h1>
<p>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> A Discord bot which prompts the user to enter their DID, and creates a new challenge for them.

## Whats included

- **Discord bot** w/ docker container in `/bot`
- **API server** RedwoodJS API in `/api`
- **(incomplete) Frontend** RedwoodJS web app in `/web`

## Fork it & make your own

### Create a new Discord Bot

Create a new application at https://discord.com/developers. Don't worry about naming here.

Now in your app, navigate to "Bot" and create a bot. Choose a username and Icon for your bot here.

Leave "Bot Permissions" alone.

Copy the `TOKEN` which we will need for our node app.

Back in this package, copy `.template.env` to `.env` and add the `TOKEN` you just copied.

### Run locally

```bash
# Start the API service
yarn rw dev api

# Start the bot
cd bot && yarn start
```

### Add the bot to your server

In the Discord Application, in "General Information", copy the `CLIENT ID`. Insert it in this URL, and have the server administrator open it.

```
# Add the bot with role management permissions
https://discord.com/oauth2/authorize?client_id=<clientID>&scope=bot&permissions=268435456
```

### Going to Production - Heroku

1. Create a new Heroku app for this repo. Update the build configs to point to the `/packages/bot`.

2. Once deployed, head to the "Resources" tab, turn off the `web` Dyno, and turn on the `worker` Dyno. This Dyno is defined in the repo root `Procfile`.

3. Update the environment variables in "Settings" tab to reflect what you see in the `.env` here.

### Going to Production - Docker

If you've made changes to the bot, you'll need to generate a new Docker image.

```bash
# Build
docker build -t <your username>/unlock-protocol-discord-bot .

# Test it out
docker run -p 8080:8080 -d <your username>/unlock-protocol-discord-bot

# Publish it when ready!
```

When you're ready to host the container, clone this repo on your server and navigate to this package. If you published your own version, the update the image name in `docker-compose.yml`. Be sure to update your `.env` file on the new machine as well.

```bash
# Load the .env file
source .env

# Start in "detached" mode
docker-compose up -d
```

## Notes

- If you have permissions errors, try giving the bot a higher role. Bots can only give roles to members in a _lower position_ than their own highest role. See https://discord.com/developers/docs/topics/permissions#permission-hierarchy
- Helpful discord docs for making a "emoji-reaction" menu https://discordjs.guide/popular-topics/reactions.html#awaiting-reactions

## Author

👤 **Patrick Gallagher**

- Website: https://patrickgallagher.dev
  - Twitter: [@pi0neerpat](https://twitter.com/pi0neerpat)
  - GitHub: [@pi0neerpat](https://github.com/pi0neerpat)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
