const Discord = require("discord.js")
const parts = require('../partsdb.json')

module.exports = {
    commands: ['junkparts', 'jp'],
    callback: (message, arguments, text) => {
        let exhaust1emote = "<:z_exhaust_1:898119935115530280>"
        let engine1emote = "<:z_engine_1:898119931709780049>"
        let turbo1emote = "<:z_turbo_1:898119933567827989>"
        let intake1emote = "<:z_intake_1:898119932011769896>"
        let tire1emote = "<:z_tire_1:898119934939385867>"
        let tier1empty = "<:z_empty_tier1:898121890235834408>"
     

        let embed = new Discord.MessageEmbed()
        .setTitle(`Car Parts`)
        .setDescription(`Buy parts to restore your project car!`)
        .addField(`Exhausts`, `
        ${parts.Parts['j1exhaust'].Emote} ${parts.Parts['j1exhaust'].Name} : $${numberWithCommas(parts.Parts['j1exhaust'].Price)}

        `, true)
        .addField(`Tires`, `
        ${parts.Parts['j1tires'].Emote} ${parts.Parts['j1tires'].Name} : $${numberWithCommas(parts.Parts['j1tires'].Price)}

        `, true)
        .addField(`Suspension`, `
        ${parts.Parts['j1suspension'].Emote} ${parts.Parts['j1suspension'].Name} : $${numberWithCommas(parts.Parts['j1suspension'].Price)}

        `, true)
        .addField(`Engines`, `
        ${parts.Parts['rotary'].Emote} ${parts.Parts['rotary'].Name} : $${numberWithCommas(parts.Parts['rotary'].Price)}
        ${parts.Parts['v6'].Emote} ${parts.Parts['v6'].Name} : $${numberWithCommas(parts.Parts['v6'].Price)}
        ${parts.Parts['v8'].Emote} ${parts.Parts['v8'].Name} : $${numberWithCommas(parts.Parts['v8'].Price)}

        `, true)
    
        .setColor("#60b0f4")
        .setFooter("Tip: Type z!updatelog for the new update!")
        message.channel.send({embeds: [embed]})
    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}