const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['updatelog'],
    description: 'New updates!',
    permissionError: '',
    
    callback: (message, arguments, text) => {
    
        let embed = new Discord.MessageEmbed()
        .setTitle(`New update! 8/7/21`)
        .addField("⬆️ New features", `
        • Championship races: z!championship\n
        • Changed modify command to upgrade\n
        • Changed part names to make it easier\n
        • New racing system!
     `)
        .addField("🏎 New Cars", `
        • 1997 Acura Integra\n
        • 2000 Acura NSX\n
        • 2022 Acura NSX Type S\n
       `)
        .setThumbnail('https://i.ibb.co/r4xwPj7/update.png')

        message.channel.send(embed)


    },
    permissions: '',
    requiredRoles: [],
  }
  