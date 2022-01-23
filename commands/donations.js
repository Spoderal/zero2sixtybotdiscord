const {MessageActionRow, MessageButton, MessageEmbed, MessageCollector, MessageSelectMenu} = require('discord.js')
const db = require('quick.db')
module.exports = {
    commands: ['donate'],
    callback: async (message, arguments, text, client) => {

       let embed = new MessageEmbed()
       .setTitle("Donation Information")
       .addField("Perks", "• Donator role in the server\n• $1k * Donation amount\n• Thank you\n• Free C Tier Car")
       .setDescription("Donate to support the development of the bot\n\n[Join the support server](https://discord.gg/UCHPbXu7jn) to receive your rewards\n\n**Minimum $2 Donation**")
       .addField("Donation Links", "https://www.buymeacoffee.com/zero2sixty\n\nETH Address: 0xdaCFCf3D46e58F5FA8694cF6588015D401Fabb1B")
       .setColor("#60b0f4")

       message.channel.send({embeds: [embed]})
      
    },
    permissions: '',
    requiredRoles: [],
  }