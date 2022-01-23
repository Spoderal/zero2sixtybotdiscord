const db = require('quick.db')
const lodash = require('lodash')
const ms = require('pretty-ms');
const discord = require('discord.js')
const parts = require('../partsdb.json')
module.exports = {
    commands: ['cashcup'],
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

            let user = message.author;
            let raceswon = db.fetch(`wins_${message.author.id}`)
            let bot = arguments[0]
          
            let timeout = 120000
            let botcar = null
            let racing = db.fetch(`racing_${user.id}`)
            let cashcuptier = db.fetch(`cashcuptier_${message.author.id}`) || 1
            if(!cashcuptier) {
                db.set(`cashcuptier_${message.author.id}`, 1)
            }
            let cashearned = cashcuptier * 50
            console.log(cashearned)
            if (racing !== null && timeout - (Date.now() - racing) > 0) {
                let time = ms(timeout - (Date.now() - racing), {compact: true});
              
                return message.channel.send(`Please wait ${time} before racing again.`)
              } 
            let user1cars = db.fetch(`cars_${user.id}`)
            let bot1cars = ['1995 Mazda Miata', '1995 Mazda Miata', '1991 Toyota MR2', '2002 Pontiac Firebird']
            let bot2cars = ['2014 Hyundai Genesis Coupe', '2008 Nissan 350Z', '2008 Nissan 350Z', '2010 Ford Mustang']
            let bot3cars = ['2020 Porsche 718 Cayman', '2015 Lotus Exige Sport', '2011 Audi RS5']
            let bot4cars = ['2015 mercedes amg gts', '2016 alfa romeo giulia', '2021 porsche 911 gt3', '2017 ford gt']
            let bot5cars = ['2014 lamborghini huracan', '2014 mclaren 12c', '2018 audi r8', '2020 mclaren 570s']
            let bot6cars = ['2010 ferrari 458 italia', '2018 lamborghini aventador s', '2016 aston martin vulkan', '2013 mclaren p1']

            let errorembed = new discord.MessageEmbed()
            .setTitle("❌ Error!")
            .setColor("#60b0f4")
            if (!user1cars) {
                errorembed.setDescription("You dont have any cars!")
                return message.channel.send({embeds: [errorembed]})
            }
                
           
            if(!arguments.slice(0).join(' ')) {
                errorembed.setDescription("Specify a car you want to use!")
                return message.channel.send({embeds: [errorembed]})
            }
            if(!cars.Cars[arguments.slice(0).join(' ').toLowerCase()]){
                errorembed.setDescription("Thats not an available car!")
                return message.channel.send({embeds: [errorembed]})
            }
            if (!user1cars.includes(arguments.slice(0).join(' ').toLowerCase())) {
                errorembed.setDescription(`You need to enter the car you want to verse with. E.g. \`race [car]\`\nYour current cars: ${user1cars.join('\n')}`)

                return message.channel.send({embeds: [errorembed]})
            }
            if(!arguments.slice(0).join(' ')) {
                errorembed.setDescription("You need to enter a car! Example: race [car]")

                return message.channel.send({embeds: [errorembed]})
            }
            let restoration = db.fetch(`${cars.Cars[arguments.slice(0).join(' ').toLowerCase()].Name}restoration_${message.author.id}`)
            if(cars.Cars[arguments.slice(0).join(' ').toLowerCase()].Junked && restoration < 100){
                return message.channel.send("This car is too junked to race, sorry!")
            }
            console.log(cashcuptier)
            if(cashcuptier <= 5)  {
                botcar = lodash.sample(bot1cars);
    			 
            }

            else if(cashcuptier <= 15)  {
                botcar = lodash.sample(bot2cars);
    			 
            }
            else if(cashcuptier <= 25)  {
                botcar = lodash.sample(bot3cars);
    			 
            }
            else  if(cashcuptier <= 50)  {
                botcar = lodash.sample(bot4cars);
    			 
            }
            else  if(cashcuptier <= 75)  {
                botcar = lodash.sample(bot5cars);
    			 
            }

            else  if(cashcuptier <= 100)  {
                botcar = lodash.sample(bot6cars);
    			 
            }
            else {
                botcar = lodash.sample(bot1cars);
            }
         
          
           db.set(`racing_${user.id}`, Date.now())
			
        	
        
    
            
        
          
                let user2carspeed = cars.Cars[botcar.toLowerCase()].Speed
               
                let user1car = cars.Cars[arguments.slice(0).join(' ').toLowerCase()].Name
                 let user1carspeed = db.fetch(`${user1car}speed_${user.id}`);
            
                let speeds = []
       
              

                    for (var n = 1; n <= 210; n++) {
                        speeds.push(n)
                }
            
                let tiemessages = ["Gg!", "Dude I almost had you", "Dang your car is so fast we tied! Wanna go another round?"]
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
                .setTitle(`Racing Cup Tier ${cashcuptier}`)
                .setImage(randomgif)
                .setColor("#60b0f4")
                .addField("Speeds", `Bot: ${speed2} MPH\nYou: ${speed} MPH`)
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
                    else if (speed <= 400) {
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
                    else if (speed2 <= 400) {
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
                        if(cashcuptier < 100) {
                            db.add(`cashcuptier_${message.author.id}`, 1)

                        }
                        db.add(`cash_${user.id}`, cashearned)
                        db.add(`notoriety_${user.id}`, 10)
                        db.add(`raceswon_${user.id}`, 1)
                        let winmessage = lodash.sample(winmessages)

                        embed.addField("Results", "Won")
                        embed.addField("Message", winmessage)
                        embed.addField("Earnings", `${cashearned}`)
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