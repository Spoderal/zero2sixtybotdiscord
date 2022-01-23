const db = require('quick.db')

module.exports = {
    commands: ['eval'],
    description: 'Shows how much money you have!',
  
    
    callback: (message, arguments, text) => {
      
    
      if(message.author.id !== "275419902381260802" && message.author.id !== "890390158241853470"){

        message.channel.send("You dont have permission to use this command!")
        return;
    }
      else{
      
          var result = message.content.split(" ").slice(1).join(" ")
              let evaled = eval(result);
              message.channel.send(result)
      }

    },
    permissions: '',
    requiredRoles: [],
  }
        