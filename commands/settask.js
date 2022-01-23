const db = require('quick.db')

module.exports = {
    commands: ['settask'],
    description: 'Shows how much money you have!',
  
    
    callback: (message, arguments, text) => {
      
    
      if(message.author.id !== "275419902381260802"){

        message.channel.send("You dont have permission to use this command!")
        return;
    }
      else{
      
        
      }

    },
    permissions: '',
    requiredRoles: [],
  }
        