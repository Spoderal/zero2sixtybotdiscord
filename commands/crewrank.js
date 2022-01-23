const db = require('quick.db')
const Discord = require('discord.js')
const icons = require('../crewicons.json')
module.exports = {
    commands: ['crewrank'],
    callback: (message, arguments, text, client) => {
        let crewname = db.fetch(`crew_${message.author.id}`)
        if(!crewname) return message.channel.send("You're not in a crew! Join a crew with z!joincrew [crew name]")
        let crews = db.fetch(`crewnames`)
        if(!crews.includes(crewname)) return message.channel.send("That crew does not exist!")
        let crewrank = db.fetch(`rank_${crewname}`)
        let crewowner = db.fetch(`${crewname}_owner`)
        let crewicon = db.fetch(`${crewname}_icon`)
        let crewtickets= db.fetch(`ctickets_${crewname}`) || 0
        let embed = new Discord.MessageEmbed()
       .setTitle(`Rank Info for ${crewname}`)
       .setThumbnail(icons.Icons[crewicon])
       .addField("Information", `Rank ${crewrank}\n\nTickets: ${crewtickets}\n\nCrew Leader: ${crewowner}`)
       .addField("Rewards", `Rank 5: $1,000 Cash\nRank 10: $5,000 Cash\nRank 20: $10,000 Cash\nRank 50: $25,000 Cash\nRank 100: 2018 McLaren Senna`)
       .setColor("#60b0f4")




       message.channel.send({embeds: [embed]})

    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}