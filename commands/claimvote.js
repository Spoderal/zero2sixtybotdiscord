const db = require('quick.db')
const Discord = require('discord.js')
const cars = require('../cardb.json')
module.exports = {
    commands: ['claimvote'],
    callback: (message, arguments, text, client) => {
     
        let voted = db.fetch(`voted_${message.author.id}`)

        if(!voted) return message.channel.send("You haven't voted yet! Vote then run the command again.")

        db.add(`cash_${message.author.id}`, 1000)
        
        db.set(`voted_${message.author.id}`, false)

        message.channel.send("Thank you for voting! Here's $1k cash <3")
    },
    permissions: '',
    requiredRoles: [],
  }
