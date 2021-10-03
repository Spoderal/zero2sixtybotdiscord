const db = require('quick.db')
const Discord = require('discord.js')
const crewicons = require('../crewicons.json')

module.exports = {
    commands: ['createcrew'],
    callback: (message, arguments, text, client) => {
        let crewname = arguments.join(' ')
        let crews = db.fetch(`crewnames`)
        if(!crewname) return message.channel.send("Please specify a crew name!")
        if(crews.includes(`${crewname}`)) return message.channel.send("That crew already exists!")
        let crew = db.fetch(`crew_${message.author.id}`)
        if(crew) return message.channel.send("You're already in a crew! If you're a member, leave with z!leavecrew, and if you're the owner, delete it with z!deletecrew")
        let createdAt = db.fetch(`${crewname}_createdat`)
        let membercount = db.fetch(`${crewname}_membercount`)
        let crewrank = db.fetch(`${crewname}_rank`)
        let crewowner = db.fetch(`${crewname}_owner`)
        let crewicon = db.fetch(`${crewname}_icon`)
        

        db.set(`crew_${message.author.id}`, crewname)
        db.push(`crewnames`, crewname)
        db.set(`${crewname}_membercount`, 1)
        db.set(`rank_${crewname}`, 1)
        db.set(`${crewname}_owner`, message.author.tag)
        db.set(`${crewname}_icon`, 'Default')
        let embed = new Discord.MessageEmbed()
        .setTitle(`${crewname}`)
        .setThumbnail(crewicons.Icons.Default)
        .setDescription(`Created a crew with the name ${crewname}, and the owner as <@${message.author.id}>`)

        message.channel.send(embed)
        



       
    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}