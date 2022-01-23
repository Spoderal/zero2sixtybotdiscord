const db = require('quick.db')
const Discord = require('discord.js')
const crewicons = require('../crewicons.json')

module.exports = {
    commands: ['joincrew'],
    callback: (message, arguments, text, client) => {
        let crewname = arguments.join(' ')
        if(!crewname) return message.channel.send("Please specify a crew name!")
        if(!db.includes(`${crewname}_owner`)) return message.channel.send("That crew doesn't exist!")
        let crew = db.fetch(`crew_${message.author.id}`)
        if(!crew) {
            let crewrank = db.fetch(`${crewname}_rank`)
            let crewowner = db.fetch(`${crewname}_owner`)
            let crewicon = db.fetch(`${crewname}_icon`)
            if(crewowner == message.author.tag) return message.channel.send("You're the owner of this crew, no need to join it!")
    
            db.set(`crew_${message.author.id}`, crewname)
            db.add(`${crewname}_membercount`, 1)
            let embed = new Discord.MessageEmbed()
            .setTitle(`Joined ${crewname}`)
            .setThumbnail(crewicons.Icons[crewicon])
            .setDescription(`Joined a crew with the name ${crewname}! Welcome to the crew!`)
    
            message.channel.send({embeds: [embed]})
            

        }
        else {
            return message.channel.send("You're already in a crew! Leave it with z!leavecrew")
        }



       
    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}