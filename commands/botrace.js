const db = require('quick.db')
const lodash = require('lodash')
const ms = require('pretty-ms');
const discord = require('discord.js')
const parts = require('../partsdb.json')
module.exports = {
    commands: ['botrace'],
    description: 'Race a bot!',
    expectedArgs:'<user you want to race> <car you want to race with>',
    permissionError: '',
    
    callback: async (message, arguments, text, client) => {
      
       
        const Discord = require("discord.js");
        const db = require("quick.db");
   
            let gifs = ['https://c.tenor.com/FKZHV97zKHkAAAAS/fast-street-racing.gif', 'https://c.tenor.com/GltPuC9GMPgAAAAS/smart-car-fast.gif', 'https://c.tenor.com/a4c0DSEcKeUAAAAM/racing-speeding.gif']
            let randomgif = lodash.sample(gifs)
            const cars = require('../cardb.json');
            let races = db.fetch(`races_${message.guild.id}`)
			let moneyearned = 250
            let badge1 = db.fetch(`100racebadge_${message.author.id}`)
            let badge2 = db.fetch(`howbadge_${message.author.id}`)
            let premium1 = db.fetch(`premium_${message.author.id}`)
            let selected = arguments.splice(1).join(' ')
            let user = message.author;
            let raceswon = db.fetch(`wins_${message.author.id}`)
            let bot = arguments[0]
            let botlist = ['tier1', 'tier2', 'tier3', 'tier4', 'tier5']
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
            let bot1cars = ['1995 Mazda Miata', '1995 Mazda Miata', '1991 Toyota MR2', '2002 Pontiac Firebird']
            let bot2cars = ['2014 Hyundai Genesis Coupe', '2008 Nissan 350Z', '2008 Nissan 350Z', '2010 Ford Mustang']
            let bot3cars = ['2020 Porsche 718 Cayman', '2015 Lotus Exige Sport', '2011 Audi RS5']
            let bot4cars = ['2015 mercedes amg gts', '2016 alfa romeo giulia', '2021 porsche 911 gt3', '2017 ford gt']
            let bot5cars = ['2010 ferrari 458 italia', '2018 lamborghini aventador s', '2016 aston martin vulkan', '2021 mclaren 720s']

            let errorembed = new discord.MessageEmbed()
            .setTitle("❌ Error!")
            .setColor("#60b0f4")
            if (!user1cars) {
                errorembed.setDescription("You dont have any cars!")
                return message.channel.send({embeds: [errorembed]})
            }
                
            if (!bot){
                errorembed.setDescription("Please specify  the bot you want to verse. Bots available: Tier1, Tier2, Tier3, Tier4, and Tier5")
                 return message.channel.send({embeds: [errorembed]})
            }
        if(!botlist.includes(bot.toLowerCase()))  {
            errorembed.setDescription("Thats not a tier! The available tiers are: Tier1, Tier2, Tier3, Tier4, and Tier5")
            return message.reply({embeds: [errorembed]})
            }
            if(!botlist.includes(bot.toLowerCase()) && !cars.Cars[selected])  {
                errorembed.setDescription("Thats not a tier! The available tiers are: Tier1, Tier2, Tier3, Tier4, and Tier5")
                return message.reply({embeds: [errorembed]})
            }
            if(!botlist.includes(bot.toLowerCase()) && user1cars.includes(selected))  {
                errorembed.setDescription("Thats not a tier! The available tiers are: Tier1, Tier2, Tier3, Tier4, and Tier5")
                return message.reply({embeds: [errorembed]})
            }
            if(!botlist.includes(bot.toLowerCase()) && !selected)  {
                errorembed.setDescription("Thats not a tier! The available tiers are: Tier1, Tier2, Tier3, Tier4, and Tier5")
                return message.reply({embeds: [errorembed]})
            }
            
            if(!selected) {
                errorembed.setDescription("Select a car you want to use")
                return message.channel.send({embeds: [errorembed]})
            }
            if(!cars.Cars[selected.toLowerCase()]){
                errorembed.setDescription("Thats not an available car!")
                return message.channel.send({embeds: [errorembed]})
            }
            if (!user1cars.includes(selected.toLowerCase())) {
                errorembed.setDescription(`You need to enter the car you want to verse with. E.g. \`race [bot] [car]\`\nYour current cars: ${user1cars.join('\n')}`)

                return message.channel.send({embeds: [errorembed]})
            }
           
            let restoration = db.fetch(`${cars.Cars[selected.toLowerCase()].Name}restoration_${message.author.id}`)
            if(cars.Cars[selected.toLowerCase()].Junked && restoration < 100){
                return message.channel.send("This car is too junked to race, sorry!")
            }

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
            else if(bot.toLowerCase() == 'tier4')  {
                botcar = lodash.sample(bot4cars)
                moneyearned += 750
            }
            else if(bot.toLowerCase() == 'tier5')  {
                botcar = lodash.sample(bot5cars)
                moneyearned += 1250
            }
            if(premium1 == true) {
                moneyearned *= 2
            }
          
           db.set(`racing_${user.id}`, Date.now())
			
        	
        
    
            
        
          
                let user2carspeed = cars.Cars[botcar.toLowerCase()].Speed
               
                let user1car = cars.Cars[selected.toLowerCase()].Name
                let user1caremote = cars.Cars[selected.toLowerCase()].Emote

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
                if(spoiler){
                    let aero = parts.Parts[spoiler.toLowerCase()].Aero
                    
                    if(aero <= 2){
                        let randaeroadd = randomRange(1, 5)
                        speed += randaeroadd
    
                    }
                }
                let embed = new discord.MessageEmbed()
                .setTitle(`Racing ${bot}...`)
                .setImage(randomgif)
                .setColor("#60b0f4")
                .addField("Speeds", `Bot: ${speed2} MPH\nYou: ${speed} MPH`)
                .setDescription(`Bots car: ${cars.Cars[botcar.toLowerCase()].Emote} ${cars.Cars[botcar.toLowerCase()].Name}\n\nYour car: ${user1caremote} ${user1car}`)
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
                    else if (speed <= 145) {
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
                        return speedamount = randomRange(5, 5)
                    }
                    else if (speed <= 281) {
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
                    else if (speed2 <= 145) {
                        return speedamount = randomRange(1, 2)
                    } 
                    else if (speed2 <= 151) {
                        return speedamount = randomRange(2, 2)
                    } 
                    else if (speed2 <= 171) {
                        return speedamount = randomRange(2, 3)
                    } 
                    else if (speed2 <= 195) {
                        return speedamount = randomRange(2, 4)
                    } else if (speed2 <= 221) {
                        return speedamount = randomRange(4, 5)
                    }
                    else if (speed2 <= 261) {
                        return speedamount = randomRange(5, 5)
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
                        db.add(`raceswon_${user.id}`, 1)
                        let winmessage = lodash.sample(winmessages)

                        embed.addField("Results", "Won")
                        embed.addField("Message", winmessage)
                        embed.addField("Earnings", `${moneyearned}`)
                       msg.reply(`<@${message.author.id}>`)
                        msg.edit({embeds: [embed]})
                        db.add(`wins_${message.author.id}`, 1)
                        if(user1car == "1964 Peel P50" && !badge2){
                            message.channel.send(`You just earned the "How?" races badge for winning a race in a Peel P50! Check your profile.`)
                            db.set(`howbadge_${user.id}`, true)
                            db.push(`badges_${user.id}`, "how?")

                        }
                        if(raceswon >= 100 && !badge1){
                            message.channel.send("You just earned the 100 races badge for winning 100 races! Check your profile.")
                            db.set(`100racebadge_${user.id}`, true),
                            db.push(`badges_${user.id}`, "100wins")

                        }
                    }
                    else if (count2 >= 15) {
                        let losemessage = lodash.sample(losemessages)

                        embed.addField("Results", "Lost")
                        embed.addField("Message", losemessage)
                        msg.reply(`<@${message.author.id}>`)
                        msg.edit({embeds: [embed]})
                        db.add(`loses_${message.author.id}`, 1)
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