const db = require("quick.db")


module.exports = {
    commands: ['reset'],
    description: 'resets your profile!',
    permissionError: '',
    cooldown: 60,
    callback: (message, arguments, text) => {
        
        if(message.author.id !== "275419902381260802"){

            message.channel.send("You dont have permission to use this command!")
            return;
        }
          else{
        let userid = message.author.id;

        let cash = db.fetch(`cash_${message.author.id}`)
        let cars = db.fetch(`cars_${message.author.id}`)
        
        
            
       db.set(`cars_${userid}`, [])
       db.set(`cash_${userid}`, 0 )
       db.set(`parts_${userid}`, [])
        
        message.channel.send("You've reset your account!")
          }
    },
    permissions: '',
    requiredRoles: [],
  }
  