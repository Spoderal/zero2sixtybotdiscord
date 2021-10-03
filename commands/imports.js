const Discord = require("discord.js")
const cars = require('../cardb.json')

module.exports = {
    commands: ['importcrates', 'imports'],
    callback: (message, arguments, text) => {
        
      let embed = new Discord.MessageEmbed()
      .setTitle("Import Crates")
      .addFields({name: "​", value: "Common Import Crate: $25000\nRare Import Crate : $50000"})
      .setDescription("Get some cars that are NOT normal...")
      .setThumbnail('https://i.ibb.co/CMSW4Nz/imports.png')
      .setColor('#9B00B8')
      message.channel.send(embed)
    },
    permissions: '',
    requiredRoles: [],
  }