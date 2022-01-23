const db = require('quick.db')
const lodash = require('lodash')
const ms = require('pretty-ms')
module.exports = {
    commands: ['drift'],
    description: 'Drifting with your car!',
    expectedArgs:'<car you want to race with>',
    permissionError: '',
    
    callback: async (message, arguments, text) => {
      
       
        const discord = require("discord.js");
        const cars = require('../cardb.json');
        let gifs = ['https://c.tenor.com/7yNtCSm6PpgAAAAS/drift-drifting.gif', 'https://c.tenor.com/UaSxgyXuB30AAAAS/drifting-drift.gif', 'https://c.tenor.com/3cjrhtqxGSkAAAAS/car-swift.gif', 'https://c.tenor.com/IUxQQDJrIwIAAAAS/rx7-rotary.gif', 'https://c.tenor.com/AVooDrulA4UAAAAS/silvia-drift.gif']
        let randomgif = lodash.sample(gifs)
        let user = message.author;
        let car = db.fetch(`selected_${message.author.id}`)
        if(!car) return message.channel.send("You need to select a car! Example: z!select [car]")
        let user1cars = db.fetch(`cars_${user.id}`)
        if (!user1cars) return message.channel.send("You dont have any cars!")
        if(!cars.Cars[car.toLowerCase()]) return message.channel.send("Thats not a car!")
        if (!user1cars.some(e => e.includes(car.toLowerCase()))) return message.channel.send(`You need to enter the car you want to drift with. E.g. \`drift [car]\`\nYour current cars: ${user1cars.join(' ')}`)
            let driftscore = db.fetch(`${cars.Cars[car.toLowerCase()].Name}drift_${message.author.id}`)
            if(!driftscore > 0) return message.channel.send("Your car cant drift, give it a drift setup to drift.")
            let timeout = 120000
            let racing = db.fetch(`drifting_${user.id}`)
            if (racing !== null && timeout - (Date.now() - racing) > 0) {
                let time = ms(timeout - (Date.now() - racing), {compact: true});
              
                return message.channel.send(`Please wait ${time} before drifting again.`)
              } 

          
           db.set(`drifting_${user.id}`, Date.now())
			
        	let drifttraining = db.fetch(`drifttraining_${user.id}`)
            let dtrainscore = 1
            if(drifttraining <= 2){
                dtrainscore = 1
            }
            else if(drifttraining <= 5){
                dtrainscore = 2
            }
            else if(drifttraining <= 10){
                dtrainscore = 3
            }
    
            
        
          
           
                let speeds = []
       
              

                    for (var n = 1; n <= 210; n++) {
                        speeds.push(n)
                }
            
            

                speed = driftscore
          
                let amount = getspeed(speed)
            
                function getspeed(speedamount) {
                    if (speed <= 4) {
                        return speedamount = randomRange(1, 2)
                    } else if (speed <= 6) {
                        return speedamount = randomRange(1, 3)
                    } else if (speed <= 8) {
                        return speedamount = randomRange(2, 4)
                    } else if (speed <= 10) {
                        return speedamount = randomRange(3, 5)
                    }
                    else if (speed <= 15) {
                        return speedamount = randomRange(4, 5)
                    }
                    else if (speed <= 20) {
                        return speedamount = randomRange(5, 6)
                    } else {
                        return speedamount = 1
                    }
            
                }
                amount * dtrainscore
                let earnedcash = amount * 100
                let embed = new discord.MessageEmbed()
                .setTitle(`Drifting!`)
                .setImage(randomgif)
                .setColor("#60b0f4")
                .addField("Drift Stats", `Drift Score : ${driftscore}\n\nDrift Level : ${db.fetch(`drifttraining_${user.id}`)}`)
                .setDescription(`Car: ${cars.Cars[car.toLowerCase()].Emote} ${cars.Cars[car.toLowerCase()].Name}`)
                message.channel.send({embeds: [embed]})
                setTimeout(() => {
                    db.add(`cash_${message.author.id}`, earnedcash)
                    message.channel.send(`Drifted and earned a score of ${amount} getting you $${earnedcash}!`)
                    if(amount > 1 && drifttraining <= 1){
                        db.add(`drifttraining_${message.author.id}`, 1)
                        message.channel.send(`Increased drift training by 1, your drift training is now level ${db.fetch(`drifttraining_${user.id}`)}`)

                    }
                    if(amount > 2 && drifttraining <= 2){
                        db.add(`drifttraining_${message.author.id}`, 1)
                        message.channel.send(`Increased drift training by 1, your drift training is now level ${db.fetch(`drifttraining_${user.id}`)}`)

                    }
                    if(amount > 3 && drifttraining <= 3){
                        db.add(`drifttraining_${message.author.id}`, 1)
                        message.channel.send(`Increased drift training by 1, your drift training is now level ${db.fetch(`drifttraining_${user.id}`)}`)

                    }
                    if(amount > 4 && drifttraining <= 5){
                        db.add(`drifttraining_${message.author.id}`, 1)
                        message.channel.send(`Increased drift training by 1, your drift training is now level ${db.fetch(`drifttraining_${user.id}`)}`)

                    }
                    if(amount > 4 && drifttraining <= 10){
                        db.add(`drifttraining_${message.author.id}`, 1)
                        message.channel.send(`Increased drift training by 1, your drift training is now level ${db.fetch(`drifttraining_${user.id}`)}`)

                    }
                }, 3000);
            
                function randomRange(min, max) {
                    return Math.round(Math.random() * (max - min)) + min;
                }
              
        
        
          
        
        
        
      
      

    },    
    permissions: '',
    requiredRoles: [],
  }  
  