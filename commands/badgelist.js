const db = require('quick.db')
const Discord = require('discord.js')
const cars = require('../cardb.json')
module.exports = {
    commands: ['badgelist'],
    callback: (message, arguments, text, client) => {
     
       let embed = new Discord.MessageEmbed()

       .setTitle(`Badges Available`)
       .setDescription(`**Car Collector** = *Own 10 cars*\n
       **Filthy Rich** = *Earn 1 million cash*\n
       **Time Master** = *Complete the time trial in under 20 seconds*\n
       **Drift King** = *Earn a drift level of 50 or more*\n
       **How?** = *Win a race in a Peel P50*\n
       **Race King** = *Win 100 races*\n
       **SECRET** = *SECRET*
       `)
        .setColor("#60b0f4")

        message.channel.send({embeds: [embed]})
      },
    permissions: '',
    requiredRoles: [],
  }
