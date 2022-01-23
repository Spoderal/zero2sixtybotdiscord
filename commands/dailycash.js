const Discord = require("discord.js")
const cars = require('../cardb.json')
const db = require('quick.db')
const ms = require('ms')


module.exports = {
    commands: ['daily'],
    callback: (message, arguments, text) => {
        let cash = 250
        let premiumMessage
        let daily = db.fetch(`daily_${message.author.id}`)
        let premium = db.fetch(`premium_${message.author.id}`)
        
        let timeout = 86400000;
     
        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));
            let timeEmbed = new Discord.MessageEmbed()
            .setColor("#60b0f4")
            .setDescription(`You've already collected your daily cash\n\nCollect it again in ${time}.`);
            message.channel.send({embeds: [timeEmbed]})
        }
        else{
            let time = ms(timeout - (Date.now() - daily));
        db.add(`cash_${message.author.id}`, cash)
        db.set(`daily_${message.author.id}`, Date.now())

        let embed = new Discord.MessageEmbed()
        .setTitle(`Daily Cash ${message.author.username}`)
        .addField("Earned Cash", `$${numberWithCommas(cash)}`)
        .setColor("#60b0f4")
        message.channel.send({embeds: [embed]})

        }

    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
