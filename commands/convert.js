const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    commands: ['convert'],
    callback: (message, arguments, text, client) => {
      let gold = arguments[0]
      let usergold = db.fetch(`gold_${message.author.id}`)
      if(gold > usergold) return message.channel.send("You don't have enough gold!")
      db.subtract(`gold_${message.author.id}`, gold)
      let final = gold * 700
      db.add(`cash_${message.author.id}`, final)
      message.reply(`Converted ${gold} gold into ${final} cash.`)

    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}