const Discord = require("discord.js")
const db = require(`quick.db`)
module.exports = {
    commands: ['prostuff'],
    callback: (message, arguments, text) => {
        let userpfps = db.fetch(`pfps_${message.author.id}`) || ['None']
        let usertitles = db.fetch(`titles_${message.author.id}`) || ['None']
        let embed = new Discord.MessageEmbed()
        .setTitle("Your Profile Items Available")
        .addField("Profile Pictures", userpfps.join(` \n `))
        .addField("Profile Titles", usertitles.join(` \n `))
        .setColor("#60b0f4")
        .setThumbnail("https://i.ibb.co/F0hLvQt/newzerologo.png")
        message.reply({embeds: [embed]})
    },
    permissions: '',
    requiredRoles: [],
  }