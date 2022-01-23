const Discord = require("discord.js")
const cars = require('../cardb.json')

module.exports = {
    commands: ['crates', 'crateshop'],
    callback: (message, arguments, text) => {
        
      let embed = new Discord.MessageEmbed()
      .setTitle("Crates")
      .addFields({name: "Profile Items:", value: "Common : $500\nRare : $800\nSeasonal: $1000"})
      .setDescription("The items in these crates give no advantages, they just make your profile look nice.")
      .setThumbnail('https://i.ibb.co/qMt3yb1/Logo-Makr-8-J2-Y1a.png')
      .setColor('#60b0f4')
      message.channel.send({embeds: [embed]})
    },
    permissions: '',
    requiredRoles: [],
  }