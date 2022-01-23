const Discord = require("discord.js")
const cars = require('../cardb.json')

module.exports = {
    commands: ['importcrates', 'imports'],
    callback: (message, arguments, text) => {
        
      let embed = new Discord.MessageEmbed()
      .setTitle("Import Crates")
      .addFields({name: "​", value: "Common Import Crate: $25000\nRare Import Crate : $50000"})
      .setDescription("Get some cars that are NOT normal...")
      .setThumbnail('https://i.ibb.co/vs3Gm1H/Logo-Makr-2hu-VKG.png')
      .setColor('#60b0f4')
      message.channel.send({embeds: [embed]})
    },
    permissions: '',
    requiredRoles: [],
  }