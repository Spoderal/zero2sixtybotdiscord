const db = require('quick.db')
const lodash = require('lodash')
const ms = require('pretty-ms')
const parts = require('../partsdb.json')
module.exports = {
    commands: ['timetrial'],
    description: 'Beat your times!',
    expectedArgs:'<car you want to race with>',
    permissionError: '',
    
    callback: async (message, arguments, text, client) => {
      
       

        const Discord = require("discord.js");
        const db = require("quick.db");

   
        
            const cars = require('../cardb.json');
            let badges = db.fetch(`badges_${message.author.id}`) || ["None"]
            let timeout = 60000
            let user = message.author;
            let racing = db.fetch(`timeracing_${user.id}`)
            if (racing !== null && timeout - (Date.now() - racing) > 0) {
                let time = ms(timeout - (Date.now() - racing), {compact: true});
              
                return message.channel.send(`Please wait ${time} before doing the time trial again.`)
              } 
            let emoji1 = "<:racecar:872659453365878865>"
            let finish = "<:finish:877114047189884959>"
            let road = "<:road:872658289689780305>"
            let user1cars = db.fetch(`cars_${user.id}`)
            
            if (!user1cars) return message.channel.send("You dont have any cars!")
            let carchoice = arguments.slice(0).join(' ')
            if(!carchoice) return message.channel.send("Specify a car!")
            if (!user1cars.some(e => e.includes(carchoice.toLowerCase()))) return message.channel.send(`You don't have that car!\nYour current cars: ${user1cars.join(', ')}`)
            if(!arguments.slice(1).join(' ')) return message.channel.send("You need to enter a car! Example: timetrial [car[")

          
           db.set(`timeracing_${user.id}`, Date.now())
			
        	
        
    
            
        
          
               
                let user1car =  cars.Cars[carchoice.toLowerCase()].Name
        
                 let user1carspeed = db.fetch(`${user1car}speed_${user.id}`);
            
                let speeds = []
       
              

                    for (var n = 1; n <= 210; n++) {
                        speeds.push(n)
                }
            
                console.log(user1carspeed)

                let count = 0,
                i = 0,
                speed = user1carspeed

                let spoiler = db.fetch(`${user1car}spoiler_${message.author.id}`)
                if(spoiler){
                    let aero = parts.Parts[spoiler.toLowerCase()].Aero
                    
                    if(aero <= 2){
                        let randaeroadd = randomRange(1, 5)
                        speed += randaeroadd
    
                    }
                }
            let embed = new Discord.MessageEmbed()
            .setTitle("Timer")
            .setDescription(`The timer has started! <:z_timer:911530850561191966>`)
            .setColor("#60b0f4")
            let msg = await message.channel.send({embeds: [embed]})
            let counter = 0
            let xy = setInterval(() => {
                counter+=1
               }, 1000);
            db.add(`races_${message.guild.id}`, 1)
            let x = setInterval(() => {
            
                let amount = getspeed(speed)
            
                function getspeed(speedamount) {
                    if (speed <= 125) {
                        return speedamount = randomRange(1, 2)
                    } else if (speed <= 160) {
                        return speedamount = randomRange(1, 3)
                    } else if (speed <= 190) {
                        return speedamount = randomRange(2, 4)
                    } else if (speed <= 300) {
                        return speedamount = randomRange(3, 5)
                    } 
                    else if (speed <= 325) {
                        return speedamount = randomRange(4, 5)
                    }
                    else if (speed <= 400) {
                        return speedamount = randomRange(5, 6)
                    } 
                    else {
                        return speedamount = 1
                    }
            
                }
           
                console.log(`amount: ${amount}`)
                
                count += amount
                
                
                
                
                if (count >= 20) {
                    let moneyearn = 100 - counter
                    db.subtract(`races_${message.guild.id}`, 1)
                    
                    if (count >= 20) {
                        msg.reply(`${user}, you completed the track in ${counter} seconds and that got you $${moneyearn}`)
                        db.add(`cash_${message.author.id}`, moneyearn)
                        if(counter < 20 && !badges.includes("timemaster")) {
                        setTimeout(() => {
                            
                            message.channel.send(`You completed the track in less than 20 seconds and earned the Time Master badge!`)
                            db.push(`badges_${message.author.id}`, 'timemaster')
                        }, 1000);
                    }
                }
                
                  
                    
                clearInterval(x)
                    clearInterval(xy)
                }
                console.log(`count: ${count}`)
                console.log(`counter: ${counter}`)

                
            }, 5000)
            
            
            
            
            
            
            
            
    },    
    permissions: '',
    requiredRoles: [],
}  

function randomRange(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
  