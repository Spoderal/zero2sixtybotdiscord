const discord = require('discord.js')
module.exports = {
    commands: ['fast'],
    callback: (message, arguments, text) => {

      let embed = new discord.MessageEmbed()

      .setTitle("Fast Info")
      .setDescription("Fast is a one time payment of $5 to receive many perks!")
      .addField("Perks", `- 2x Notoriety

      - 2x Cash in bot races
      
      - Special Premium Profile Picture
      
      - Increased daily reward
      
      - Free daily premium crate
      
      - Discount on new cars
      
      - Supporting the bots development`)
     .setColor("#60b0f4")
     .setThumbnail("https://i.ibb.co/9WTq2Sn/Logo-Makr-8-YKJ71.png")
     .setAuthor(`Join the support server for information on how to purchase`, 'https://i.ibb.co/F0hLvQt/newzerologo.png', 'https://discord.gg/UCHPbXu7jn')
     message.channel.send({embeds: [embed]})
      
    },
    permissions: '',
    requiredRoles: [],
  }