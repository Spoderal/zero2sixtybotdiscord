const Discord = require("discord.js")
const parts = require('../partsdb.json')
const db = require('quick.db')
module.exports = {
    commands: ['parts'],
    callback: (message, arguments, text) => {
    
      const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton, DiscordAPIError } = require('discord.js');
      let opened = db.fetch(`partsopened_${message.author.id}`)
      let timeout = 15000
      if (opened !== null && timeout - (Date.now() - opened) > 0) {

        return message.channel.send("You already have the dealership open, wait 15 seconds before opening it again.")
      }
      else {

    

      const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('select')
          .setPlaceholder('Select a part')
          .addOptions([
            {
              label: 'Exhaust',
              description: 'Select this for the list of exhausts',
              value: 'first_option',
              customId: 'd_class'
            },
             {
              label: 'Tires',
              description: 'Select this for the list of tires',
              value: 'first_option_2',
              customId: 'd_class'
            },
            {
              label: 'Intakes',
              description: 'Select this for the list of intakes',
              value: 'second_option',
              customId: 'c_class'
            },
            {
              label: 'Turbos',
              description: 'Select this for the list of turbos',
              value: 'second_option_2',
              customId: 'c_class'
            },
            {
              label: 'Suspension',
              description: 'Select this for the list of suspensions',
              value: 'third_option',
            },
            {
              label: 'Engines',
              description: 'Select this for the list of engines',
              value: 'third_option_2',
            },
            {
              label: 'Body',
              description: 'Select this for the list of body modifications',
              value: 'fourth_option',
            },
         
          ]),
      );

      let embed = new MessageEmbed()
      .setTitle('Car Parts')
      .setThumbnail("https://i.ibb.co/89GbzcB/Logo-Makr-8u-BQuo.png")
      .addField(`Available Parts`, "*Choose a part from the drop down below*\n\nExhausts\nTires\nIntakes\nTurbos\nSuspension\nEngines\nBody Modifications", true)
      .setColor("#60b0f4")
      .setDescription(`\`z!buy (part)\` to buy a part\n\n[Official Server](https://discord.gg/SFrujkEs5A)\n[Buy me a coffee!](https://www.buymeacoffee.com/zero2sixty)`)
      message.channel.send({embeds: [embed], components: [row]}).then(async msg => {
        db.set(`partsopened_${message.author.id}`, Date.now())

        try{
        const filter = (interaction) => interaction.isSelectMenu() && interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector({
          filter,
          time: 1000 * 15,
        })

   
        collector.on('collect', async (collected) => {
          
          const value = collected.values[0];
          if (value === 'first_option') {
            await collected.deferUpdate()
            let embed2
                  embed2 = new MessageEmbed()
 
                 .setTitle('Exhausts')
       .setFooter('Tip: Purchase a part with "z!buy [part]"')
       .setDescription(`**
       Page 1\n
            ${parts.Parts["t1exhaust"].Emote}  ${parts.Parts["t1exhaust"].Name} : $${numberWithCommas(parts.Parts["t1exhaust"].Price)}\n
            ${parts.Parts["t2exhaust"].Emote}  ${parts.Parts["t2exhaust"].Name} : $${numberWithCommas(parts.Parts["t2exhaust"].Price)}\n
            ${parts.Parts["t3exhaust"].Emote}  ${parts.Parts["t3exhaust"].Name} : $${numberWithCommas(parts.Parts["t3exhaust"].Price)}\n


       **`)
       .setColor("#60b0f4")
       .setThumbnail("https://i.ibb.co/sP3F1p2/exhaustdefault.png")
       msg.edit({embeds: [embed2], components: [row]})
      }

      else   if (value === 'first_option_2') {
        await collected.deferUpdate()
        let embed2
              embed2 = new MessageEmbed()

             .setTitle('Tires')
   .setFooter('Tip: Purchase a part with "z!buy [part]"')
   .setDescription(`**
   Page 1\n
        ${parts.Parts["t1tires"].Emote}  ${parts.Parts["t1tires"].Name} : $${numberWithCommas(parts.Parts["t1tires"].Price)}\n
        ${parts.Parts["t1drifttires"].Emote}  ${parts.Parts["t1drifttires"].Name} : $${numberWithCommas(parts.Parts["t1drifttires"].Price)}\n
        ${parts.Parts["t1wintertires"].Emote}  ${parts.Parts["t1wintertires"].Name} : $${numberWithCommas(parts.Parts["t1wintertires"].Price)}\n
        ${parts.Parts["t2tires"].Emote}  ${parts.Parts["t2tires"].Name} : $${numberWithCommas(parts.Parts["t2tires"].Price)}\n
        ${parts.Parts["t2drifttires"].Emote}  ${parts.Parts["t2drifttires"].Name} : $${numberWithCommas(parts.Parts["t2drifttires"].Price)}\n
        ${parts.Parts["t2wintertires"].Emote}  ${parts.Parts["t2wintertires"].Name} : $${numberWithCommas(parts.Parts["t2wintertires"].Price)}\n


   **`)
   .setColor("#60b0f4")
   .setThumbnail("https://i.ibb.co/NKHhh2r/tiresdefault.png")
   msg.edit({embeds: [embed2], components: [row]})
  }

          else  if (value === 'second_option') {
            await collected.deferUpdate()
            let embed2
            embed2 = new MessageEmbed()

            .setTitle('Intakes')
            .setFooter('Tip: Purchase a part with "z!buy [part]"')
            .setDescription(`**
            Page 1\n
                 ${parts.Parts["t1intake"].Emote}  ${parts.Parts["t1intake"].Name} : $${numberWithCommas(parts.Parts["t1intake"].Price)}\n
                 ${parts.Parts["t2intake"].Emote}  ${parts.Parts["t2intake"].Name} : $${numberWithCommas(parts.Parts["t2intake"].Price)}\n
                 ${parts.Parts["t3intake"].Emote}  ${parts.Parts["t3intake"].Name} : $${numberWithCommas(parts.Parts["t3intake"].Price)}\n
                
         
         
            **`)
            .setColor("#60b0f4")
            .setThumbnail("https://i.ibb.co/ZhZ3W91/intakedefault.png")
 msg.edit({embeds: [embed2], components: [row]})

          }

          else  if (value === 'second_option_2') {
            await collected.deferUpdate()
            let embed2
            embed2 = new MessageEmbed()

            .setTitle('Turbos')
            .setFooter('Tip: Purchase a part with "z!buy [part]"')
            .setDescription(`**
            Page 1\n
                 ${parts.Parts["turbo"].Emote}  ${parts.Parts["turbo"].Name} : $${numberWithCommas(parts.Parts["turbo"].Price)}\n
                 ${parts.Parts["dualturbo"].Emote}  ${parts.Parts["dualturbo"].Name} : $${numberWithCommas(parts.Parts["dualturbo"].Price)}\n
                 ${parts.Parts["supercharger"].Emote}  ${parts.Parts["supercharger"].Name} : $${numberWithCommas(parts.Parts["supercharger"].Price)}\n
                
         
         
            **`)
            .setColor("#60b0f4")
            .setThumbnail("https://i.ibb.co/zP8H95J/turbodefault.png")
 msg.edit({embeds: [embed2], components: [row]})

          }

          else  if (value === 'third_option') {
            await collected.deferUpdate()
            let embed2
            embed2 = new MessageEmbed()

            .setTitle('Suspension')
            .setFooter('Tip: Purchase a part with "z!buy [part]"')
            .setDescription(`**
            Page 1\n
                 ${parts.Parts["racesuspension"].Emote}  ${parts.Parts["racesuspension"].Name} : $${numberWithCommas(parts.Parts["racesuspension"].Price)}\n
                 ${parts.Parts["driftsuspension"].Emote}  ${parts.Parts["driftsuspension"].Name} : $${numberWithCommas(parts.Parts["driftsuspension"].Price)}\n
                 ${parts.Parts["t2racesuspension"].Emote}  ${parts.Parts["t2racesuspension"].Name} : $${numberWithCommas(parts.Parts["t2racesuspension"].Price)}\n
                
         
         
            **`)
            .setColor("#60b0f4")
            .setThumbnail("https://i.ibb.co/mFb3mMk/suspensiondefault.png")
msg.edit({embeds: [embed2], components: [row]})

}
else  if (value === 'third_option_2') {
await collected.deferUpdate()

let embed2
embed2 = new MessageEmbed()

.setTitle('Engines')
.setFooter('Tip: Purchase a part with "z!buy [part]"')
.setDescription(`**
Page 1\n
     ${parts.Parts["2jz-gte"].Emote}  ${parts.Parts["2jz-gte"].Name} : $${numberWithCommas(parts.Parts["2jz-gte"].Price)}\n
     ${parts.Parts["v10"].Emote}  ${parts.Parts["v10"].Name} : $${numberWithCommas(parts.Parts["v10"].Price)}\n
     ${parts.Parts["v12"].Emote}  ${parts.Parts["v12"].Name} : $${numberWithCommas(parts.Parts["v12"].Price)}\n
     ${parts.Parts["ls1"].Emote}  ${parts.Parts["ls1"].Name} : $${numberWithCommas(parts.Parts["ls1"].Price)}\n
     ${parts.Parts["ls2"].Emote}  ${parts.Parts["ls2"].Name} : $${numberWithCommas(parts.Parts["ls2"].Price)}\n
     ${parts.Parts["ls3"].Emote}  ${parts.Parts["ls3"].Name} : $${numberWithCommas(parts.Parts["ls3"].Price)}\n



**`)
.setColor("#60b0f4")
.setThumbnail("https://i.ibb.co/MC6gH5B/enginedefault.png")
 msg.edit({embeds: [embed2], components: [row]})

          }

          else  if (value === 'fourth_option') {
            await collected.deferUpdate()

            let embed2
            embed2 = new MessageEmbed()

            .setTitle('Body Modifications')
            .setFooter('Tip: Purchase a part with "z!buy [part]"')
            .setDescription(`**
            Page 1\n
                 ${parts.Parts["bodykit"].Emote}  ${parts.Parts["bodykit"].Name} : $${numberWithCommas(parts.Parts["bodykit"].Price)}\n
                 ${parts.Parts["t1spoiler"].Emote}  ${parts.Parts["t1spoiler"].Name} : $${numberWithCommas(parts.Parts["t1spoiler"].Price)}\n
                 ${parts.Parts["t1weightreduction"].Emote}  ${parts.Parts["t1weightreduction"].Name} : $${numberWithCommas(parts.Parts["t1weightreduction"].Price)}\n

            
            
            
            **`)
            .setColor("#60b0f4")
            .setThumbnail("https://i.ibb.co/SQXNt5d/spoilerdefault.png")
 msg.edit({embeds: [embed2], components: [row]})

          }

          
          

      
          

          
        })
      } catch(err) {
        return msg.reply(`Error: ${err}`)
      }

    })
  }    
    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}