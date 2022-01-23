const db = require('quick.db')
const Discord = require("discord.js")

module.exports = {
    commands: ['servers'],
    description: 'Shows how much money you have!',
  
    
    callback: (message, arguments, text, client) => {
      
    
      if(message.author.id !== "275419902381260802"){

        message.channel.send("You dont have permission to use this command!")
        return;
    }
      else{
      
       message.channel.send(`${client.guilds.cache.size} servers`)
      }

    },
    permissions: '',
    requiredRoles: [],
  }
        