const Discord = require("discord.js")
const cars = require('../cardb.json')

module.exports = {
    commands: ['crates', 'crateshop'],
    callback: (message, arguments, text) => {
        
      let embed = new Discord.MessageEmbed()
      .setTitle("William's Crates")
      .addFields({name: "Profile Items:", value: "Common : $500\nRare : $800\nSeasonal: $1000"})
      .setDescription("The items in these crates give no advantages, they just make your profile look nice.")
      .setThumbnail('https://i.ibb.co/frnhy0Z/crates.png')
      .setColor('#9B00B8')
      message.channel.send(embed)
    },
    permissions: '',
    requiredRoles: [],
  }