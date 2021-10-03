const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    commands: ['supshop'],
    callback: (message, arguments, text) => {
        let userid = message.author.id
        let cash = db.fetch(`cash_${userid}`)
        if(!cash || cash == null)  cash = 0;
        let embed = new Discord.MessageEmbed()
        .setTitle(`Support Shop`)
        .setDescription(`5,000 Cash - $3 Via PayPal\n10,000 Cash - $6 Via PayPal\n\nSupport the bot while getting something in return!`)
        .addField("Value Pack", "x1 Tier C car\n15k cash\nCustom role in server - $10 Via PayPal")
        .setColor("60b0f4")
        .setThumbnail('https://i.ibb.co/M6qbDjg/moeybag.png')
        .setFooter(`Your current balance: $${numberWithCommas(cash)}`)
        message.reply(embed)
    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}