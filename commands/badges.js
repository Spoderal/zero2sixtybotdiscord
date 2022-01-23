const db = require('quick.db')
const Discord = require('discord.js')
const cars = require('../cardb.json')
const badgedb = require('../badgedb.json')
module.exports = {
    commands: ['badges'],
    callback: (message, arguments, text, client) => {
        let user = message.mentions.users.first() || message.author
        let userid = user.id
        let badges = db.fetch(`badges_${message.author.id}`) || ['None']
        var userbadges = []
        var actbadge
        var badgearrayLength = badges.length;
    
for (var i = 0; i < badgearrayLength; i++) {
    actbadge = badges[i]
    userbadges.push(`${badgedb[actbadge.toLowerCase()].Emote} ${badgedb[actbadge.toLowerCase()].Name}`)
    //Do something
}
       let embed = new Discord.MessageEmbed()

       .setTitle(`${user.tag}'s Badges`)
       .setDescription(`${userbadges.join('\n\n')}`)
       .setColor("#60b0f4")

        message.channel.send({embeds: [embed]})
      },
    permissions: '',
    requiredRoles: [],
  }
