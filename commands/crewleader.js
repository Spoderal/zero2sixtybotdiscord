const db = require("quick.db")
const Discord = require("discord.js")
module.exports = {
    commands: ['crewlb'],
    callback: (message, arguments, text, client) => {
    
        let money = db.all().filter(data => data.ID.startsWith(`rank`)).sort((a, b) => b.data - a.data)
        let emoji = "<:rank:890812436863672380>"
    money.length = 10;
    var finalLb = "";
    for (var i in money) {
      let name = money[i].ID.split('_')[1]
      
      finalLb += `**${money.indexOf(money[i])+1}. ${name}** - ${money[i].data} ${emoji}\n`;
    }
    const embed = new Discord.MessageEmbed()/*MessageEmbed*/
    .setTitle(`Crew Rank Leaderboard`)
    .setDescription(finalLb)
    message.channel.send({embeds: [embed]})
    
    

    },
    permissions: '',
    requiredRoles: [],
  }