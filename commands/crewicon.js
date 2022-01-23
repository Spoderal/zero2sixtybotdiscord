const db = require('quick.db')
const Discord = require('discord.js')
const icons = require('../crewicons.json')
module.exports = {
    commands: ['crewicon'],
    callback: (message, arguments, text, client) => {
        let crewname = db.fetch(`crew_${message.author.id}`)
        if(!crewname) return message.channel.send("You are not in a crew!")
        let crewowner = db.fetch(`${crewname}_owner`)
        if(!crewowner == message.author.tag) return message.channel.send("You are not the owner of this crew!")
        let iconlist = ['Snake', 'Spider', 'Shark', 'Knight', 'Default']
        let iconchoice = arguments[0]
        if(!iconlist.includes(iconchoice)) return message.channel.send("Thats not an icon! Choose one from the list: Snake, Spider, Shark, Knight, Default.")
        let crewicon = db.fetch(`${crewname}_icon`)
        db.set(`${crewname}_icon`, iconchoice)
        let membercount = db.fetch(`${crewname}_membercount`)
        let crewrank = db.fetch(`${crewname}_rank`)
        let embed = new Discord.MessageEmbed()
       .setTitle(`Info for ${crewname}`)
       .setThumbnail(icons.Icons[crewicon])
       .addField("Information", `${membercount} members\n\nRank ${crewrank}\n\nCrew Leader: ${crewowner}`)
       .setColor("#60b0f4")




       message.channel.send("Check your crew with z!crew to check out your new icon!")
    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}