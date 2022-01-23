const discord = require("discord.js")
const db = require('quick.db')

const partdb = require("../partsdb.json")
const cars = require("../cardb.json")
module.exports = {
    commands: ['upgrade'],
    description: 'Upgrade a part on your car!',
    permissionError: '',
    
    callback: (message, arguments, arguments2, text, client) => {
        const user1 = message.author
        const parts = db.fetch(`parts_${user1.id}`)
        const user1cars = db.fetch(`cars_${user1.id}`)
        const parttoinstall = arguments[0]
        if(!parttoinstall) return message.channel.send("Specify a part! Try: Exhaust, Tires, Intake, Turbo, Suspension, Weight, Spoiler, or BodyKit")
        const car = arguments.splice(1).join(" ")
        if(!car) return message.channel.send("Specify a car!")
       
        let list2 = cars.Cars
        

        if(!parts) return message.channel.send("You dont have any parts!")
        let list = partdb.Parts
        let list3 = ["exhaust", "tires", "intake", "turbo", "suspension", "bodykit", "engine", "spoiler", "weight"]
        let exhaustlist = ['t1exhaust', 't2exhaust', 't3exhaust']
        let tireslist = ['t1tires', 't1drifttires', 't2tires', 't1wintertires', 't2wintertires', 't2drifttires']
        let turbolist = ['turbo', 'dualturbo', 'supercharger']
        let intakelist = ['t1intake', 't2intake', 't3intake']
        let enginelist = ['2jz-gte', 'v10', 'v12', 'ls1', 'ls2', 'ls3']
        let susplist = ['driftsuspension', 'racesuspension', 't2racesuspension']
        let nitrolist = ['tier1nitro']
        let spoilerlist = ['t1spoiler']
        let weightlist = ['t1weightreduction']
        if(!list3.includes(parttoinstall.toLowerCase())) return message.channel.send("Thats not an available part! Try: Exhaust, Tires, Intake, Turbo, Suspension, Weight, Spoiler, or BodyKit")
        if(!list2[car.toLowerCase()]) return message.channel.send("Thats not an available car!")
        if(!user1cars.includes(cars.Cars[car.toLowerCase()].Name.toLowerCase())) return message.channel.send(`You dont own that car! Your cars: ${user1cars.join(', ')}`)

        
        let carexhaust = db.fetch(`${cars.Cars[car.toLowerCase()].Name}exhaust_${user1.id}`)
        let cartires= db.fetch(`${cars.Cars[car.toLowerCase()].Name}tires_${user1.id}`)
        let carturbo= db.fetch(`${cars.Cars[car.toLowerCase()].Name}turbo_${user1.id}`)
		let carintake = db.fetch(`${cars.Cars[car.toLowerCase()].Name}intake_${user1.id}`)
        let carsusp = db.fetch(`${cars.Cars[car.toLowerCase()].Name}suspension_${user1.id}`)
        let nitro = db.fetch(`${cars.Cars[car.toLowerCase()].Name}nitro_${user1.id}`)
        let carspoiler = db.fetch(`${cars.Cars[car.toLowerCase()].Name}spoiler_${user1.id}`)
        let carsweight = db.fetch(`${cars.Cars[car.toLowerCase()].Name}weight_${user1.id}`)

        let usercarspeed = db.fetch(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`)
        let carengine = db.fetch(`${cars.Cars[car.toLowerCase()].Name}engine_${message.author.id}`)
        parseInt(usercarspeed)
        let partarraylength = parts.length
        let userparts = []
        let actpart
        for (var i = 0; i < partarraylength; i++ && parts !== ['no parts']) {
    
            if(!parts || parts.length == 0) {
                actpart = "no parts"
            }
            actpart = parts[i]
            userparts.push(`${partdb.Parts[actpart.toLowerCase()].Emote} ${partdb.Parts[actpart.toLowerCase()].Name}`)
            //Do something
        }
           if(parttoinstall.toLowerCase() == "exhaust"){
               if(carexhaust) return message.channel.send("You already have an exhaust installed!")
               const filter = (m = discord.Message) => {
                return m.author.id === message.author.id
            }
            let choice, collector = message.channel.createMessageCollector({
                filter,
                max: 1,
                time: 1000 * 20
            })
            let partsembed = new discord.MessageEmbed()
            .setTitle("Your Parts")
            .setDescription(`${parts.join('\n')}`)
            .setColor("#60b0f4")

            message.channel.send({embeds: [partsembed]})
                message.channel.send({content: "Which exhaust would you like to install on your car? Your parts are listed below", embeds: [partsembed]})
                collector.on('collect', msg => {
                    let exhausttoinstall = msg.content.toLowerCase()
                    if(!exhaustlist.includes(exhausttoinstall)) return message.channel.send("Thats not an exhaust!")
               if(!parts.includes(partdb.Parts[exhausttoinstall].Name.toLowerCase())) return message.channel.send("You dont have that part!");
               const filtered = parts.filter(e => e !== exhausttoinstall);
               db.set(`${cars.Cars[car.toLowerCase()].Name}exhaust_${user1.id}`, `${partdb.Parts[exhausttoinstall].Name}`)
               db.set(`parts_${message.author.id}`, filtered)
               db.add(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`, partdb.Parts[exhausttoinstall].AddedSpeed)
               db.add(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, partdb.Parts[exhausttoinstall].sellprice )
               message.channel.send(`You installed a ${exhausttoinstall} on your ${cars.Cars[car.toLowerCase()].Name} and added ${partdb.Parts[exhausttoinstall].AddedSpeed} speed!`)
        })
        }
           else if(parttoinstall.toLowerCase()  == "tires"){
            if(cartires) return message.channel.send("You already have a tires installed!")
            const filter = (m = discord.Message) => {
                return m.author.id === message.author.id
            }
            let choice, collector = message.channel.createMessageCollector({
                filter,
                max: 1,
                time: 1000 * 20
            })
            let partsembed = new discord.MessageEmbed()
            .setTitle("Your Parts")
            .setDescription(`${userparts.join('\n')}`)
            .setColor("#60b0f4")

                message.channel.send({content: "Which tires would you like to install on your car? Your parts are listed below", embeds: [partsembed]})
             collector.on('collect', msg => {
                 let tirestoinstall = msg.content
                 if(!tirestoinstall) return;
                 if(!tireslist.includes(tirestoinstall.toLowerCase())) return message.channel.send("Thats not a tire!")
            if(!parts.includes(partdb.Parts[tirestoinstall.toLowerCase()].Name.toLowerCase())) return message.channel.send("You dont have that part!");
            const filtered = parts.filter(e => e !== tirestoinstall);
            if(tirestoinstall.toLowerCase()  == "t1drifttires" || tirestoinstall.toLowerCase()  == "t2drifttires"){
                message.channel.send(`You installed ${tirestoinstall} on your ${cars.Cars[car.toLowerCase()].Name} and added ${partdb.Parts[tirestoinstall.toLowerCase()].DriftScore} drift score, but lost ${partdb.Parts[tirestoinstall.toLowerCase()].DecreaseSpeed} speed.`)
                db.set(`${cars.Cars[car.toLowerCase()].Name}tires_${message.author.id}`, `${partdb.Parts[tirestoinstall.toLowerCase()].Name}`)
                db.set(`parts_${message.author.id}`, filtered)
                db.subtract(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`, partdb.Parts[tirestoinstall.toLowerCase()].DecreaseSpeed)
                db.add(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, partdb.Parts[tirestoinstall.toLowerCase()].sellprice )
                db.add(`${cars.Cars[car.toLowerCase()].Name}drift_${message.author.id}`, partdb.Parts[tirestoinstall.toLowerCase()].DriftScore)
            }
            else if(tirestoinstall.toLowerCase()  == "t1wintertires" || tirestoinstall.toLowerCase()  == "t2wintertires"){
                db.set(`${cars.Cars[car.toLowerCase()].Name}tires_${message.author.id}`, `${partdb.Parts[tirestoinstall.toLowerCase()].Name}`)
                db.set(`parts_${message.author.id}`, filtered)
                db.add(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, partdb.Parts[tirestoinstall.toLowerCase()].sellprice )
                db.add(`${cars.Cars[car.toLowerCase()].Name}snowscore_${message.author.id}`, partdb.Parts[tirestoinstall.toLowerCase()].AddedSnow)

            }
            else{
                db.set(`${cars.Cars[car.toLowerCase()].Name}tires_${message.author.id}`, `${partdb.Parts[tirestoinstall.toLowerCase()].Name}`)
                db.set(`parts_${message.author.id}`, filtered)
                db.add(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`, partdb.Parts[tirestoinstall.toLowerCase()].AddedSpeed)
                db.add(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, partdb.Parts[tirestoinstall.toLowerCase()].sellprice )
                message.channel.send(`You installed a ${tirestoinstall.toLowerCase()} on your ${cars.Cars[car.toLowerCase()].Name} and added ${partdb.Parts[tirestoinstall.toLowerCase()].AddedSpeed} speed!`)

            }
     })
     }
               else if(parttoinstall.toLowerCase()  == "turbo"){
                if(carturbo) return message.channel.send("You already have a turbo installed!")
                const filter = (m = discord.Message) => {
                    return m.author.id === message.author.id
                }
                let choice, collector = message.channel.createMessageCollector({
                    filter,
                    max: 1,
                    time: 1000 * 20
                })
                let partsembed = new discord.MessageEmbed()
                .setTitle("Your Parts")
                .setDescription(`${userparts.join('\n')}`)
                .setColor("#60b0f4")
    
                    message.channel.send({content: "Which turbo would you like to install on your car? Your parts are listed below", embeds: [partsembed]})
                 collector.on('collect', msg => {
                     let turbotoinstall = msg.content.toLowerCase()
                     if(!turbotoinstall) return;
                     if(!turbolist.includes(turbotoinstall)) return message.channel.send("Thats not a turbo!")
                if(!parts.includes(partdb.Parts[turbotoinstall].Name.toLowerCase())) return message.channel.send("You dont have that part!");
                const filtered = parts.filter(e => e !== turbotoinstall);
                db.set(`${cars.Cars[car.toLowerCase()].Name}turbo_${user1.id}`, `${partdb.Parts[turbotoinstall].Name}`)
                db.set(`parts_${message.author.id}`, filtered)
                db.add(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`, partdb.Parts[turbotoinstall].AddedSpeed)
                db.add(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, partdb.Parts[turbotoinstall].sellprice )
                message.channel.send(`You installed a ${turbotoinstall} on your ${cars.Cars[car.toLowerCase()].Name} and added ${partdb.Parts[turbotoinstall].AddedSpeed} speed!`)
         })
         }
         else if(parttoinstall.toLowerCase()  == "spoiler"){
            if(carspoiler) return message.channel.send("You already have a spoiler installed!")
            const filter = (m = discord.Message) => {
                return m.author.id === message.author.id
            }
            let choice, collector = message.channel.createMessageCollector({
                filter,
                max: 1,
                time: 1000 * 20
            })
            let partsembed = new discord.MessageEmbed()
            .setTitle("Your Parts")
            .setDescription(`${userparts.join('\n')}`)
            .setColor("#60b0f4")

                message.channel.send({content: "Which spoiler would you like to install on your car? Your parts are listed below", embeds: [partsembed]})
             collector.on('collect', msg => {
                 let spoilertoinstall = msg.content.toLowerCase()
                 if(!spoilertoinstall) return;
                 if(!spoilerlist.includes(spoilertoinstall)) return message.channel.send("Thats not a turbo!")
            if(!parts.includes(partdb.Parts[spoilertoinstall].Name.toLowerCase())) return message.channel.send("You dont have that part!");
            const filtered = parts.filter(e => e !== spoilertoinstall);
            db.set(`${cars.Cars[car.toLowerCase()].Name}spoiler_${user1.id}`, `${partdb.Parts[spoilertoinstall].Name}`)
            db.set(`parts_${message.author.id}`, filtered)
            db.add(`${cars.Cars[car.toLowerCase()].Name}aero_${message.author.id}`, partdb.Parts[spoilertoinstall].Aero)
            db.add(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, partdb.Parts[spoilertoinstall].sellprice )
            message.channel.send(`You installed a ${spoilertoinstall} on your ${cars.Cars[car.toLowerCase()].Name} and added ${partdb.Parts[spoilertoinstall].Aero} aero!`)
     })
     }
         else if(parttoinstall.toLowerCase()  == "intake"){
            if(carintake) return message.channel.send("You already have an intake installed!")
            const filter = (m = discord.Message) => {
                return m.author.id === message.author.id
            }
            let choice, collector = message.channel.createMessageCollector({
                filter,
                max: 1,
                time: 1000 * 20
            })
            let partsembed = new discord.MessageEmbed()
            .setTitle("Your Parts")
            .setDescription(`${userparts.join('\n')}`)
            .setColor("#60b0f4")

                message.channel.send({content: "Which intake would you like to install on your car? Your parts are listed below", embeds: [partsembed]})
             collector.on('collect', msg => {
                 let intaketoinstall = msg.content.toLowerCase()
                 if(!intaketoinstall) return;
                 if(!intakelist.includes(intaketoinstall)) return message.channel.send("Thats not an intake!")
            if(!parts.includes(partdb.Parts[intaketoinstall].Name.toLowerCase())) return message.channel.send("You dont have that part!");
            const filtered = parts.filter(e => e !== intaketoinstall);
            db.set(`${cars.Cars[car.toLowerCase()].Name}intake_${user1.id}`, `${partdb.Parts[intaketoinstall].Name}`)
            db.set(`parts_${message.author.id}`, filtered)
            db.add(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`, partdb.Parts[intaketoinstall].AddedSpeed)
            db.add(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, partdb.Parts[intaketoinstall].sellprice )
            message.channel.send(`You installed a ${intaketoinstall} on your ${cars.Cars[car.toLowerCase()].Name} and added ${partdb.Parts[intaketoinstall].AddedSpeed} speed!`)
     })
     }
     else if(parttoinstall.toLowerCase()  == "suspension"){
        if(carsusp) return message.channel.send("You already have a suspension kit installed!")
        const filter = (m = discord.Message) => {
            return m.author.id === message.author.id
        }
        let choice, collector = message.channel.createMessageCollector({
            filter,
            max: 1,
            time: 1000 * 20
        })
        let partsembed = new discord.MessageEmbed()
        .setTitle("Your Parts")
        .setDescription(`${userparts.join('\n')}`)
        .setColor("#60b0f4")

            message.channel.send({content: "Which suspension would you like to install on your car? Your parts are listed below", embeds: [partsembed]})
         collector.on('collect', msg => {
             let sustoinstall = msg.content
             if(!sustoinstall) return;
             if(!susplist.includes(sustoinstall.toLowerCase())) return message.channel.send("Thats not a suspension kit!")
        if(!parts.includes(partdb.Parts[sustoinstall.toLowerCase()].Name.toLowerCase())) return message.channel.send("You dont have that part!");
        if(sustoinstall.toLowerCase() == "driftsuspension"){

            const filtered = parts.filter(e => e !== sustoinstall.toLowerCase());
            db.set(`${cars.Cars[car.toLowerCase()].Name}suspension_${user1.id}`, `${partdb.Parts[sustoinstall.toLowerCase()].Name}`)
            db.set(`parts_${message.author.id}`, filtered)
            db.add(`${cars.Cars[car.toLowerCase()].Name}drift_${message.author.id}`, partdb.Parts[sustoinstall.toLowerCase()].DriftScore)
            db.subtract(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`, partdb.Parts[sustoinstall.toLowerCase()].DecreaseSpeed)
            db.add(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, partdb.Parts[sustoinstall.toLowerCase()].sellprice )
            message.channel.send(`You installed a ${sustoinstall.toLowerCase()} on your ${cars.Cars[car.toLowerCase()].Name} and added ${partdb.Parts[sustoinstall.toLowerCase()].DriftScore} drift score, but lost ${partdb.Parts[sustoinstall.toLowerCase()].DecreaseSpeed} speed.`)
        }
        else if(sustoinstall.toLowerCase()  == "racesuspension" || sustoinstall.toLowerCase()  == "t2racesuspension") {
            const filtered = parts.filter(e => e !== sustoinstall);
            db.set(`${cars.Cars[car.toLowerCase()].Name}suspension_${user1.id}`, `${partdb.Parts[sustoinstall.toLowerCase()].Name}`)
            db.set(`parts_${message.author.id}`, filtered)
            db.add(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`, partdb.Parts[sustoinstall.toLowerCase()].AddedSpeed)
            db.add(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, partdb.Parts[sustoinstall.toLowerCase()].sellprice )
            db.subtract(`${cars.Cars[car.toLowerCase()].Name}drift_${message.author.id}`, partdb.Parts[sustoinstall.toLowerCase()].DecreasedDrift)

            message.channel.send(`You installed a ${sustoinstall.toLowerCase()} on your ${cars.Cars[car.toLowerCase()].Name} and added ${partdb.Parts[sustoinstall.toLowerCase()].AddedSpeed} speed!`)
        }
 })
 }
                        else if(parttoinstall.toLowerCase()  == "bodykit"){
                            if(!cars.Cars[car.toLowerCase()].Bodykit) return message.channel.send("This car is not eligible to have a body kit.")
                            if(!parts.includes("bodykit")) return message.channel.send("You dont have a body kit to install!");
                            if(db.fetch(`${cars.Cars[car.toLowerCase()].Name}bodykit_${user1.id}`) == true) return message.channel.send("You already have a body kit installed!")
                                const filtered = parts.filter(e => e !== parttoinstall);
                                db.set(`parts_${message.author.id}`, filtered)
                                db.set(`${cars.Cars[car.toLowerCase()].Name}bodykit_${user1.id}`, true)
                                db.add(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, partdb.Parts[parttoinstall].sellprice )
                                message.channel.send(`You installed a ${parttoinstall} on your ${cars.Cars[car.toLowerCase()].Name}.`)
                            
                            }

                           

                            else if(parttoinstall.toLowerCase()  == "engine"){
                                if(carengine) return message.channel.send("You already have an engine installed!")
                                const filter = (m = discord.Message) => {
                                    return m.author.id === message.author.id
                                }
                                let choice, collector = message.channel.createMessageCollector({
                                    filter,
                                    max: 1,
                                    time: 1000 * 20
                                })
                                let engines = db.fetch(`engines_${message.author.id}`)
                                let partsembed = new discord.MessageEmbed()
                                .setTitle("Your Parts")
                                .setDescription(`${userparts.join('\n')}`)
                                .setColor("#60b0f4")
                    
                                    message.channel.send({content: "Which engine would you like to install on your car? Your parts are listed below", embeds: [partsembed]})
                                 collector.on('collect', msg => {
                                     let enginetoinstall = msg.content.toLowerCase()
                                     if(!enginetoinstall) return;
                                     if(!enginelist.includes(enginetoinstall)) return message.channel.send("Thats not an engine!")
                                if(!parts.includes(partdb.Parts[enginetoinstall].Name.toLowerCase())) return message.channel.send("You dont have that engine!");
                                const filtered = parts.filter(e => e !== enginetoinstall);
                                db.set(`${cars.Cars[car.toLowerCase()].Name}engine_${user1.id}`, `${partdb.Parts[enginetoinstall].Name}`)
                                db.set(`parts_${message.author.id}`, filtered)
                                db.add(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`, partdb.Parts[enginetoinstall].AddedSpeed)
                                db.add(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, partdb.Parts[enginetoinstall].sellprice )
                                message.channel.send(`You installed a ${partdb.Parts[enginetoinstall].Name} on your ${cars.Cars[car.toLowerCase()].Name} and added ${partdb.Parts[enginetoinstall].AddedSpeed} speed!`)
                         })
                         }

                         else if(parttoinstall.toLowerCase()  == "weight"){
                            if(carsweight) return message.channel.send("You already have a weight kit installed!")
                            const filter = (m = discord.Message) => {
                                return m.author.id === message.author.id
                            }
                            let choice, collector = message.channel.createMessageCollector({
                                filter,
                                max: 1,
                                time: 1000 * 20
                            })
                            let engines = db.fetch(`parts_${message.author.id}`)
                            let partsembed = new discord.MessageEmbed()
                            .setTitle("Your Parts")
                            .setDescription(`${userparts.join('\n')}`)
                            .setColor("#60b0f4")
                
                                message.channel.send({content: "Which weight kit would you like to install on your car? Your parts are listed below", embeds: [partsembed]})
                             collector.on('collect', msg => {
                                 let weighttoinstall = msg.content.toLowerCase()
                                 if(!weighttoinstall) return;
                                 if(!weightlist.includes(weighttoinstall)) return message.channel.send("Thats not a weight kit!")
                            if(!parts.includes(partdb.Parts[weighttoinstall].Name.toLowerCase())) return message.channel.send("You dont have that weight kit!");
                            const filtered = parts.filter(e => e !== weighttoinstall);
                            db.set(`${cars.Cars[car.toLowerCase()].Name}weight_${user1.id}`, `${partdb.Parts[weighttoinstall].Name}`)
                            db.set(`parts_${message.author.id}`, filtered)
                            db.add(`${cars.Cars[car.toLowerCase()].Name}speed_${message.author.id}`, partdb.Parts[weighttoinstall].AddedSpeed)
                            db.add(`${cars.Cars[car.toLowerCase()].Name}drift_${message.author.id}`, partdb.Parts[weighttoinstall].DriftScore)
                            db.add(`${cars.Cars[car.toLowerCase()].Name}resale_${message.author.id}`, partdb.Parts[weighttoinstall].sellprice )
                            message.channel.send(`You installed a ${partdb.Parts[weighttoinstall].Name} kit on your ${cars.Cars[car.toLowerCase()].Name} and added ${partdb.Parts[weighttoinstall].AddedSpeed} speed, and ${partdb.Parts[weighttoinstall].DriftScore} drift score.`)
                     })
                     }
                       
   
           
          
       

    },
    permissions: '',
    requiredRoles: [],
  }
  