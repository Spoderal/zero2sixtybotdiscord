const db = require("quick.db")
const discord = require('discord.js')
module.exports = {
    commands: ['start'],
    callback: (message, arguments, text) => {
        let userid = message.author.id
        let cash = db.fetch(`cash_${userid}`)
        let created = db.fetch(`created_${userid}`)
        if(created) return message.reply("You have an account!")
        let embed = new discord.MessageEmbed()
        .setTitle("Started!")
        .setDescription("To start you'll need to look at the dealer (run the dealership command) and pick a first car, take this $500 and go buy something nice.")
        .setColor("#60b0f4")
        .setThumbnail("https://i.ibb.co/jLMDGcw/Logo-Makr-5m-X00i.png")
        message.reply({embeds: [embed]})
        db.set(`created_${userid}`, true)
        db.add(`cash_${userid}`, 500)
        db.set(`cars_${userid}`, [])
        db.set(`parts_${userid}`, [])
        db.set(`badges_${userid}`, [])
    },
    permissions: '',
    requiredRoles: [],
  }