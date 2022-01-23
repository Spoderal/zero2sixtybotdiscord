const {MessageActionRow, MessageButton, MessageEmbed, MessageCollector, MessageSelectMenu} = require('discord.js')
const db = require('quick.db')
module.exports = {
    commands: ['events'],
    callback: async (message, arguments, text, client) => {

        let opened = db.fetch(`eventsopened_${message.author.id}`)
        let timeout = 15000
        if (opened !== null && timeout - (Date.now() - opened) > 0) {

          return message.channel.send("You already have events open, wait 15 seconds before opening it again.")
        }
        else {
  const row2 = new MessageActionRow()
  .addComponents(
    new MessageSelectMenu()
      .setCustomId('select')
      .setPlaceholder('No event selected')
      .addOptions([
        {
          label: 'Porsche Event',
          description: 'Information for the Porsche Event',
          value: 'porsche_event',
          customId: 'porsche'
        },
         
        
      ]),
  );

  let embed = new MessageEmbed()
  embed.setTitle('Help Menu')
  embed.setFooter('Prefix is "z!"')
  embed.setThumbnail("https://i.ibb.co/488Qf9M/Logo-Makr-24.png")
  embed.setDescription(`Here you can check out the current events going on!\n\n
      **__Events__**
      Porsche Event 2021
    
  `)

  embed.setColor("#60b0f4")

  message.channel.send({embeds: [embed], components: [row2]}).then(msg => {
    db.set(`eventsopened_${message.author.id}`, Date.now())
    const filter = (interaction) => interaction.isSelectMenu() && interaction.user.id === message.author.id;

    
    const collector = message.channel.createMessageComponentCollector({
      filter,
      time: 1000 * 15,
    })
    
    collector.on('collect', async(collected) => {
      
      const value = collected.values[0];
      if (value === 'porsche_event') {
         await collected.deferUpdate()
        embed.setTitle('Porsche Event')
        embed.setFooter('Prefix is "z!"')
        embed.setDescription(`Welcome to the first bi-monthly championship! This months theme is Porsche!

              Race others, bots, and more in your favorite porsche from the dealership, to help you out theres a dealership section dedicated to Porsche.

              The person who wins the most races in their Porsche, wins the 2014 Porsche 918 Spyder!

              **Commands**

              z!porschebot
              
              z!porschelb

              `)
              embed.setThumbnail("http://assets.stickpng.com/images/580b585b2edbce24c47b2cac.png")
              embed.setImage("https://file.kbb.com/kbb/images/content/editorial/slideshow/porsche-918-spyder-frankfurt-/porsche-918-spyder-450-600-001.jpg?w=768")
              embed.setColor("#60b0f4")
             
   await msg.edit({embeds: [embed], components: [row2]})
      }
     

    })

})

        }
     
    
      
    },
    permissions: '',
    requiredRoles: [],
  }