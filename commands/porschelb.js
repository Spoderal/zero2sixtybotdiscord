const db = require("quick.db")
const Discord = require("discord.js")
module.exports = {
    commands: ['porschelb'],
    callback: async (message, arguments, text, client) => {
    
        let money = db.all().filter(data => data.ID.startsWith(`porschewon`)).sort((a, b) => b.data - a.data)
        let emoji = "<:z_wins:910434575098994698>"
    money.length = 10;
    var finalLb = "";
    for (var i in money) {
      let name = await client.users.fetch(money[i].ID.split('_')[1])
      let tag = name.tag
      finalLb += `**${money.indexOf(money[i])+1}.** ${tag} - **${money[i].data}** ${emoji}\n`;
    }
    const embed = new Discord.MessageEmbed()/*MessageEmbed*/
    .setTitle(`Porsche Wins Leaderboard!`)
    .setDescription(finalLb)
    .setColor("#60b0f4")
    .setThumbnail("https://i.ibb.co/vVzbxmM/Logo-Makr-22.png")
    message.channel.send({embeds: [embed]})
    
    

    },
    permissions: '',
    requiredRoles: [],
  }