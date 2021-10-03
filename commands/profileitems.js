const Discord = require("discord.js")
const db = require(`quick.db`)
module.exports = {
    commands: ['profileitems'],
    callback: (message, arguments, text) => {
        let userpfps = db.fetch(`pfps_${message.author.id}`) || 'None'
        let usertitles = db.fetch(`titles_${message.author.id}`) || 'None'
        let embed = new Discord.MessageEmbed()
        .setTitle("Your Profile Items Available")
        .setDescription(`**Profile Pictures**:\n${userpfps.join(` \n `)}\n**Titles:\n${usertitles.join(` \n `)}**`)

        message.reply(embed)
    },
    permissions: '',
    requiredRoles: [],
  }