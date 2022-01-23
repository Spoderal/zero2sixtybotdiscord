const db = require('quick.db')
const Discord = require('discord.js')
const crewicons = require('../crewicons.json')

module.exports = {
    commands: ['deletecrew'],
    callback: (message, arguments, text, client) => {
        let crewname = db.fetch(`crew_${message.author.id}`)
        let crews = db.fetch(`crewnames`)
        if(!crewname) return message.channel.send("You're not in a crew!")
        let createdAt = db.fetch(`${crewname}_createdat`)
        let membercount = db.fetch(`${crewname}_membercount`)
        let crewrank = db.fetch(`${crewname}_rank`)
        let crewowner = db.fetch(`${crewname}_owner`)
        let crewicon = db.fetch(`${crewname}_icon`)
        if(!crewowner == message.author.tag) return message.channel.send("You're not the group owner!")

        const filtered = crews.filter(e => e !== crewname);
        db.set(`crew_${message.author.id}`, null)
        db.set(`crewnames`, filtered)
        db.delete(`${crewname}_membercount`)
        db.delete(`rank_${crewname}`)
        db.delete(`${crewname}_owner`)
        db.delete(`${crewname}_icon`)
        let embed = new Discord.MessageEmbed()
        .setDescription(`Delete a crew with the name ${crewname}, and the owner as <@${message.author.id}>`)

        message.channel.send({embeds: [embed]})

        



       
    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}