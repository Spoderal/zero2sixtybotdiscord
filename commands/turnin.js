const db = require("quick.db")
const Discord = require('discord.js')
module.exports = {
    commands: ['turnin'],
    callback: (message, arguments, text) => {

        let toturnin = arguments[0]
        let crew = db.fetch(`crew_${message.author.id}`)
        let emoji = "<:rank:890812436863672380>"
        let tickets = db.fetch(`tickets_${message.author.id}`)
        let crewtickets= db.fetch(`ctickets_${crew}`)
        if(!crew) return message.channel.send("You're not in a crew, join one with z!joincrew [crew name]!")
        if(!toturnin) return message.channel.send("Specify how many tokens you'd like to turn in!")
        if(isNaN(toturnin)) return message.channel.send("Specify a number!")
        let crewrank = db.fetch(`rank_${crew}`)

        if(toturnin > tickets) return message.channel.send("You don't have that many tickets!")
        else{
            
            db.add(`ctickets_${crew}`, toturnin)
            message.channel.send(`You just gave ${crew} ${toturnin} tickets!`)
            if(crewtickets >= 25){
                message.channel.send(`${emoji} Your crew just ranked up! The tickets have been reset, keep on racing!`)
                db.add(`rank_${crew}`, 1)
                db.set(`ctickets_${crew}`, 0)
            }
        }



    },
    permissions: '',
    requiredRoles: [],
  }