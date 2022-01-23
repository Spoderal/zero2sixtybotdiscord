const db = require("quick.db")
const discord = require('discord.js')
const squads = require('../squads.json')
module.exports = {
    commands: ['squad'],
    description: 'see a squads info',
    permissionError: '',
    callback: (message, arguments, text) => {
        let squas = squads.Squads
        let squad = arguments.splice(0).join(' ')
        if(!squad) return message.channel.send("Specify a squad!")
        if(!squas[squad.toLowerCase()]) return message.channel.send("Thats not a squad!")

        let embed = new discord.MessageEmbed()
        .setTitle(`Squad Info for ${squas[squad.toLowerCase()].Name}`)
        .setThumbnail(squas[squad.toLowerCase()].Icon)
        .setColor(squas[squad].Color)
        .addField("Leader", squas[squad].Leader)
        .addField("Members", `${squas[squad].Members.join('\n')}`)
        .addField("Class", `${squas[squad].Class}`)

        message.channel.send({embeds: [embed]})
    },
    permissions: '',
    requiredRoles: [],
  }
  