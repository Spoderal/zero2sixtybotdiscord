const {MessageActionRow, MessageButton, MessageEmbed, MessageCollector, MessageSelectMenu} = require('discord.js')
const db = require('quick.db')
module.exports = {
    commands: ['races'],
    callback: async (message, arguments, text, client) => {

       let embed = new MessageEmbed()
       .setTitle("Race Types")
       .addField("Quarter Mile", "\`z!qm [tier] [car]\`\nTier 1 Reward: $150\nTier 2 Reward: $300\nTier 3 Reward: $350\nTier 4 Reward: $400", true)
       .addField("Half Mile", "\`z!hm [tier] [car]\`\nTier 1 Reward: $300\nTier 2 Reward: $400\nTier 3 Reward: $500\nTier 4 Reward: $600", true)
       .addField("Bot Race", "\`z!botrace [tier] [car]\`\nTier 1 Reward: $250\nTier 2 Reward: $500\nTier 3 Reward: $750\nTier 4 Reward: $1000\nTier 5 Reward: $1500", true)
       .addField("Squad Race", "\`z!squadrace [squad] [car]\`\nReward: $600", true)
       .addField("PVP Race", "\`z!race [user] [car]\`\nReward: $500", true)
       .addField("Cash Cup", "\`z!cashcup [car]\`\nReward: $50 * tier", true)
       .addField("Time Trial", "\`z!timetrial [car]\`\nReward: $100 - time", true)
       .addField("\u200b", "\u200b", true)

       .setThumbnail("https://i.ibb.co/z7wGh6r/Logo-Makr-1-Oe7-PA.png")

       .setColor("#60b0f4")

       message.channel.send({embeds: [embed]})
      
    },
    permissions: '',
    requiredRoles: [],
  }