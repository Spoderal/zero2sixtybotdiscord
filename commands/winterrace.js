const db = require('quick.db')
const lodash = require('lodash')
const ms = require('pretty-ms')
module.exports = {
    commands: ['winterrace'],
    description: 'Beat your times!',
    expectedArgs:'<car you want to race with>',
    permissionError: '',
    
    callback: async (message, arguments, text, client) => {
      
       

        const Discord = require("discord.js");
        const db = require("quick.db");

   
        
            const cars = require('../cardb.json');
            let timeout = 120 * 1000
            let user = message.author;
            let racing = db.fetch(`winterracing_${user.id}`)
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

            let wheels = db.fetch(`${cars.Cars[carchoice.toLowerCase()].Name}tires_${message.author.id}`)

            if(wheels !== "WinterTires") return message.channel.send("Your car doesn't have any winter tires!")
           db.set(`winterracing_${user.id}`, Date.now())
			
        	
        
           let restoration = db.fetch(`${cars.Cars[arguments.slice(1).join(' ').toLowerCase()].Name}restoration_${message.author.id}`)
           if(cars.Cars[arguments.slice(1).join(' ').toLowerCase()].Junked && restoration < 100){
               return message.channel.send("This car is too junked to race, sorry!")
           }
            
        
          
               
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
            let embed = new Discord.MessageEmbed()
            .setTitle("Timer")
            .setDescription(`Going around the track! 🌨️`)
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
                    }else if (speed <= 150) {
                        return speedamount = randomRange(1, 3)
                    } 
                    else if (speed <= 170) {
                        return speedamount = randomRange(1, 4)
                    } else if (speed <= 190) {
                        return speedamount = randomRange(2, 4)
                    } else if (speed <= 220) {
                        return speedamount = randomRange(3, 5)
                    }
                    else if (speed <= 260) {
                        return speedamount = randomRange(4, 5)
                    }
                    else if (speed <= 300) {
                        return speedamount = randomRange(4, 6)
                    }
                     else {
                        return speedamount = 1
                    }
            
                }
           
                function randomRange(min, max) {
                    return Math.round(Math.random() * (max - min)) + min;
                }
                
                console.log(`amount: ${amount}`)

                count += amount

            
              
            
                if (count >= 20) {
                    let getpresent = randomRange(1, 2)
                    let randomnum = randomRange(1, 5)
                    let randomnum2 = randomRange(1, 2)
                    let prize
                    if(randomnum == 1){
                        prize = "2000 Cash"
                    }
                    else if(randomnum == 2){
                        prize = "5000 Cash"
                    }
                    else if(randomnum == 3){
                        prize = "T1Exhaust"
                    }
                    else if(randomnum == 4){
                        prize = "T1Intake"
                    }
                    else if(randomnum == 5){
                        if(randomnum2 == 1){
                            prize = "2017 ford focus rs"
                        }
                        else if(randomnum2 == 2){
                            prize = "1987 ferrari f40"
                        }
                    }

                    if(getpresent  == 1){
                        db.add(`presents_${message.author.id}`, 1)
                        message.channel.send("You got a present! Openining it up...")
                        setTimeout(() => {
                            if(prize == "2000 Cash"){
                                db.add(`cash_${message.author.id}`, 2000)
                                message.channel.send("You got 2000 cash!")
                            }
                            else if(prize == "5000 Cash"){
                                db.add(`cash_${message.author.id}`, 5000)
                                message.channel.send("You got 5000 cash!")
                            }
                            else if(prize == "T1Exhaust"){
                                db.push(`parts_${message.author.id}`, "t1exhaust")
                                message.channel.send(`You got a ${prize}!`)
                            }
                            else if(prize == "T1Intake"){
                                db.push(`parts_${message.author.id}`, "t1intake")
                                message.channel.send(`You got a ${prize}!`)
                            }
                            else if(prize == "2017 ford focus rs"){
                                if(user1cars.includes("2017 ford focus rs")) return message.channel.send(`You got a 2017 Ford Focus RS but you already own this car, so you get nothing,`)
                                db.push(`cars_${message.author.id}`, "2017 ford focus rs")
                                db.set(`2017 Ford Focus RSspeed_${message.author.id}`, cars.Cars["2017 ford focus rs"].Speed)
                                db.set(`2017 Ford Focus RSresale_${message.author.id}`, cars.Cars["2017 ford focus rs"].sellprice)
                                message.channel.send(`You got a 2017 Ford Focus RS!`)
                            }
                            else if(prize == "1987 ferrari f40"){
                                if(user1cars.includes("1987 ferrari f40")) return message.channel.send(`You got a 1987 Ferrari F40 but you already own this car, so you get nothing,`)
                                db.push(`cars_${message.author.id}`, "1987 ferrari f40")
                                db.set(`1987 Ferrari F40 speed_${message.author.id}`, cars.Cars["1987 ferrari f40"].Speed)
                                db.set(`1987 Ferrari F40 resale_${message.author.id}`, cars.Cars["1987 ferrari f40"].sellprice)
                                message.channel.send(`You got a 1987 Ferrari F40!`)
                            }
                            
                        }, 3000);
                    }
                    let moneyearn = 100 - counter
                    db.subtract(`races_${message.guild.id}`, 1)
                
                    if (count >= 20) {
                      message.channel.send(`${user}, you completed the winter track in ${counter} seconds and that got you $${moneyearn}`)
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