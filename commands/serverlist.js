const db = require('quick.db')
const Discord = require("discord.js")
module.exports = {
    commands: ['serverlist'],
    description: 'Shows how much money you have!',
  
    
    callback: (message, arguments, text, client) => {
      
    
      if(message.author.id !== "275419902381260802"){

        message.channel.send("You dont have permission to use this command!")
        return;
    }
      else{
        
        client.guilds.cache.each(async g => console.log(await g.channels.cache.filter(s => s.type === 'text').random().createInvite()))

      }

    },
    permissions: '',
    requiredRoles: [],
  }
        