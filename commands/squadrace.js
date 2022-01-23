const db = require('quick.db')
const lodash = require('lodash')
const ms = require('pretty-ms');
const discord = require('discord.js')
const squads = require('../squads.json')
const parts = require('../partsdb.json')
module.exports = {
    commands: ['squadrace'],
    description: 'Race a bot!',
    expectedArgs:'<user you want to race> <car you want to race with>',
    permissionError: '',
    
    callback: async (message, arguments, text, client) => {
      
       
        let gifs = ['https://c.tenor.com/FKZHV97zKHkAAAAS/fast-street-racing.gif', 'https://c.tenor.com/GltPuC9GMPgAAAAS/smart-car-fast.gif', 'https://c.tenor.com/a4c0DSEcKeUAAAAM/racing-speeding.gif', 'https://c.tenor.com/NxQCVgmzayMAAAAM/mazda-mx5.gif', 'https://c.tenor.com/-mo3PfbPPm4AAAAM/car-porsche911.gif']
        let randomgif = lodash.sample(gifs)
        const Discord = require("discord.js");
        const db = require("quick.db");
   

            const cars = require('../cardb.json');
			let moneyearned = 600
            let badge1 = db.fetch(`100racebadge_${message.author.id}`)
            let badge2 = db.fetch(`howbadge_${message.author.id}`)
            let premium1 = db.fetch(`premium_${message.author.id}`)
            let user = message.author;
            let raceswon = db.fetch(`raceswon_${message.author.id}`)
            let stageflame = db.fetch(`stageflame_${message.author.id}`)
            let stageskull = db.fetch(`stageskull_${message.author.id}`)
            let stagespeed = db.fetch(`stagespeed_${message.author.id}`)
            let stagescrap = db.fetch(`stagescrap_${message.author.id}`)

            let badgesquad1 = db.fetch(`squad1beat_${message.author.id}`)
            let badgesquad2 = db.fetch(`squad2beat_${message.author.id}`)
            let badgesquad3 = db.fetch(`squad3beat_${message.author.id}`)
            let badgesquad4 = db.fetch(`squad4beat_${message.author.id}`)

            let squad = arguments[0]
            let botlist = ['flamehouse', 'skullcrunchers', 'thespeed', 'scrapheads']
            let timeout = 120000
            let botcar = null
            let racing = db.fetch(`racing_${user.id}`)
            
            if (racing !== null && timeout - (Date.now() - racing) > 0) {
                let time = ms(timeout - (Date.now() - racing), {compact: true});
              
                return message.channel.send(`Please wait ${time} before racing again.`)
              } 
            let user1cars = db.fetch(`cars_${user.id}`)
          
            let errorembed = new discord.MessageEmbed()
            .setTitle("❌ Error!")
            .setColor("#60b0f4")
            if (!user1cars) {
                errorembed.setDescription("You dont have any cars!")
                return message.channel.send({embeds: [errorembed]})
            }
                
            if (!squad){
                errorembed.setDescription("Please specify  the squad you want to race. Squads available: FlameHouse, SkullCrunchers, TheSpeed")
                 return message.channel.send({embeds: [errorembed]})
            }
            if(!botlist.includes(squad.toLowerCase())) {
                errorembed.setDescription("Thats not a squad! The available squads are: FlameHouse, SkullCrunchers, TheSpeed")
                return message.reply({embeds: [errorembed]})
            }
            if (!user1cars.some(e => e.includes(arguments.slice(1).join(' ').toLowerCase()))) {
                errorembed.setDescription(`You need to enter the car you want to verse with. E.g. \`race [squad] [car]\`\nYour current cars: ${user1cars.join('\n')}`)

                return message.channel.send({embeds: [errorembed]})
            }
            if(!arguments.slice(1).join(' ')) {
                errorembed.setDescription("You need to enter a car! Example: race [squad] [car]")

                return message.channel.send({embeds: [errorembed]})
            }
            let restoration = db.fetch(`${cars.Cars[arguments.slice(1).join(' ').toLowerCase()].Name}restoration_${message.author.id}`)
            if(cars.Cars[arguments.slice(1).join(' ').toLowerCase()].Junked && restoration < 100){
                return message.channel.send("This car is too junked to race, sorry!")
            }
            let stagebot
            if(squad.toLowerCase() == 'flamehouse')  {
            if(!stageflame || stageflame == null){
                db.add(`stageflame_${message.author.id}`, 1)
            }
            if(db.fetch(`stageflame_${message.author.id}`) == 1){
                stagebot = "sally"
            }
            else if(db.fetch(`stageflame_${message.author.id}`) == 2){
                stagebot = "max"
            }
            else if(db.fetch(`stageflame_${message.author.id}`) == 3){
                stagebot = "john"
            }
            else if(db.fetch(`stageflame_${message.author.id}`) == 4){
                stagebot = "sam"
            }
            else if(db.fetch(`stageflame_${message.author.id}`) == 5){
                stagebot = "hal"
            }
                if(db.fetch(`stageflame_${message.author.id}`) == 6){
                    return message.channel.send("You've already beaten this squad!")
                }

            }
            else if(squad.toLowerCase() == 'skullcrunchers')  {
                if(db.fetch(`stageflame_${message.author.id}`) < 6) return message.channel.send("You need to beat FlameHouse before approaching SkullCrunchers!")
                if(!db.fetch(`stageskull_${message.author.id}`) || db.fetch(`stageskull_${message.author.id}`) == null){
                    db.add(`stageskull_${message.author.id}`, 1)
                }
                if(db.fetch(`stageskull_${message.author.id}`) == 1 || db.fetch(`stageskull_${message.author.id}`) == "1"){
                    stagebot = "dale"
                }
                else if(db.fetch(`stageskull_${message.author.id}`) == 2){
                    stagebot = "joe"
                }
                else if(db.fetch(`stageskull_${message.author.id}`) == 3){
                    stagebot = "sean"
                }
                else if(db.fetch(`stageskull_${message.author.id}`) == 4){
                    stagebot = "ashley"
                }
                else if(db.fetch(`stageskull_${message.author.id}`) == 5){
                    stagebot = "damien"
                }
                    if(db.fetch(`stageskull_${message.author.id}`) == 6){
                        return message.channel.send("You've already beaten this squad!")
                    }

                }
                else if(squad.toLowerCase() == 'thespeed')  {
                    if(db.fetch(`stageskull_${message.author.id}`) < 6) return message.channel.send("You need to beat SkullCrunchers before approaching TheSpeed!")
                    if(!db.fetch(`stagespeed_${message.author.id}`) || db.fetch(`stagespeed_${message.author.id}`) == null){
                        db.add(`stagespeed_${message.author.id}`, 1)
                    }
                    if(db.fetch(`stagespeed_${message.author.id}`) == 1 || db.fetch(`stagespeed_${message.author.id}`) == "1"){
                        stagebot = "madison"
                    }
                    else if(db.fetch(`stagespeed_${message.author.id}`) == 2){
                        stagebot = "jeremy"
                    }
                    else if(db.fetch(`stagespeed_${message.author.id}`) == 3){
                        stagebot = "eli"
                    }
                    else if(db.fetch(`stagespeed_${message.author.id}`) == 4){
                        stagebot = "x"
                    }
                    else if(db.fetch(`stagespeed_${message.author.id}`) == 5){
                        stagebot = "alex"
                    }
                        if(db.fetch(`stagespeed_${message.author.id}`) == 6){
                            return message.channel.send("You've already beaten this squad!")
                        }
    
                    }
                    else if(squad.toLowerCase() == 'scrapheads')  {
                        if(db.fetch(`stagespeed_${message.author.id}`) < 6) return message.channel.send("You need to beat TheSpeed before approaching Scrapheads!")
                        if(!db.fetch(`stagescrap_${message.author.id}`) || db.fetch(`stagescrap_${message.author.id}`) == null){
                            db.add(`stagescrap_${message.author.id}`, 1)
                        }
                        if(db.fetch(`stagespeed_${message.author.id}`) == 1 || db.fetch(`stagescrap_${message.author.id}`) == "1"){
                            stagebot = "rex"
                        }
                        else if(db.fetch(`stagescrap_${message.author.id}`) == 2){
                            stagebot = "ryan"
                        }
                        else if(db.fetch(`stagescrap_${message.author.id}`) == 3){
                            stagebot = "saw"
                        }
                        else if(db.fetch(`stagescrap_${message.author.id}`) == 4){
                            stagebot = "heather"
                        }
                        else if(db.fetch(`stagescrap_${message.author.id}`) == 5){
                            stagebot = "scrappy"
                        }
                            if(db.fetch(`stagescrap_${message.author.id}`) == 6){
                                return message.channel.send("You've already beaten this squad!")
                            }
        
                        }
                botcar = squads.Squads[stagebot].Car

            
           
            if(premium1 == true) {
                moneyearned *= 2
            }
          
           db.set(`racing_${user.id}`, Date.now())
			
        	
        
    
            
        
          
                let user2carspeed = cars.Cars[botcar.toLowerCase()].Speed;
               
                let user1car = cars.Cars[arguments.slice(1).join(' ').toLowerCase()].Name
        
                 let user1carspeed = db.fetch(`${user1car}speed_${user.id}`);
                let speeds = []
       
              

                    for (var n = 1; n <= 210; n++) {
                        speeds.push(n)
                }
            
                let tiemessages = ["Gg!", "Good race bro, I almost passed you", "Dang your car is so fast we tied! Wanna go another round?"]
                let winmessages = ['How did you even win, my car is the best!', 'H-how?!', `Your ${user1car} isn't too bad I guess...`]
                let losemessages = [`It doesn't matter if you win by an inch or a mile, winnings winning.`, 'Haha easy!', 'Maybe get a better car?']

                let count = 0,
                count2 = 0,
                i = 0,
                speed = user1carspeed,
                speed2 = user2carspeed
                let spoiler = db.fetch(`${user1car}spoiler_${message.author.id}`)
                console.log(spoiler)
                if(spoiler){
                    let aero = parts.Parts[spoiler.toLowerCase()].Aero
                    
                    if(aero <= 2){
                        let randaeroadd = randomRange(1, 5)
                        speed += randaeroadd
    
                    }
                }
                let embed = new discord.MessageEmbed()
                .setTitle(`Racing ${squads.Squads[stagebot].Name}...`)
                .setImage(randomgif)
                .setColor("#60b0f4")
                .addField("Speeds", `${squads.Squads[stagebot].Name}: ${user2carspeed} MPH\nYou: ${user1carspeed} MPH`)
                .setDescription(`${squads.Squads[stagebot].Name}'s car: ${cars.Cars[squads.Squads[stagebot].Car].Name}\n\nYour car: ${user1car}`)
            let msg = await message.channel.send({embeds: [embed]})
            db.add(`races_${message.guild.id}`, 1)
            let x = setInterval(() => {
               
                let amount = getspeed(speed)
                let amount2 = getspeed2(speed2)
            
                function getspeed(speedamount) {
                    if(speed <= 125){
                        return speedamount = 1

                    }
                    else if (speed <= 136) {
                        return speedamount = randomRange(1, 1)
                    }
                    else if (speed <= 151) {
                        return speedamount = randomRange(1, 2)
                    } 
                    else if (speed <= 171) {
                        return speedamount = randomRange(2, 3)
                    } 
                    else if (speed <= 195) {
                        return speedamount = randomRange(2, 4)
                    } else if (speed <= 216) {
                        return speedamount = randomRange(4, 5)
                    }
                    else if (speed <= 240) {
                        return speedamount = randomRange(4, 6)
                    }
                    else if (speed <= 280) {
                        return speedamount = randomRange(5, 6)
                    }
                    else if (speed <= 500) {
                        return speedamount = randomRange(6, 6)
                    }
                    else if(speed == null){
                        return speedamount = 1
                    }
                    
            
                }
            
                function getspeed2(speedamount) {
                    if(speed2 <= 125){
                        return speedamount = 1

                    }
                    else if (speed2 <= 136) {
                        return speedamount = randomRange(1, 1)
                    }
                    else if (speed2 <= 151) {
                        return speedamount = randomRange(1, 2)
                    } 
                    else if (speed2 <= 171) {
                        return speedamount = randomRange(2, 3)
                    } 
                    else if (speed2 <= 195) {
                        return speedamount = randomRange(2, 4)
                    } else if (speed <= 216) {
                        return speedamount = randomRange(4, 5)
                    }
                    else if (speed2 <= 240) {
                        return speedamount = randomRange(4, 6)
                    }
                    else if (speed2 <= 280) {
                        return speedamount = randomRange(5, 6)
                    }
                    else if (speed2 <= 500) {
                        return speedamount = randomRange(6, 6)
                    }
                    else if(speed2 == null){
                        return speedamount = 1
                    }
            
                }
             

                count += amount
                count2 += amount2
                console.log(amount)
                console.log(amount2)
                console.log(count)
                console.log(count2)

                if (count >= 20 || count2 >= 20) {
                    
                 if (count >= 20) {
                        db.add(`cash_${user.id}`, moneyearned)
                        db.add(`notoriety_${user.id}`, 10)
                        db.add(`raceswon_${user.id}`, 1)
                        let winmessage = lodash.sample(winmessages)

                        embed.setTitle("You won and advanced a stage!")
                        embed.addField("Earnings",`${moneyearned}`)
                        embed.setDescription(`${squads.Squads[stagebot].Name}: ${winmessage}`)
                        embed.setColor("#60b0f4")

                        embed.addField("Results", "Won")
                        embed.addField("Message", winmessage)
                        msg.edit({embeds: [embed]})
                        msg.reply(`${message.author}`)

                        if(user1car == "1964 Peel P50" && !badge2){
                            message.channel.send(`You just earned the "How?" races badge for winning a race in a Peel P50! Check your profile.`)
                            db.set(`howbadge_${user.id}`, true)

                        }
                        if(raceswon >= 100 && !badge1){
                            message.channel.send("You just earned the 100 races badge for winning 100 races! Check your profile.")
                            db.set(`100racebadge_${user.id}`, true)
                        }
                        if(squad.toLowerCase() == "flamehouse" && db.fetch(`stageflame_${message.author.id}`) < 6){
                            db.add(`stageflame_${message.author.id}`, 1)
                            if(db.fetch(`stageflame_${message.author.id}`) == 6){
                                message.channel.send("You just beat FlameHouse and earned a badge!")
                                if(!badgesquad1){
                                    db.set(`squad1beat_${message.author.id}`, true)
                                }
                            }
                            
                        }
                        else if(squad.toLowerCase() == "skullcrunchers" && db.fetch(`stageskull_${message.author.id}`) < 6){
                            db.add(`stageskull_${message.author.id}`, 1)
                            if(db.fetch(`stageskull_${message.author.id}`) == 6){
                                if(!badgesquad2){
                                    db.set(`squad2beat_${message.author.id}`, true)
                                }
                                message.channel.send("You just beat SkullCrunchers, earned a badge, and now you can choose a car to take from them! Choose from the list below, use z!choose.")
                                let embedchoose = new discord.MessageEmbed()
                                .setDescription(`1: Dales 2004 Subaru WRX STI\n2: Joes 2010 Ford Mustang\n3: Seans 1989 Nissan Skyline R32\n4: Ashleys 2013 Mazda Speed3\n5: Damiens 2001 Toyota Supra MK4`)
                                .setColor("#60b0f4")
                                
                                message.channel.send({embeds: [embedchoose]})
                                    

                                
                            }
                            
                        }
                        else if(squad.toLowerCase() == "thespeed" && db.fetch(`stagespeed_${message.author.id}`) < 6){
                            db.add(`stagespeed_${message.author.id}`, 1)
                            if(db.fetch(`stagespeed_${message.author.id}`) == 6){
                                if(!badgesquad3){
                                    db.set(`squad3beat_${message.author.id}`, true)
                                }
                                message.channel.send("You just beat TheSpeed, earned a badge, and now you can choose a car to take from them! Choose from the list below, use z!choose.")
                                let embedchoose = new discord.MessageEmbed()
                                .setDescription(`1: Madisons 2015 Lotus Exige Sport\n2: Jeremys 2011 Audi RS5\n3: Elis 2020 Audi TT RS\n4: Xs 2012 Dodge Challenger SRT8\n5: Alexs 1993 Porsche 959`)
                                .setColor("#60b0f4")
                                
                                message.channel.send({embeds: [embedchoose]})
                                
                                    
                                
                                    
                                
                            }
                            
                        }
                        else if(squad.toLowerCase() == "scrapheads" && db.fetch(`stagescrap_${message.author.id}`) < 6){
                            db.add(`stagescrap_${message.author.id}`, 1)
                            if(db.fetch(`stagescrap_${message.author.id}`) == 6){
                                if(!badgesquad4){
                                    db.set(`squad4beat_${message.author.id}`, true)
                                }
                                message.channel.send("You just beat Scrapheads, and now you can choose a car to take from them! Choose from the list below, use z!choose.")
                                let embedchoose = new discord.MessageEmbed()
                                .setDescription(`1: Rexs 1969 Ford Mustang\n2: Ryans 1990 Nissan 240SX\n3: Saws 1990 BMW M3\n4: Heathers 1967 Chevy Camaro\n5: Scrappys 1973 Ferrari Dino`)
                                .setColor("#60b0f4")
                                
                                message.channel.send({embeds: [embedchoose]})             

                               
                                
                            
                               
                
                            }
                            
                        }
                    }
                    else if (count2 >= 20) {
                        let losemessage = lodash.sample(losemessages)

                        embed.setTitle("You lost!")
                        embed.setDescription(`${squads.Squads[stagebot].Name}: ${losemessage}`)
                        embed.setColor("#60b0f4")

                        embed.addField("Results", "Lost")
                        embed.addField("Message", losemessage)

                        msg.edit({embeds: [embed]})
                        msg.reply(`${message.author}`)
                    }
                    
                    clearInterval(x)
                }
               

            
            }, 4000)
        
        
          
        
        
        
      
      

    },    
    permissions: '',
    requiredRoles: [],
  }  
  
                            function randomRange(min, max) {
                                return Math.round(Math.random() * (max - min)) + min;
                            }