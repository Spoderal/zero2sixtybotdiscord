const { MessageFlags } = require('discord.js')
const splice = require('splice')

module.exports = {
    commands: ['sell'],
    description: 'Sell a car to the bot!',
    permissionError: '',
    
    callback: (message, arguments, text) => {
        let cars = require('../cardb.json')
        let parts = require('../partsdb.json')

        let db = require('quick.db')
        let profilestuff = require('../pfpsdb.json')
        let usercars = db.fetch(`cars_${message.author.id}`)
        let userparts = db.fetch(`parts_${message.author.id}`)

        let selling = arguments.splice(0).join(' ')
        if(!selling) return message.channel.send("Specify a car or part!")
    
        
        
        if(cars.Cars[selling.toLowerCase()]){
            if(!usercars.includes(cars.Cars[selling.toLowerCase()].Name.toLowerCase())) return message.channel.send("You dont have that car!")
            if(!cars.Cars[selling.toLowerCase()].sellprice || cars.Cars[selling.toLowerCase()].sellprice == 0) return message.channel.send("That car is unsellable!")
            let resale = db.fetch(`${cars.Cars[selling.toLowerCase()].Name}resale_${message.author.id}`)
            const filtered = usercars.filter(e => e !== selling.toLowerCase());
            db.set(`cars_${message.author.id}`, filtered)
            db.add(`cash_${message.author.id}`, resale)
            db.delete(`${cars.Cars[selling.toLowerCase()].Name}speed_${message.author.id}`)
            db.delete(`${cars.Cars[selling.toLowerCase()].Name}turbo_${message.author.id}`)
            db.delete(`${cars.Cars[selling.toLowerCase()].Name}engine_${message.author.id}`)
            db.delete(`${cars.Cars[selling.toLowerCase()].Name}exhaust_${message.author.id}`)
            db.delete(`${cars.Cars[selling.toLowerCase()].Name}tires_${message.author.id}`)
            db.delete(`${cars.Cars[selling.toLowerCase()].Name}intake_${message.author.id}`)
            db.delete(`${cars.Cars[selling.toLowerCase()].Name}suspension_${message.author.id}`)
            db.delete(`${cars.Cars[selling.toLowerCase()].Name}speed_${message.author.id}`)
            db.delete(`${cars.Cars[selling.toLowerCase()].Name}spoiler_${message.author.id}`)

            message.channel.send(`You sold your ${selling.toLowerCase()} for ${resale}!`)

        }
        
        else if(parts.Parts[selling.toLowerCase()]){
            if(!userparts.includes(parts.Parts[selling.toLowerCase()].Name.toLowerCase())) return message.channel.send("You dont have that part!")
            if(parts.Parts[selling.toLowerCase()].sellprice == "N/A" || !parts.Parts[selling.toLowerCase()].sellprice) return message.channel.send("That part is unsellable!")
            let resale = parts.Parts[selling.toLowerCase()].sellprice
            const filtered = userparts.filter(e => e !== selling.toLowerCase());
             for (var i = 0; i < 1; i ++) userparts.splice(userparts.indexOf(selling.toLowerCase()), 1)
            db.set(`parts_${message.author.id}`, filtered)
            db.add(`cash_${message.author.id}`, resale)
            message.channel.send(`You sold your ${selling} for ${resale}!`)

        }
  

             if(profilestuff.Pfps[selling.toLowerCase()]){
                let pfps = db.fetch(`pfps_${message.author.id}`)
    
                const filtered = pfps.filter(e => e !== selling.toLowerCase());
                db.set(`pfps_${message.author.id}`, filtered)
    
                message.channel.send(`You sold your ${selling} for $0!`)
    
            }
    
            else if(profilestuff.Pfps.Titles[selling.toLowerCase()]){
                let titles = db.fetch(`titles_${message.author.id}`)
    
                const filtered = titles.filter(e => e !== selling.toLowerCase());
                db.set(`titles_${message.author.id}`, filtered)
    
                message.channel.send(`You sold your ${selling} for $0!`)
    
            }
        

     


      

        
    },
    permissions: '',
    requiredRoles: [],
  }
  
  