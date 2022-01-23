const db = require('quick.db')
const Discord = require('discord.js')
const cars = require('../cardb.json')
module.exports = {
    commands: ['gold'],
    callback: (message, arguments, text, client) => {
       let emote = "<:z_gold:925591755611590740>"
       let embed = new Discord.MessageEmbed()

       .setTitle(`Gold Pricing`)
       .setDescription(`**$3 USD = 10 ${emote} gold**\n
       **$6 USD = 25 ${emote} gold**\n
       **$12 USD = 60 ${emote} gold**\n
       **$25 USD = 100 ${emote} gold** *+ 25*\n
       **$35 USD = 150 ${emote} gold** *+ 30*\n
        *Gold can be converted into cash, 1 gold = 700 cash*
       `)
       .setFooter("You can also get gold via codes")
        .setColor("#60b0f4")

        message.channel.send({embeds: [embed]})
      },
    permissions: '',
    requiredRoles: [],
  }
