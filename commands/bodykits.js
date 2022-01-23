const db = require('quick.db')
const Discord = require('discord.js')
const cars = require('../cardb.json')
module.exports = {
    commands: ['bodykits'],
    callback: (message, arguments, text, client) => {
     
       let embed = new Discord.MessageEmbed()

       .setTitle(`Body kits`)
       .addField("Eligible Cars", `${cars.Cars["2019 subaru brz"].Emote} 2019 Subaru BRZ\n
       ${cars.Cars["2002 mazda rx7 fd"].Emote} 2002 Mazda RX7 FD\n
       ${cars.Cars["2008 nissan 350z"].Emote} 2008 Nissan 350Z\n
       ${cars.Cars["1989 nissan silvia s13"].Emote} 1989 Nissan Silvia S13\n
       ${cars.Cars["1990 nissan 240sx"].Emote} 1990 Nissan 240SX`)
        .setColor("#60b0f4")

        message.channel.send({embeds: [embed]})
      },
    permissions: '',
    requiredRoles: [],
  }
