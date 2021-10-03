const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    commands: ['botinfo', 'bot'],
    callback: (message, arguments, text, client) => {
       let bot = client.user
       let embed = new Discord.MessageEmbed()

       .setTitle(`Info for ${bot.username}`)
       .setThumbnail(bot.displayAvatarURL())
       .addField("The Numbers", `${client.guilds.cache.size} servers\n\n${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users\n\nCar Count: Estimated 48\n‎`)
       .setFooter("Created at " + bot.createdAt)



       message.channel.send(embed)
    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}