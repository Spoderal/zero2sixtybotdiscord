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
        let partslist = ['turbo', 'tires', 'intake', 'exhaust', 'engine', 'suspension', 'spoiler']

        if(!selling) return message.channel.send("Specify the part you want to remove! (Turbo, Tires, Intake, Exhaust, Engine, Suspension)")
        if(!car) return message.channel.send("Specify the car you want to remove the part from!")
        if(!cars.Cars[car.toLowerCase()]) return message.channel.send("Thats not a car!")
        if(!partslist.includes(selling.toLowerCase())) return message.channel.send("Specify which part you want to sell! Turbo, Exhaust, Tires, Engine, Suspension or Intake.")
        if(!usercars.includes(cars.Cars[car.toLowerCase()].Name.toLowerCase())) return message.channel.send("You dont have that car!")
        let turbo = db.fetch(`${cars.Cars[car.toLowerCase()].Name}turbo_${message.author.id}`)
        let tires = db.fetch(`${cars.Cars[car.toLowerCase()].Name}tires_${message.author.id}`)
        let intake = db.fetch(`${cars.Cars[car.toLowerCase()].Name}intake_${message.author.id}`)
        let suspension = db.fetch(`${cars.Cars[car.toLowerCase()].Name}suspension_${message.author.id}`)
        let exhaust = db.fetch(`${cars.Cars[car.toLowerCase()].Name}exhaust_${message.author.id}`)
        let engine = db.fetch(`${cars.Cars[car.toLowerCase()].Name}engine_${message.author.id}`)
        let spoiler =db.fetch(`${cars.Cars[car.toLowerCase()].Name}spoiler_${message.author.id}`)
        if(cars.Cars[car.toLowerCase()].Junked) return message.channel.send("Wait until you restore this car to remove parts!")
        if(selling.toLowerCase() == "turbo"){
            if(turbo == 'None' || turbo == null || turbo == []) return message.channel.send("This car doesnt have a turbo installed.")
            const filtered = userparts.filter(e => e !== turbo);
            let resale = parts.Parts[turbo.toLowerCase()].sellprice
            db.push(`parts_${message.author.id}`, turbo.toLowerCase())
            db.subtract(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, parts.Parts[turbo.toLowerCase()].sellprice)
            db.subtract(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`, parts.Parts[turbo.toLowerCase()].AddedSpeed)
            db.delete(`${cars.Cars[car.toLowerCase()].Name}turbo_${message.author.id}`)
            message.channel.send(`You removed your ${selling}!`)

        }
        if(selling.toLowerCase() == "tires"){
            if(tires == 'None' || tires == null || tires == []) return message.channel.send("This car doesnt have any tires installed.")
            const filtered = userparts.filter(e => e !== tires);
            let resale = parts.Parts[tires.toLowerCase()].sellprice
            db.delete(`${cars.Cars[car.toLowerCase()].Name}tires_${message.author.id}`)
            if(tires.toLowerCase() == "t1drifttires" || tires.toLowerCase() == "t2drifttires"){
                db.subtract(`${cars.Cars[car.toLowerCase()].Name}drift_${message.author.id}`, parts.Parts[tires.toLowerCase()].DriftScore)
                db.add(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`, parts.Parts[tires.toLowerCase()].DecreaseSpeed)
                db.subtract(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, parts.Parts[tires.toLowerCase()].sellprice)

            }
             else if(tires.toLowerCase()  == "wintertires"){
                db.subtract(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, parts.Parts[tires.toLowerCase()].sellprice )
                message.channel.send(`You removed ${tires.toLowerCase()} from your ${cars.Cars[car.toLowerCase()].Name} and gained ${parts.Parts[tires.toLowerCase()].DecreaseSpeed} speed!`)
            }
            else if(tires.toLowerCase()  == "t1wintertires" || tires.toLowerCase()  == "t2wintertires"){
                db.set(`${cars.Cars[car.toLowerCase()].Name}tires_${message.author.id}`, `${partdb.Parts[tires.toLowerCase()].Name}`)
                db.subtract(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, partdb.Parts[tires.toLowerCase()].sellprice )
                db.subtract(`${cars.Cars[car.toLowerCase()].Name}snowscore_${message.author.id}`, partdb.Parts[tires.toLowerCase()].AddedSnow)

            }
            else {
                db.subtract(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, parts.Parts[tires.toLowerCase()].sellprice)
                db.subtract(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`, parts.Parts[tires.toLowerCase()].AddedSpeed)
                
            }

            db.push(`parts_${message.author.id}`, tires.toLowerCase())
            message.channel.send(`You removed your ${selling}!`)

        }
        if(selling.toLowerCase() == "suspension"){
            if(suspension == 'None' || suspension == null || suspension == []) return message.channel.send("This car doesnt have a suspension installed.")
            const filtered = userparts.filter(e => e !== suspension.toLowerCase());
            let resale = parts.Parts[suspension.toLowerCase()].sellprice
            db.delete(`${cars.Cars[car.toLowerCase()].Name}suspension_${message.author.id}`)
            if(suspension.toLowerCase() == "driftsuspension"){
                db.subtract(`${cars.Cars[car.toLowerCase()].Name}drift_${message.author.id}`, parts.Parts[suspension.toLowerCase()].DriftScore)
                db.add(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`, parts.Parts[suspension.toLowerCase()].DecreaseSpeed)
                db.subtract(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, parts.Parts[suspension.toLowerCase()].sellprice)

            }
         
            else if(suspension.toLowerCase() == "racesuspension" || suspension.toLowerCase() == "t2racesuspension"){
                db.subtract(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, parts.Parts[suspension.toLowerCase()].sellprice)
                db.subtract(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`, parts.Parts[suspension.toLowerCase()].AddedSpeed)
                db.add(`${cars.Cars[car.toLowerCase()].Name}drift_${message.author.id}`, parts.Parts[suspension.toLowerCase()].DecreasedDrift)

                
            }
            db.push(`parts_${message.author.id}`, suspension.toLowerCase())
            message.channel.send(`You removed your ${selling}!`)

        }
        if(selling.toLowerCase() == "exhaust"){
            if(exhaust == 'Stock' || exhaust == null || exhaust == []) return message.channel.send("This car doesnt have any other exhaust installed.")
            let resale = parts.Parts[exhaust.toLowerCase()].sellprice
            const filtered = userparts.filter(e => e !== exhaust.toLowerCase());
            db.delete(`${cars.Cars[car.toLowerCase()].Name}exhaust_${message.author.id}`)
            db.push(`parts_${message.author.id}`, exhaust.toLowerCase())
            db.subtract(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, parts.Parts[exhaust.toLowerCase()].sellprice)
            db.subtract(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`, parts.Parts[exhaust.toLowerCase()].AddedSpeed)
            message.channel.send(`You removed your ${selling}!`)

        }

        if(selling.toLowerCase() == "intake"){
            if(intake == 'None' || intake == null || intake == []) return message.channel.send("This car doesnt have any intake installed.")
            let resale = parts.Parts[intake.toLowerCase()].sellprice
            const filtered = userparts.filter(e => e !== intake.toLowerCase());
            db.delete(`${cars.Cars[car.toLowerCase()].Name}intake_${message.author.id}`)
            db.push(`parts_${message.author.id}`, intake.toLowerCase())
            db.subtract(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, parts.Parts[intake.toLowerCase()].sellprice)
            db.subtract(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`, parts.Parts[intake.toLowerCase()].AddedSpeed)
            message.channel.send(`You removed your ${selling}!`)

        }

        if(selling.toLowerCase() == "engine"){
            if(engine == cars.Cars[car.toLowerCase()].Engine || engine == null || engine == []) return message.channel.send("This car doesnt have a new engine installed.")
            let resale = parts.Parts[engine.toLowerCase()].sellprice
            const filtered = userparts.filter(e => e !== engine.toLowerCase());
            db.delete(`${cars.Cars[car.toLowerCase()].Name}engine_${message.author.id}`)
            db.push(`parts_${message.author.id}`, engine.toLowerCase())
            db.subtract(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, parts.Parts[engine.toLowerCase()].sellprice)
            db.subtract(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`, parts.Parts[engine.toLowerCase()].AddedSpeed)
            message.channel.send(`You removed your ${selling}!`)

        }

        if(selling.toLowerCase() == "spoiler"){
            if(spoiler == 'None' || spoiler == null || spoiler == []) return message.channel.send("This car doesnt have a spoiler installed.")
            let resale = parts.Parts[spoiler.toLowerCase()].sellprice
            const filtered = userparts.filter(e => e !== spoiler.toLowerCase());
            db.delete(`${cars.Cars[car.toLowerCase()].Name}spoiler_${message.author.id}`)
            db.push(`parts_${message.author.id}`, spoiler.toLowerCase())
            db.subtract(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, parts.Parts[spoiler.toLowerCase()].sellprice)
            db.subtract(`${cars.Cars[car.toLowerCase()].Name}aero_${message.author.id}`, parts.Parts[spoiler.toLowerCase()].Aero)
            message.channel.send(`You removed your ${selling}!`)

        }


       

      

        
    },
    permissions: '',
    requiredRoles: [],
  }
  
  