const db = require("quick.db")
const discord = require('discord.js')
module.exports = {
    commands: ['squads'],
    description: 'see a squads info',
    permissionError: '',
    callback: (message, arguments, text) => {
       

        let embed = new discord.MessageEmbed()
        .setTitle(`Squads List`)
        .setColor("#60b0f4")
        .setDescription("FlameHouse: Tier 1\n\nSkullCrunchers: Tier 2\n\nTheSpeed: Tier 3\n\nScrapheads: Tier 4")
        message.channel.send({embeds: [embed]})
    },
    permissions: '',
    requiredRoles: [],
  }
  