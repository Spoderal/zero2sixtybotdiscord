const path = require('path')
const fs = require('fs')
const db = require('quick.db')
const badges = require('./badges')
const config = require('./config.json')


const { Client, Intents } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]})



client.on('ready', async () => {
  console.log('The client is ready!')
  client.user.setActivity(`New Bot || Racing in ${client.guilds.cache.size} servers`)
  const baseFile = 'command-base.js'
  const commandBase = require(`./commands/${baseFile}`)
  badges(client)

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file))
        commandBase(client, option)
      }
    }
  }


  
  
  readCommands('commands')
})


client.on("guildCreate", guild => {
  let channel = client.channels.cache.get("932464507954028625")
  channel.send(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  db.push(`guilds`, guild)
  db.add("serversgained", 1)
})

client.login(config.token)

