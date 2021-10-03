const db = require('quick.db')
const Discord = require('discord.js')
const crewicons = require('../crewicons.json')

module.exports = {
    commands: ['leavecrew'],
    callback: (message, arguments, text, client) => {

        let crew = db.fetch(`crew_${message.author.id}`)
        if(!db.includes(`${crew}_owner`)) return message.channel.send("That crew doesn't exist!")
        if(crew) {
            let crewowner = db.fetch(`${crew}_owner`)
            
            if(crewowner == message.author.tag) return message.channel.send("You're the owner of this crew, if you'd like to delete it, run z!deletecrew")
    
            db.subtract(`${crew}_membercount`, 1)
            message.channel.send(`You just left ${crew}`)
            db.set(`crew_${message.author.id}`, null)
            

        }
        else {
            return message.channel.send("You're not in a crew! Join one with z!joincrew")
        }



       
    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}