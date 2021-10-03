module.exports = {
    commands: ['buy'],
    callback: (message, arguments, text) => {
        let db = require('quick.db')
        let cars = require('../cardb.json')
        let created = db.fetch(`created_${message.author.id}`)
        if(!created) return message.channel.send(`You haven't created an account yet! Create one by sending "z!start".`)
        let parts = require('../partsdb.json')
        let list = cars.Cars
        let list2 = parts.Parts
        let bought = arguments.join(' ')
        let cash = db.fetch(`cash_${message.author.id}`) || 0
        let usercars = db.fetch(`cars_${message.author.id}`) || []
        let userparts = db.fetch(`parts_${message.author.id}`) || []
        let userengines = db.fetch(`engines_${message.author.id}`) || []
        if(userengines == null) userengines == []
        if(usercars.length == 8) return message.channel.send("Your 8 spaces are already filled. This is currently the maximum garage space available.")

        if(!bought) return message.channel.send("To use this command, specify the car or part you want to buy without any spaces between the car name. Example: z!buy 1995MazdaMiata")
        if (list[bought]) {
            if(cars.Cars[bought].Price == "Win with 100 races") return message.channel.send("This car is not purchasable.")
            if(usercars.includes(cars.Cars[bought].Name)) return message.channel.send("You already own this car!")
            if (cash < cars.Cars[bought].Price ) return message.channel.send("You dont have enough cash!")
            db.subtract(`cash_${message.author.id}`, cars.Cars[bought].Price)   
            db.push(`cars_${message.author.id}`, cars.Cars[bought].Name)
            db.set(`${bought}speed_${message.author.id}`, cars.Cars[bought].Speed)
            db.set(`${bought}resale_${message.author.id}`, cars.Cars[bought].sellprice)
            message.channel.send(`You bought a ${cars.Cars[bought].Name} for $${numberWithCommas(cars.Cars[bought].Price)}`);
            
         }
         else if (list2[bought]) {
            if(bought === "2JZ-GTE"){
                if(userengines.includes(parts.Parts[bought].Name)) return message.channel.send("You already own this engine!")
                if (cash < parts.Parts[bought].Price) return message.channel.send("You dont have enough cash!")
                db.subtract(`cash_${message.author.id}`, parts.Parts[bought].Price);
                db.push(`engines_${message.author.id}`, parts.Parts[bought].Name)
                message.channel.send(`You bought a ${parts.Parts[bought].Name} for $${numberWithCommas(parts.Parts[bought].Price)}`);
            } else{
                
        
            if(userparts.includes(parts.Parts[bought].Name)) return message.channel.send("You already own this part!")
            if (cash < parts.Parts[bought].Price) return message.channel.send("You dont have enough cash!")
            db.subtract(`cash_${message.author.id}`, parts.Parts[bought].Price);
            db.push(`parts_${message.author.id}`, parts.Parts[bought].Name)
            message.channel.send(`You bought a ${parts.Parts[bought].Name} for $${numberWithCommas(parts.Parts[bought].Price)}`);
         }
         
         
        }
        else {
            message.channel.send("That car or part isn't available yet, suggest it in the support server! In the meantime, check how to use the command by running z!buy.")
        }
    },
    permissions: '',
    requiredRoles: [],
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  