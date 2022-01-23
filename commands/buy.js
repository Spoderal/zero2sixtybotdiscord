module.exports = {
    commands: ['buy'],
    callback: (message, arguments, text) => {
        let db = require('quick.db')
        let cars = require('../cardb.json')
        let created = db.fetch(`created_${message.author.id}`)
        const {MessageEmbed} = require('discord.js')
        if(!created) return message.channel.send(`You haven't created an account yet! Create one by sending "z!start".`)
        let parts = require('../partsdb.json')
        let list = cars.Cars
        let list2 = parts.Parts
        let bought = arguments.join(' ').toLowerCase()
        let cash = db.fetch(`cash_${message.author.id}`) || 0
        let usercars = db.fetch(`cars_${message.author.id}`) || []
        let userparts = db.fetch(`parts_${message.author.id}`) || []
        let userengines = db.fetch(`engines_${message.author.id}`) || []
        if(userengines == null) userengines == []
        if(!list[bought] && !list2[bought]) return message.channel.send("That car or part isn't available yet, suggest it in the support server! In the meantime, check how to use the command by running z!buy.")
        if(!bought) return message.channel.send("To use this command, specify the car or part you want to buy. Example: z!buy 1995 Mazda Miata")
        if (list[bought]) {
            if(usercars.length >= 10) return message.channel.send("Your 10 spaces are already filled. This is currently the maximum garage space available.")
            if(cars.Cars[bought].Price == 0) return message.channel.send("This car is not purchasable.")
            if(usercars.includes(cars.Cars[bought].Name)) return message.channel.send("You already own this car!")
            let carprice = cars.Cars[bought].Price
            let premium = db.fetch(`premium_${message.author.id}`)
            if(premium == true && cars.Cars[bought].PremiumPrice){
                carprice = cars.Cars[bought].PremiumPrice
            }
            if (cash < carprice ) return message.channel.send("You dont have enough cash!")
            if(premium == true && cars.Cars[bought].PremiumPrice){
                message.channel.send("You just got 10% off with Fast!")

            }
            
            if(cars.Cars[bought].Junked){
                if (cash < cars.Cars[bought].Price) return message.channel.send("You dont have enough cash!")

                db.set(`${cars.Cars[bought].Name}junked_${message.author.id}`, true)
                db.set(`${cars.Cars[bought].Name}restoration_${message.author.id}`, 0)
                db.set(`${cars.Cars[bought].Name}engine_${message.author.id}`, 'Missing')
                db.set(`${cars.Cars[bought].Name}exhaust_${message.author.id}`, 'Broken')
                db.set(`${cars.Cars[bought].Name}suspension_${message.author.id}`, 'Broken')
                db.set(`${cars.Cars[bought].Name}tires_${message.author.id}`, 'Flat')

            }
            db.subtract(`cash_${message.author.id}`, carprice)   
            db.push(`cars_${message.author.id}`, cars.Cars[bought].Name.toLowerCase())
            db.set(`${cars.Cars[bought].Name}speed_${message.author.id}`, cars.Cars[bought].Speed)
            db.set(`${cars.Cars[bought].Name}resale_${message.author.id}`, cars.Cars[bought].sellprice)
            let embed = new MessageEmbed()
            .setTitle(`Bought ${cars.Cars[bought].Name}`)
            .addField("Price", `$${numberWithCommas(carprice)}`)
            .addField("New cash balance", `$${numberWithCommas(db.fetch(`cash_${message.author.id}`))}`)
            .setColor("#60b0f4")
            .setThumbnail(`${cars.Cars[bought].Image}`)
            message.channel.send({embeds: [embed]});
            
        }
        
         else if (list2[bought]) {
                
                
                if(parts.Parts[bought].JunkOnly){
                    if (cash < parts.Parts[bought].Price) return message.channel.send("You dont have enough cash!")
    
             
                    db.subtract(`cash_${message.author.id}`, parts.Parts[bought].Price);
                    db.push(`restoreparts_${message.author.id}`, parts.Parts[bought].Name.toLowerCase())
                                message.channel.send(`You bought a ${parts.Parts[bought].Name} for $${numberWithCommas(parts.Parts[bought].Price)}`);
    
                }
                else {
                    if(userparts.includes(parts.Parts[bought].Name)) return message.channel.send("You already own this part!")
                    if (cash < parts.Parts[bought].Price) return message.channel.send("You dont have enough cash!")
                    db.subtract(`cash_${message.author.id}`, parts.Parts[bought].Price);
                    db.push(`parts_${message.author.id}`, parts.Parts[bought].Name.toLowerCase())
                    message.channel.send(`You bought a ${parts.Parts[bought].Name} for $${numberWithCommas(parts.Parts[bought].Price)}`);

                }
         
         
         
        }
        
    },
    permissions: '',
    requiredRoles: [],
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  