const db = require('quick.db')
const Discord = require('discord.js')
const icons = require('../crewicons.json')
module.exports = {
    commands: ['claim'],
    callback: (message, arguments, text, client) => {
          let toclaim = arguments[0]
          if(!toclaim) return message.channel.send("Specify a reward to claim!")
          let crew = db.fetch(`crew_${message.author.id}`)
          if(!crew) return message.channel.send("You're not in a crew! Join one with z!joincrew [crew name]")
        
        let crews = db.fetch(`crewnames`)
        if(!crews.includes(crew)) return message.channel.send("That crew does not exist!")
        let claimed5 = db.fetch(`claimed5_${message.author.id}`)
        let claimed10 = db.fetch(`claimed10_${message.author.id}`)
        let claimed20 = db.fetch(`claimed20_${message.author.id}`)
        let claimed50 = db.fetch(`claimed50_${message.author.id}`)
        let claimed100 = db.fetch(`claimed100_${message.author.id}`)

        let createdAt = db.fetch(`${crew}_createdat`)
        let membercount = db.fetch(`${crew}_membercount`)
        let crewrank = db.fetch(`rank_${crew}`)
        let crewtickets= db.fetch(`ctickets_${crew}`)
        let crewowner = db.fetch(`${crew}_owner`)
        let crewicon = db.fetch(`${crew}_icon`)

        if(toclaim == "5") {
            if(crewrank >= 5) {
                if(claimed5 == true) return message.channel.send("You've already claimed this prize!")
                db.add(`cash_${message.author.id}`, 1000)
                message.channel.send("You just claimed $1,000!")
                db.set(`claimed5_${message.author.id}`, true)
            }
            else{
                message.channel.send("Your crew rank isn't high enough!")
            }
        }

        if(toclaim == "10") {
            if(crewrank >= 10) {
                if(claimed10 == true) return message.channel.send("You've already claimed this prize!")
                db.add(`cash_${message.author.id}`, 5000)
                message.channel.send("You just claimed $5,000!")
                db.set(`claimed10_${message.author.id}`, true)

            }
            else{
                message.channel.send("Your crew rank isn't high enough!")
            }
            
        }
        if(toclaim == "10") {
            if(crewrank >= 10) {
                if(claimed10 == true) return message.channel.send("You've already claimed this prize!")
                db.add(`cash_${message.author.id}`, 5000)
                message.channel.send("You just claimed $5,000!")
                db.set(`claimed10_${message.author.id}`, true)

            }
            else{
                message.channel.send("Your crew rank isn't high enough!")
            }
            
        }
        if(toclaim == "20") {
            if(crewrank >= 20) {
                if(claimed20 == true) return message.channel.send("You've already claimed this prize!")
                db.add(`cash_${message.author.id}`, 10000)
                message.channel.send("You just claimed $10,000!")
                db.set(`claimed20_${message.author.id}`, true)

            }
            else{
                message.channel.send("Your crew rank isn't high enough!")
            }
            
        }
        if(toclaim == "50") {
            if(crewrank >= 50) {
                if(claimed50 == true) return message.channel.send("You've already claimed this prize!")
                db.add(`cash_${message.author.id}`, 25000)
                message.channel.send("You just claimed $25,000!")
                db.set(`claimed50_${message.author.id}`, true)

            }
            else{
                message.channel.send("Your crew rank isn't high enough!")
            }
            
        }
        if(toclaim == "100") {
            if(crewrank >= 100) {
                if(claimed100 == true) return message.channel.send("You've already claimed this prize!")
                db.push(`cars_${message.author.id}`, `2018 McLaren Senna`)
                message.channel.send("You just claimed the 2018 McLaren Senna, Congratulations!")
                db.set(`claimed100_${message.author.id}`, true)

            }
            else{
                message.channel.send("Your crew rank isn't high enough!")
            }
            
        }
        


        




    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}