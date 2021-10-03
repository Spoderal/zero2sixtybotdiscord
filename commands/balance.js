const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    commands: ['balance', 'bal'],
    callback: (message, arguments, text) => {
        let userid = message.author.id
        let cash = db.fetch(`cash_${userid}`)
        let tickets = db.fetch(`tickets_${userid}`)
        if(!cash || cash == null)  cash = 0;
        if(!tickets || tickets == null) {
          tickets = 0 
          db.set(`tickets_${userid}`, 0)

        }
        let embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username}'s Balance 🏦`)
        .setDescription(`💵 Cash: $${numberWithCommas(cash)}\n🎟️ Tickets: ${numberWithCommas(tickets)}`)
        .setColor("GREEN")
        .setThumbnail('https://i.ibb.co/svLmJWw/cash.png')

        message.reply(embed)
    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}