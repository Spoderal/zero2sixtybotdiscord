const db = require('quick.db')
const lodash = require('lodash')
const ms = require('pretty-ms');
const discord = require('discord.js')
module.exports = {
    commands: ['battle'],
    description: 'Race a bot!',
    expectedArgs:'<user you want to race> <car you want to race with>',
    permissionError: '',
    
    callback: async (message, arguments, text, client) => {
      
       
        const Discord = require("discord.js");
        const db = require("quick.db");
   


            const cars = require('../cardb.json');
			let moneyearned = 1000
            let premium1 = db.fetch(`premium_${message.author.id}`)

            let user = message.author;
            let timeout = 86400000

            let racing = db.fetch(`dailyracing_${user.id}`)
         
            if (racing !== null && timeout - (Date.now() - racing) > 0) {
                let time = ms(timeout - (Date.now() - racing), {compact: true});
              
                return message.channel.send(`Please wait ${time} before racing again.`)
              } 
            let battlecars = ['2015 Mercedes AMG GTS', '2018 Audi R8', '2021 Porsche 911 GT3', '2014 Lamborghini Huracan']
          
            let randombattle = lodash.sample(battlecars)
            let randomgif
           if(randombattle == "2015 Mercedes AMG GTS"){
               randomgif = "https://c.tenor.com/9JMbqfVwcyoAAAAS/mercedes-amggtr.gif"
           }
           else  if(randombattle == "2018 Audi R8"){
            randomgif = "https://c.tenor.com/VyKNaZOIx1cAAAAS/shift-audi.gif"
        }
        else  if(randombattle == "2021 Porsche 911 GT3"){
            randomgif = "https://c.tenor.com/YYSUq5aEYkgAAAAM/porsche-porsche-drift.gif"
        }
        else  if(randombattle == "2014 Lamborghini Huracan"){
            randomgif = "https://c.tenor.com/8LLBEoIXqyIAAAAS/lamborghini-cars.gif"
        }
            if(premium1 == true) {
                moneyearned *= 2
            }
          
           db.set(`dailyracing_${user.id}`, Date.now())
			
        	
        
    
            
        
          
                let usercarspeed = cars.Cars[randombattle.toLowerCase()].Speed
                           
                let speeds = []
       
              

                    for (var n = 1; n <= 210; n++) {
                        speeds.push(n)
                }
            
                let tiemessages = ["Gg!", "Tie, outrageous!", "Dang your car is so fast we tied! Wanna go another round?"]
                let winmessages = ['How did you even win', 'H-how?!', 'Wow, nice!']
                let losemessages = [`It doesn't matter if you win by an inch or a mile, winnings winning.`, 'Dude I almost had you!', 'Maybe get a better car?']

                let count = 0,
                count2 = 0,
                i = 0,
                speed = usercarspeed,
                speed2 = usercarspeed
                let embed = new discord.MessageEmbed()
                .setTitle(`Daily Battle`)
                .setImage(randomgif)
                .setColor("#60b0f4")
                .addField("Speeds", `Bot: ${usercarspeed} MPH\nYou: ${usercarspeed} MPH`)
                .setDescription(`Battle Car: ${randombattle}`)
            let msg = await  message.channel.send({embeds: [embed]})
            db.add(`races_${message.guild.id}`, 1)
          
            let x = setInterval(() => {
               
                let amount = getspeed(speed)
                let amount2 = getspeed2(speed2)
            
                function getspeed(speedamount) {
                    if(speed2 == 125){
                        return speedamount = 1

                    }
                    else if (speed <= 136) {
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
                     else {
                        return speedamount = 1
                    }
            
                }
            
                function getspeed2(speedamount) {
                    if(speed2 == 125){
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
                     else {
                        return speedamount = 1
                    }
            
                }
            
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

                        let embedtie = new discord.MessageEmbed()
                        .setTitle("Tie!")
                        .setDescription(`Bot: ${tiemessage}`)
                        .setColor("#60b0f4")
                        message.channel.send(`<@${message.author.id}>`)
                        msg.edit({ embeds: [embedtie]})
                    } 
                    else if (count >= 15) {
                        db.add(`cash_${user.id}`, moneyearned)
                        db.add(`notoriety_${user.id}`, 10)
                        db.add(`raceswon_${user.id}`, 1)
                        let winmessage = lodash.sample(winmessages)

                        let embedwin = new discord.MessageEmbed()
                        .setTitle("You won!")
                        .setDescription(`Bot: ${winmessage}`)
                        .addField(`Earnings`, `${moneyearned}`)
                        .setColor("#60b0f4")
                        message.channel.send(`<@${message.author.id}>`)
                        msg.edit({embeds: [embedwin]})
                      
                    
                    }
                    else if (count2 >= 15) {
                        let losemessage = lodash.sample(losemessages)

                        let embedlost = new discord.MessageEmbed()
                        .setTitle("You lost!")
                        .setDescription(`Bot: ${losemessage}`)
                        .setColor("#60b0f4")
                        message.channel.send(`<@${message.author.id}>`)
                        msg.edit({embeds: [embedlost]})
                    }
                    
                    clearInterval(x)
                }
               

            
            }, 4000)
        
        
          
        
        
        
      
      

    },    
    permissions: '',
    requiredRoles: [],
  }  
  