const db = require('quick.db')
const lodash = require('lodash')
const ms = require('pretty-ms');
const discord = require('discord.js')
module.exports = {
    commands: ['porschebot'],
    description: 'Race a bot!',
    expectedArgs:'<user you want to race> <car you want to race with>',
    permissionError: '',
    
    callback: async (message, arguments, text, client) => {
      
       
        const Discord = require("discord.js");
        const db = require("quick.db");
   
            let gifs = ['https://c.tenor.com/FKZHV97zKHkAAAAS/fast-street-racing.gif', 'https://c.tenor.com/GltPuC9GMPgAAAAS/smart-car-fast.gif', 'https://c.tenor.com/a4c0DSEcKeUAAAAM/racing-speeding.gif']
            let randomgif = lodash.sample(gifs)
            let porsches = ['1994 porsche 911', '1993 porsche 959', '2020 porsche 718 cayman', '2005 porsche carrera gt', '2004 porsche 911 turbo', '2021 porsche 911 gt3', '2021 porsche taycan turbo s']

            const cars = require('../cardb.json');
            let races = db.fetch(`races_${message.guild.id}`)
			let moneyearned = 250
            let badge1 = db.fetch(`100racebadge_${message.author.id}`)
            let badge2 = db.fetch(`howbadge_${message.author.id}`)
            let premium1 = db.fetch(`premium_${message.author.id}`)

            let user = message.author;
            let raceswon = db.fetch(`raceswon_${message.author.id}`)
            let bot = arguments[0]
            let botlist = ['tier1', 'tier2', 'tier3']
            let timeout = 120000
            let botcar = null
            let racing = db.fetch(`racing_${user.id}`)
            let emoji1 = "<:racecar:872659453365878865>"
            let finish = "<:finish:877114047189884959>"
            let emoji2 = "<:racecar2:872659452971581441>"
            let road = "<:road:872658289689780305>"
            
            if (racing !== null && timeout - (Date.now() - racing) > 0) {
                let time = ms(timeout - (Date.now() - racing), {compact: true});
              
                return message.channel.send(`Please wait ${time} before racing again.`)
              } 
            let user1cars = db.fetch(`cars_${user.id}`)
            let bot1cars = ['1994 porsche 911', '1993 porsche 959', '2020 porsche 718 cayman']
            let bot2cars = ['2005 prsche carrera gt', '2004 porsche 911 turbo',]
            let bot3cars = ['2021 porsche 911 gt3', '2021 porsche taycan turbo s']
            let errorembed = new discord.MessageEmbed()
            .setTitle("❌ Error!")
            .setColor("#60b0f4")
            if (!user1cars) {
                errorembed.setDescription("You dont have any cars!")
                return message.channel.send({embeds: [errorembed]})
            }
            
            let car = arguments.slice(1).join(' ')
            if (!bot){
                errorembed.setDescription("Please specify  the bot you want to verse. Bots available: Tier1, Tier2, and Tier3")
                 return message.channel.send({embeds: [errorembed]})
            }
            if(!botlist.includes(bot.toLowerCase()))  {
                errorembed.setDescription("Thats not a tier! The available tiers are: Tier1, Tier2, and Tier3")
                return message.reply({embeds: [errorembed]})
            }
            if(!botlist.includes(bot.toLowerCase()) && !cars.Cars[arguments.slice(1).join(' ').toLowerCase()])  {
                errorembed.setDescription("Thats not a tier! The available tiers are: Tier1, Tier2, and Tier3")
                return message.reply({embeds: [errorembed]})
            }
            if(!botlist.includes(bot.toLowerCase()) && user1cars.includes(arguments.slice(1).join(' ').toLowerCase()))  {
                errorembed.setDescription("Thats not a tier! The available tiers are: Tier1, Tier2, and Tier3")
                return message.reply({embeds: [errorembed]})
            }
            if(!botlist.includes(bot.toLowerCase()) && !arguments.slice(1).join(' '))  {
                errorembed.setDescription("Thats not a tier! The available tiers are: Tier1, Tier2, and Tier3")
                return message.reply({embeds: [errorembed]})
            }
            if(!porsches.includes(car.toLowerCase()) && !arguments.slice(1).join(' '))  {
                errorembed.setDescription("Thats not a tier! The available tiers are: Tier1, Tier2, and Tier3")
                return message.reply({embeds: [errorembed]})
            }
            if(!porsches.includes(car.toLowerCase()) && !botlist.includes(bot.toLowerCase()))  {
                errorembed.setDescription("Thats not a tier! The available tiers are: Tier1, Tier2, and Tier3")
                return message.reply({embeds: [errorembed]})
            }
            if(!arguments.slice(1).join(' ')) {
                errorembed.setDescription("Specify a car you want to use!")
                return message.channel.send({embeds: [errorembed]})
            }
            if(!cars.Cars[arguments.slice(1).join(' ').toLowerCase()]){
                errorembed.setDescription("Thats not an available car!")
                return message.channel.send({embeds: [errorembed]})
            }
            if (!user1cars.includes(arguments.slice(1).join(' ').toLowerCase())) {
                errorembed.setDescription(`You need to enter the car you want to verse with. E.g. \`race [bot] [car]\`\nYour current cars: ${user1cars.join('\n')}`)

                return message.channel.send({embeds: [errorembed]})
            }
            if(!arguments.slice(1).join(' ')) {
                errorembed.setDescription("You need to enter a car! Example: race [bot] [car]")

                return message.channel.send({embeds: [errorembed]})
            }
            let restoration = db.fetch(`${cars.Cars[car.toLowerCase()].Name}restoration_${message.author.id}`)

            if(cars.Cars[car.toLowerCase()].Junked && restoration < 100){
                return message.channel.send("This car is too junked to race, sorry!")
            }
            if(!porsches.includes(car.toLowerCase())) return message.channel.send("This is a Porsche only race, please use a Porsche branded car!")

            if(bot.toLowerCase() == 'tier1')  {
                botcar = lodash.sample(bot1cars);
    			 moneyearned = 250;
            }

            else if(bot.toLowerCase() == 'tier2')  {
                botcar = lodash.sample(bot2cars)
                moneyearned += 250
            }
            else if(bot.toLowerCase() == 'tier3')  {
                botcar = lodash.sample(bot3cars)
                moneyearned += 500
            }
            if(premium1 == true) {
                moneyearned *= 2
            }
          
           db.set(`racing_${user.id}`, Date.now())
			
        	
        
    
            
        
          
                let user2carspeed = cars.Cars[botcar.toLowerCase()].Speed
               
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
                let embed = new discord.MessageEmbed()
                .setTitle(`Racing ${bot}...`)
                .setImage(randomgif)
                .setColor("#60b0f4")
                .addField("Speeds", `Bot: ${user2carspeed} MPH\nYou: ${user1carspeed} MPH`)
                .setDescription(`Bots car: ${botcar}\n\nYour car: ${user1car}`)
            let msg = await  message.channel.send({embeds: [embed]})
            db.add(`races_${message.guild.id}`, 1)
          
            let x = setInterval(() => {
               
                let amount = getspeed(speed)
                let amount2 = getspeed2(speed2)
            
                function getspeed(speedamount) {
                    if(speed <= 125){
                        return speedamount = 1

                    }
                    else if (speed <= 135) {
                        return speedamount = randomRange(1, 2)
                    }
                    else if (speed <= 151) {
                        return speedamount = randomRange(2, 2)
                    } 
                    else if (speed <= 171) {
                        return speedamount = randomRange(2, 3)
                    } 
                    else if (speed <= 196) {
                        return speedamount = randomRange(2, 4)
                    } else if (speed <= 221) {
                        return speedamount = randomRange(4, 5)
                    }
                    else if (speed <= 261) {
                        return speedamount = randomRange(4, 5)
                    }
                    else if (speed <= 281) {
                        return speedamount = randomRange(5, 6)
                    }
                    else if (speed <= 351) {
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
                    } else if (speed <= 221) {
                        return speedamount = randomRange(4, 5)
                    }
                    else if (speed2 <= 261) {
                        return speedamount = randomRange(4, 5)
                    }
                    else if (speed2 <= 280) {
                        return speedamount = randomRange(5, 6)
                    }
                    else if (speed2 <= 351) {
                        return speedamount = randomRange(6, 6)
                    }
                    else if(speed2 == null){
                        return speedamount = 1
                    }
                   
            
                }

                console.log(speed)
            
                function randomRange(min, max) {
                    return Math.round(Math.random() * (max - min)) + min;
                }
                count += amount
                count2 += amount2

                console.log(`1st rolled: ${amount}`)
                console.log(`2nd rolled: ${amount2}`)
                if (count >= 15 || count2 >= 15) {
                    if (count >= 15 && count2 >= 15)  {
                        let tiemessage = lodash.sample(tiemessages)

                        embed.addField("Results", "Tie")
                        embed.addField("Message", tiemessage)
                        msg.reply(`<@${message.author.id}>`)
                        msg.edit({embeds: [embed]})
                    } 
                    else if (count >= 15) {
                        db.add(`cash_${user.id}`, moneyearned)
                        db.add(`notoriety_${user.id}`, 10)
                        db.add(`porschewon_${user.id}`, 1)
                        let winmessage = lodash.sample(winmessages)

                        embed.addField("Results", "Won and added 1 race to the Porsche Championship")
                        embed.addField("Message", winmessage)
                       msg.reply(`<@${message.author.id}>`)
                        msg.edit({embeds: [embed]})
                       
                    }
                    else if (count2 >= 15) {
                        let losemessage = lodash.sample(losemessages)

                        embed.addField("Results", "Lost")
                        embed.addField("Message", losemessage)
                        msg.reply(`<@${message.author.id}>`)
                        msg.edit({embeds: [embed]})
                    }
                    
                    clearInterval(x)
                }
               

            
            }, 4000)
        
        
          
        
        
        
      
      

    },    
    permissions: '',
    requiredRoles: [],
  }  
  