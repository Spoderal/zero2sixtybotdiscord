const db = require('quick.db')

module.exports = {
    commands: ['givebadge'],
    description: 'Shows how much money you have!',
  
    
    callback: (message, arguments, text) => {
      
    
      if(message.author.id !== "275419902381260802"){

        message.channel.send("You dont have permission to use this command!")
        return;
    }
      else{
      
          var user = message.mentions.users.first()
          if(!user) return
          db.push(`badges_${user.id}`, "secret")
            message.channel.send(`Gave ${user} the "SECRET" badge`)
      }

    },
    permissions: '',
    requiredRoles: [],
  }
        