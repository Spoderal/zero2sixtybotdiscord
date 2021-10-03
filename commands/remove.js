const { MessageFlags } = require('discord.js')


module.exports = {
    commands: ['remove'],
    description: 'Remove a part!',
    permissionError: '',
    
    callback: (message, arguments, text) => {
        let cars = require('../cardb.json')
        let parts = require('../partsdb.json')
        let db = require('quick.db')
        
        let usercars = db.fetch(`cars_${message.author.id}`)
        let userparts = db.fetch(`parts_${message.author.id}`)
        let selling = arguments[0]
        let car = arguments.slice(1).join(" ")
        let partslist = ['Turbo', 'Tires', 'Intake', 'Exhaust', 'Engine']

        if(!selling) return message.channel.send("Specify the part you want to sell! (Turbo, Tires, Intake, Exhaust, Engine)")
        if(!car) return message.channel.send("Specify the car you want to remove the part from!")
        if(!usercars.includes(cars.Cars[car].Name)) return message.channel.send("You dont have that car!")
        let turbo = db.fetch(`${car}turbo_${message.author.id}`)
        let tires = db.fetch(`${car}tires_${message.author.id}`)
        let intake = db.fetch(`${car}intake_${message.author.id}`)
        let exhaust = db.fetch(`${car}exhaust_${message.author.id}`)
        let engine = db.fetch(`${car}engine_${message.author.id}`)
        if(!partslist.includes(selling)) return message.channel.send("Specify which part you want to sell! Turbo, Exhaust, Tires, Engine, or Intake.")
        if(selling == "Turbo"){
            if(turbo == 'None' || turbo == null || turbo == []) return message.channel.send("This car doesnt have a turbo installed.")
            const filtered = userparts.filter(e => e !== turbo);
            let resale = parts.Parts[turbo].sellprice
            db.set(`${car}turbo_${message.author.id}`, null)
            db.set(`parts_${message.author.id}`, filtered)
            db.subtract(`${car}resale_${message.author.id}`, parts.Parts[turbo].sellprice)
            db.subtract(`${car}speed_${message.author.id}`, parts.Parts[turbo].AddedSpeed)
            db.add(`cash_${message.author.id}`, resale)
            message.channel.send(`You sold your ${selling} for ${resale}!`)

        }
        if(selling == "Tires"){
            if(tires == 'Stock' || tires == null || tires == []) return message.channel.send("This car doesnt have any other tires installed.")
            let resale = parts.Parts[tires].sellprice
            const filtered = userparts.filter(e => e !== tires);
            db.set(`${car}tires_${message.author.id}`, null)
            db.set(`parts_${message.author.id}`, filtered)
            db.subtract(`${car}resale_${message.author.id}`, parts.Parts[tires].sellprice)
            db.subtract(`${car}speed_${message.author.id}`, parts.Parts[tires].AddedSpeed)
            db.add(`cash_${message.author.id}`, resale)
            message.channel.send(`You sold your ${selling} for ${resale}!`)

        }
        if(selling == "Exhaust"){
            if(exhaust == 'Stock' || exhaust == null || exhaust == []) return message.channel.send("This car doesnt have any other exhaust installed.")
            let resale = parts.Parts[exhaust].sellprice
            const filtered = userparts.filter(e => e !== exhaust);
            db.set(`${car}exhaust_${message.author.id}`, null)
            db.set(`parts_${message.author.id}`, filtered)
            db.subtract(`${car}resale_${message.author.id}`, parts.Parts[exhaust].sellprice)
            db.subtract(`${car}speed_${message.author.id}`, parts.Parts[exhaust].AddedSpeed)
            db.add(`cash_${message.author.id}`, resale)
            message.channel.send(`You sold your ${selling} for ${resale}!`)

        }

        if(selling == "Intake"){
            if(intake == 'None' || intake == null || tires == []) return message.channel.send("This car doesnt have any intake installed.")
            let resale = parts.Parts[intake].sellprice
            const filtered = userparts.filter(e => e !== intake);
            db.set(`${car}intake_${message.author.id}`, null)
            db.set(`parts_${message.author.id}`, filtered)
            db.subtract(`${car}resale_${message.author.id}`, parts.Parts[intake].sellprice)
            db.subtract(`${car}speed_${message.author.id}`, parts.Parts[intake].AddedSpeed)
            db.add(`cash_${message.author.id}`, resale)
            message.channel.send(`You sold your ${selling} for ${resale}!`)

        }

        if(selling == "Engine"){
            if(engine == cars.Cars[car].Engine || engine == null || tires == []) return message.channel.send("This car doesnt have a new engine installed.")
            let resale = parts.Parts[engine].sellprice
            const filtered = userparts.filter(e => e !== engine);
            db.set(`${car}engine_${message.author.id}`, cars.Cars[car].Engine)
            db.set(`engines_${message.author.id}`, filtered)
            db.subtract(`${car}resale_${message.author.id}`, parts.Parts[engine].sellprice)
            db.subtract(`${car}speed_${message.author.id}`, parts.Parts[engine].AddedSpeed)
            db.add(`cash_${message.author.id}`, resale)
            message.channel.send(`You sold your ${selling} for ${resale}!`)

        }


       

      

        
    },
    permissions: '',
    requiredRoles: [],
  }
  
  