const db = require('quick.db')
const Discord = require('discord.js')
const icons = require('../crewicons.json')
module.exports = {
    commands: ['crew'],
    callback: (message, arguments, text, client) => {
        let crewname = arguments.join(' ')
        if(!crewname){
          let crew = db.fetch(`crew_${message.author.id}`)
          if(!crew) return message.channel.send("You're not in a crew! Join one with z!joincrew [crew name]")
          crewname = crew
        }
        let crews = db.fetch(`crewnames`)
        if(!crews.includes(crewname)) return message.channel.send("That crew does not exist!")
        let createdAt = db.fetch(`${crewname}_createdat`)
        let membercount = db.fetch(`${crewname}_membercount`)
        let crewrank = db.fetch(`rank_${crewname}`)
        let crewtickets= db.fetch(`ctickets_${crewname}`)
        let crewowner = db.fetch(`${crewname}_owner`)
        let crewicon = db.fetch(`${crewname}_icon`)
        let embed = new Discord.MessageEmbed()
       .setTitle(`Info for ${crewname}`)
       .setThumbnail(icons.Icons[crewicon])
       .addField("Information", `${membercount} members\n\nRank ${crewrank}‎\n\nCrew Leader: ${crewowner}`)
      



       message.channel.send(embed)
    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}