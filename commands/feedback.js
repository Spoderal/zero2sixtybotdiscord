const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['feedback'],
    description: 'Shows how much money you have!',
  
    
    callback: (message, arguments, text, client) => {
      
    
     let feedbackchannel = client.channels.cache.get('916574308707479623')

     let feedback = arguments.slice(0).join(' ')

     let embed = new MessageEmbed()
     .setTitle("New Feedback!")
     .addField("Feedback content", feedback)
     .setColor("#60b0f4")

     feedbackchannel.send({embeds: [embed]})
    },
    permissions: '',
    requiredRoles: [],
  }
        