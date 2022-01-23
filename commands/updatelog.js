const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['updatelog'],
    description: 'New updates!',
    permissionError: '',
    
    callback: (message, arguments, text) => {
    
        let embed = new Discord.MessageEmbed()
        .setTitle(`New Update!`)
        .addField("⬆️ Features", `• Race types have been moved from z!help to z!races\n
        • Drag races, quarter mile and half mile\n
        • Ferrari and Dodge emote refreshed\n
        • Donation perks command \`z!donate\` \n
        • Moved engines into the parts inventory \n
        `)
        .addField("🏎 New Cars", `
        • <:nissan:886481608054566993> 2002 Nissan Skyline R34\n
        • <:koenigsegg:929301357184294962> 2018 Koenigsegg Agera\n

        
       `)
        .setFooter("1/08/2022")
        .setImage('https://i.ibb.co/HNcT8Wj/sixtyupdate.png')
        .setColor("#60b0f4")
        message.channel.send({embeds: [embed]})


    },
    permissions: '',
    requiredRoles: [],
  }
  