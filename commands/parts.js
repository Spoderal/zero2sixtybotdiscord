const Discord = require("discord.js")
const parts = require('../partsdb.json')

module.exports = {
    commands: ['parts'],
    callback: (message, arguments, text) => {
  
        let embed = new Discord.MessageEmbed()
        .setTitle(`Alex's Parts Store`)
        .addField(`Exhausts`, `${parts.Parts["Tier1Exhaust"].Name} : $${parts.Parts["Tier1Exhaust"].Price}`)
        .addField(`Tires`, `${parts.Parts["Tier1Tires"].Name} : $${parts.Parts["Tier1Tires"].Price}`)
        .addField(`TurboChargers`, `${parts.Parts["Turbo"].Name} : $${parts.Parts["Turbo"].Price}`)
        .addField(`Engines`, `${parts.Parts["2JZ-GTE"].Name}`)
        .setColor("#bf0202")
        message.channel.send(embed)
    },
    permissions: '',
    requiredRoles: [],
  }