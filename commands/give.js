module.exports = {
    commands: ['give'],
    callback: (message, arguments, text) => {
        let db = require('quick.db')
        let cars = require('../cardb.json')
        let user = message.mentions.users.first()
        if(!user) return message.channel.send("Specify a user!")
        let userid = user.id
        
        let created = db.fetch(`created_${userid}`)
        if(!created) return message.channel.send(`They haven't created an account yet!`)
        let parts = require('../partsdb.json')
        let list = cars.Cars
        let list2 = parts.Parts
        let bought = arguments.slice(1).join(' ')
        let usercars = db.fetch(`cars_${userid}`) || []
        let userparts = db.fetch(`parts_${userid}`) || []
        let userengines = db.fetch(`engines_${userid}`) || []
        if(userengines == null) userengines == []
        if(usercars.length == 8) return message.channel.send("Their 8 spaces are already filled. This is currently the maximum garage space available.")

        if(!bought) return message.channel.send("To use this command, specify the car or part you want to give without any spaces between the car name. Example: z!give 1995 Mazda Miata")
        if (list[bought]) {
          
            if(usercars.includes(cars.Cars[bought].Name)) return message.channel.send("They already own this car!")
            db.push(`cars_${userid}`, cars.Cars[bought].Name)
            db.set(`${bought}speed_${userid}`, cars.Cars[bought].Speed)
            db.set(`${bought}resale_${userid}`, cars.Cars[bought].sellprice)
            message.channel.send(`You gave ${user} a ${cars.Cars[bought].Name}`);
            
         }
       
         
         
        
        else {
            message.channel.send("That car or part isn't available yet, suggest it in the support server! In the meantime, check how to use the command by running z!give.")
        }
    },
    permissions: '',
    requiredRoles: [],
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  