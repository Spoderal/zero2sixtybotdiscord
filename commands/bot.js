const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    commands: ['bot'],
    callback: (message, arguments, text, client) => {
       let bot = client.user
       let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);

       let embed = new Discord.MessageEmbed()

       .setTitle(`Info for ${bot.username}`)
       .setThumbnail(bot.displayAvatarURL())
       .addField("Stats", `🌎 ${client.guilds.cache.size} servers\n\n💙 ${numberWithCommas(client.guilds.cache.reduce((a, g) => a + g.memberCount, 0))} users\n\n🏓 Ping: ${Math.round(message.client.ws.ping)}ms\n\n📈 Uptime\n${days} days\n${hours} hours\n${minutes} minutes\n${seconds} seconds`, true)
       .addField("Version", "1.0.5", true)
       .addField("Links", `[DONATE](https://www.buymeacoffee.com/zero2sixty)\n\n[SERVER](https://discord.gg/SFrujkEs5A)\n\n[INVITE](https://discord.com/api/oauth2/authorize?client_id=844417164186091531&permissions=51200&scope=bot)`, true)
       .setFooter("Created at " + bot.createdAt)
        .setColor("#60b0f4")


       message.channel.send({embeds: [embed]})
    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}