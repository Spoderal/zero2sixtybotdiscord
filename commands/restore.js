module.exports = {
    commands: ['restore'],
    description: 'Installs a part on your junk car!',
    permissionError: '',
    
    callback: (message, arguments, arguments2, text) => {
        const db = require('quick.db')
        const user1 = message.author
        const started = db.fetch(`created_${message.author.id}`)
        if(!started) return message.channel.send("You need to create an account!")
        const user1cars = db.fetch(`cars_${user1.id}`)
        const user1parts = db.fetch(`junkparts_${user1.id}`)
        const partdb = require("../partsdb.json")
        const cars = require("../cardb.json")
        let restorelist = ["engine", "exhaust", "tires", "suspension"]
        let restoreexhaust = ['j1exhaust']
        let restoreengine = ['v8', 'v6', 'rotary']
        let restoretires = ['j1tires']
        let restoresus = ['j1suspension']

        let torestore = arguments[0]
        if(!restorelist.includes(torestore.toLowerCase())) return message.channel.send("Thats not a restorable part!")
        let usercar = arguments.splice(1).join(' ')
        if(!usercar) return message.channel.send("Specify a car!")
        if(!cars.Cars[usercar.toLowerCase()]) return message.channel.send("Thats not a car!")
        if(!cars.Cars[usercar.toLowerCase()].Junked) return message.channel.send("Thats not a junk car!")
        if(!user1cars.includes(usercar.toLowerCase())) return message.channel.send("You don't own that car!")
        let restoration = db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}restoration_${message.author.id}`)
        if(restoration == 100) return message.channel.send("This car is already restored!")
        let junkparts = db.fetch(`restoreparts_${message.author.id}`) || []
        if(!junkparts) return message.channel.send("You don't own any restoration parts!")
        if(torestore.toLowerCase() == "engine"){
            message.channel.send(`What engine would you like to put in this car? Your parts: ${junkparts.join(', ')}`)
            let carengine = db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}engine_${message.author.id}`)
            if(carengine !== "Missing") return message.channel.send("This car already has an engine installed!")
            const filter = (m = discord.Message) => {
                return m.author.id === message.author.id
            }
            let choice, collector = message.channel.createMessageCollector({
                filter,
                max: 1,
                time: 1000 * 20
            })

            collector.on('collect', msg => {
                let enginechosen = msg.content.toLowerCase()
                if(!enginechosen) return;
                if(!restoreengine.includes(enginechosen)) return message.channel.send("Thats not an engine!")
                if(!partdb.Parts[enginechosen.toLowerCase()]) return message.channel.send('Thats not an engine!')
                if(!junkparts.includes(partdb.Parts[enginechosen].Name.toLowerCase())) return message.channel.send("You dont have that engine!");

                db.set(`${cars.Cars[usercar.toLowerCase()].Name}engine_${message.author.id}`, partdb.Parts[enginechosen].Name)
                const filtered = junkparts.filter(e => e !== enginechosen);
                db.set(`restoreparts_${message.author.id}`, filtered)
                db.add(`${cars.Cars[usercar.toLowerCase()].Name}restoration_${message.author.id}`, 25)
                db.add(`${cars.Cars[usercar.toLowerCase()].Name}resale_${message.author.id}`, partdb.Parts[enginechosen].sellprice)

                message.channel.send("Restored the engine, and added 25% to the restoration percentage.")

                if(db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}restoration_${message.author.id}`) == 100){
                    const filtered = user1cars.filter(e => e !== usercar.toLowerCase());

                    message.channel.send(`You've finished the restoration!`)
                    db.set(`${cars.Cars[usercar.toLowerCase()].Name}restored_${message.author.id}`, true)
                    let restoredcar = cars.Cars[usercar.toLowerCase()].restored
                    let restoredspeed = db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}speed_${message.author.id}`)
                    let restoredresale = db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}resale_${message.author.id}`)

                    db.set(`cars_${message.author.id}`, filtered)
                    db.push(`cars_${message.author.id}`, cars.Cars[usercar.toLowerCase()].restored)
                    db.set(`${cars.Cars[restoredcar].Name}speed_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}speed_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}resale_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}resale_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}engine_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}engine_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}exhaust_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}exhaust_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}tires_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}tires_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}suspension_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}suspension_${message.author.id}`))


                }
            })
        }

        else  if(torestore.toLowerCase() == "exhaust"){
            let carexhaust = db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}exhaust_${message.author.id}`)
            if(carexhaust !== "Broken") return message.channel.send("This car already has an exhaust installed!")
            message.channel.send(`What exhaust would you like to put in this car? Your parts: ${junkparts.join(', ')}`)
            const filter = (m = discord.Message) => {
                return m.author.id === message.author.id
            }
            let choice, collector = message.channel.createMessageCollector({
                filter,
                max: 1,
                time: 1000 * 20
            })

            collector.on('collect', msg => {
                let exhaustchosen = msg.content.toLowerCase()
                if(!exhaustchosen) return;
                if(!restoreexhaust.includes(exhaustchosen)) return message.channel.send("Thats not an exhaust!")

                if(!partdb.Parts[exhaustchosen.toLowerCase()]) return message.channel.send('Thats not an exhaust!')
                if(!junkparts.includes(partdb.Parts[exhaustchosen].Name.toLowerCase())) return message.channel.send("You dont have that exhaust!");

                db.set(`${cars.Cars[usercar.toLowerCase()].Name}exhaust_${message.author.id}`, partdb.Parts[exhaustchosen].Name)
                const filtered = junkparts.filter(e => e !== exhaustchosen);
                db.set(`restoreparts_${message.author.id}`, filtered)
                db.add(`${cars.Cars[usercar.toLowerCase()].Name}restoration_${message.author.id}`, 25)
                db.add(`${cars.Cars[usercar.toLowerCase()].Name}speed_${message.author.id}`, partdb.Parts[exhaustchosen].AddedSpeed)
                db.add(`${cars.Cars[usercar.toLowerCase()].Name}resale_${message.author.id}`, partdb.Parts[exhaustchosen].sellprice)

                message.channel.send(`Restored the exhaust, and added 25% to the restoration percentage. You also gained ${partdb.Parts[exhaustchosen].AddedSpeed} speed!`)

                if(db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}restoration_${message.author.id}`) == 100){
                    const filtered = user1cars.filter(e => e !== usercar.toLowerCase());

                    message.channel.send(`You've finished the restoration!`)
                    db.set(`${cars.Cars[usercar.toLowerCase()].Name}restored_${message.author.id}`, true)
                    let restoredcar = cars.Cars[usercar.toLowerCase()].restored
                    let restoredspeed = db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}speed_${message.author.id}`)
                    let restoredresale = db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}resale_${message.author.id}`)

                    db.set(`cars_${message.author.id}`, filtered)
                    db.push(`cars_${message.author.id}`, cars.Cars[usercar.toLowerCase()].restored)
                    db.set(`${cars.Cars[restoredcar].Name}speed_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}speed_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}resale_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}resale_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}engine_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}engine_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}exhaust_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}exhaust_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}tires_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}tires_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}suspension_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}suspension_${message.author.id}`))


                }
            })

        }
        else  if(torestore.toLowerCase() == "tires"){
            let cartires = db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}tires_${message.author.id}`)
            if(cartires !== "Flat") return message.channel.send("This car already has tires installed!")
            message.channel.send(`Which tires would you like to put in this car? Your parts: ${junkparts.join(', ')}`)
            const filter = (m = discord.Message) => {
                return m.author.id === message.author.id
            }
            let choice, collector = message.channel.createMessageCollector({
                filter,
                max: 1,
                time: 1000 * 20
            })

            collector.on('collect', msg => {
                let tireschosen = msg.content.toLowerCase()
                if(!tireschosen) return;
                if(!restoretires.includes(tireschosen)) return message.channel.send("Thats not a tire!")

                if(!partdb.Parts[tireschosen.toLowerCase()]) return message.channel.send('Thats not a tire!')
                if(!junkparts.includes(partdb.Parts[tireschosen].Name.toLowerCase())) return message.channel.send("You dont have that tire!");

                db.set(`${cars.Cars[usercar.toLowerCase()].Name}tires_${message.author.id}`, partdb.Parts[tireschosen].Name)
                const filtered = junkparts.filter(e => e !== tireschosen);
                db.set(`restoreparts_${message.author.id}`, filtered)
                db.add(`${cars.Cars[usercar.toLowerCase()].Name}restoration_${message.author.id}`, 25)
                db.add(`${cars.Cars[usercar.toLowerCase()].Name}speed_${message.author.id}`, partdb.Parts[tireschosen].AddedSpeed)
                db.add(`${cars.Cars[usercar.toLowerCase()].Name}resale_${message.author.id}`, partdb.Parts[tireschosen].sellprice)

                message.channel.send(`Restored the tires, and added 25% to the restoration percentage. You also gained ${partdb.Parts[tireschosen].AddedSpeed} speed!`)

                if(db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}restoration_${message.author.id}`) == 100){
                    const filtered = user1cars.filter(e => e !== usercar.toLowerCase());

                    message.channel.send(`You've finished the restoration!`)
                    db.set(`${cars.Cars[usercar.toLowerCase()].Name}restored_${message.author.id}`, true)
                    let restoredcar = cars.Cars[usercar.toLowerCase()].restored
                    let restoredspeed = db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}speed_${message.author.id}`)
                    let restoredresale = db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}resale_${message.author.id}`)
                    
                    db.set(`cars_${message.author.id}`, filtered)
                    db.push(`cars_${message.author.id}`, cars.Cars[usercar.toLowerCase()].restored)
                    db.set(`${cars.Cars[restoredcar].Name}speed_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}speed_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}resale_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}resale_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}engine_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}engine_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}exhaust_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}exhaust_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}tires_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}tires_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}suspension_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}suspension_${message.author.id}`))


                }
            })

        }
        else  if(torestore.toLowerCase() == "suspension"){
            let carsus = db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}suspension_${message.author.id}`)
            if(carsus !== "Broken") return message.channel.send("This car already has a suspension installed!")
            message.channel.send(`Which suspension would you like to put in this car? Your parts: ${junkparts.join(', ')}`)
            const filter = (m = discord.Message) => {
                return m.author.id === message.author.id
            }
            let choice, collector = message.channel.createMessageCollector({
                filter,
                max: 1,
                time: 1000 * 20
            })

            collector.on('collect', msg => {
                let suschosen = msg.content.toLowerCase()
                if(!suschosen) return;
                if(!restoresus.includes(suschosen)) return message.channel.send("Thats not a suspension!")

                if(!partdb.Parts[suschosen.toLowerCase()]) return message.channel.send('Thats not a suspension!')
                let carsus = db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}suspension_${message.author.id}`)
                if(!junkparts.includes(partdb.Parts[suschosen].Name.toLowerCase())) return message.channel.send("You dont have that suspension!");

                db.set(`${cars.Cars[usercar.toLowerCase()].Name}suspension_${message.author.id}`, partdb.Parts[suschosen].Name)
                const filtered = junkparts.filter(e => e !== suschosen);
                db.set(`restoreparts_${message.author.id}`, filtered)
                db.add(`${cars.Cars[usercar.toLowerCase()].Name}restoration_${message.author.id}`, 25)
                db.add(`${cars.Cars[usercar.toLowerCase()].Name}speed_${message.author.id}`, partdb.Parts[suschosen].AddedSpeed)
                db.add(`${cars.Cars[usercar.toLowerCase()].Name}resale_${message.author.id}`, partdb.Parts[suschosen].sellprice)

                message.channel.send(`Restored the suspension, and added 25% to the restoration percentage. You also gained ${partdb.Parts[suschosen].AddedSpeed} speed!`)

                if(db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}restoration_${message.author.id}`) == 100){
                    const filtered = user1cars.filter(e => e !== usercar.toLowerCase());

                    message.channel.send(`You've finished the restoration!`)
                    db.set(`${cars.Cars[usercar.toLowerCase()].Name}restored_${message.author.id}`, true)
                    let restoredcar = cars.Cars[usercar.toLowerCase()].restored
                    let restoredspeed = db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}speed_${message.author.id}`)
                    let restoredresale = db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}resale_${message.author.id}`)
                    db.set(`cars_${message.author.id}`, filtered)

                    db.push(`cars_${message.author.id}`, cars.Cars[usercar.toLowerCase()].restored)
                    db.set(`${cars.Cars[restoredcar].Name}speed_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}speed_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}resale_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}resale_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}engine_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}engine_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}exhaust_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}exhaust_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}tires_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}tires_${message.author.id}`))
                    db.set(`${cars.Cars[restoredcar].Name}suspension_${message.author.id}`, db.fetch(`${cars.Cars[usercar.toLowerCase()].Name}suspension_${message.author.id}`))


                }
            })

        }

    },
    permissions: '',
    requiredRoles: [],
  }
  