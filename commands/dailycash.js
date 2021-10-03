const Discord = require("discord.js")
const cars = require('../cardb.json')
const db = require('quick.db')
const ms = require('ms')


module.exports = {
    commands: ['daily'],
    callback: (message, arguments, text) => {
        let cash = 500
        let daily = db.fetch(`daily_${message.author.id}`)
        let timeout = 86400000;

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));
            let timeEmbed = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You've already collected your daily cash\n\nCollect it again in 24 hours.`);
            message.channel.send(timeEmbed)
        }
        else{
            let time = ms(timeout - (Date.now() - daily));
        db.add(`cash_${message.author.id}`, cash)
        db.set(`daily_${message.author.id}`, Date.now())

        let embed = new Discord.MessageEmbed()
        .setTitle(`Daily Cash ${message.author.username}`)
        .addField("Earned Cash", `${cash}`)
        message.channel.send(embed)
        }

    },
    permissions: '',
    requiredRoles: [],
  }