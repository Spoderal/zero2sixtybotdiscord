const db = require("quick.db")
const Discord = require("discord.js")
module.exports = {
    commands: ['leaderboard'],
    callback: (message, arguments, text, client) => {
    
        let money = db.all().filter(data => data.ID.startsWith(`pvpwon`)).sort((a, b) => b.data - a.data)
        let emoji = "<:wins:873469726167289876>"
    money.length = 10;
    var finalLb = "";
    for (var i in money) {
      let name = client.users.fetch(money[i].ID.split('_')[1])
      
      finalLb += `**${money.indexOf(money[i])+1}. ${name}** - ${money[i].data} ${emoji}\n`;
    }
    const embed = new Discord.MessageEmbed()/*MessageEmbed*/
    .setTitle(`PVP Wins Leaderboard!`)
    .setDescription(finalLb)
    message.channel.send(embed);
    
    

    },
    permissions: '',
    requiredRoles: [],
  }