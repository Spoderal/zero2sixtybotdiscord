const db = require('quick.db')
const ms = require('pretty-ms')
module.exports = {
    commands: ['streetrace', 'srace'],
    description: 'Race another user!',
    expectedArgs:'<user you want to race> <car you want to race with>',
    permissionError: '',
    
    callback: (message, arguments, text, client) => {
      
       

        const Discord = require("discord.js");


        
            const cars = require('../cardb.json');
        
            let user = message.author;
            let mentionsArr = message.mentions.users.array()
            console.log(mentionsArr)
            if(mentionsArr.length < 3) return message.channel.send("Specify 3 users to race!")
           
            let badge1 = db.fetch(`100racebadge_${message.author.id}`)
            let badge2 = db.fetch(`howbadge_${message.author.id}`)
            let mclaren1 =  db.fetch(`mclarenwon_${message.author.id}`)
            let pvpwon = db.fetch(`pvpwon_${message.author.id}`)
           let timeout = 120000
           
            let user1cars = db.fetch(`cars_${user.id}`)
            let user2cars = db.fetch(`cars_${mentionsArr[0].id}`)
            let user3cars = db.fetch(`cars_${mentionsArr[1].id}`)
            let user4cars = db.fetch(`cars_${mentionsArr[2].id}`)

            let racing = db.fetch(`racing_${user.id}`)
        	let racing2 = db.fetch(`racing_${mentionsArr[0].id}`)
        	let racing3 = db.fetch(`racing_${mentionsArr[1].id}`)
        	let racing4 = db.fetch(`racing_${mentionsArr[2].id}`)

            let user2 = mentionsArr[0]
            let user3 = mentionsArr[1]
            let user4 = mentionsArr[2]


            if (racing !== null && timeout - (Date.now() - racing) > 0) {
                let time = ms(timeout - (Date.now() - racing), {compact: true});
              
                return message.channel.send(`Please wait ${time} before racing again.`)
              } 
              if (racing2 !== null && timeout - (Date.now() - racing2) > 0) {
                let time = ms(timeout - (Date.now() - racing2), {compact: true});
              
                return message.channel.send(`${mentionsArr[0]} needs to wait ${time} before racing again.`)
              } 
              if (racing3 !== null && timeout - (Date.now() - racing3) > 0) {
                let time = ms(timeout - (Date.now() - racing3), {compact: true});
              
                return message.channel.send(`${mentionsArr[1]} needs to wait ${time} before racing again.`)
              } 
              if (racing4 !== null && timeout - (Date.now() - racing4) > 0) {
                let time = ms(timeout - (Date.now() - racing4), {compact: true});
              
                return message.channel.send(`${mentionsArr[2]} needs to wait ${time} before racing again.`)
              } 
            if (!user1cars) return message.channel.send(`${user} doesn't have any cars!`)
            if (!user2cars) return message.channel.send(`${mentionsArr[0]} doesn't have any cars!`)
            if (!user3cars) return message.channel.send(`${mentionsArr[1]} doesn't have any cars!`)
            if (!user4cars) return message.channel.send(`${mentionsArr[2]} doesn't have any cars!`)
            message.channel.send(`${user}, pick your car!`)
            let user1choice, collector1 = message.channel.createMessageCollector(m => m.author.id === user.id, { max: 1, time: 60000})
            collector1.on('collect', msg => {
                if (!user1cars.includes(msg.content.toLowerCase())) return message.channel.send(`You don't have that car, you currently have: ${user1cars.join(' ')}\nEnter one of the following above`)
                user1choice = cars.Cars[msg.content.toLowerCase()].Name

                //User 2
                message.channel.send(`${user2}, pick your car!`)
                let user2choice, collector2 = message.channel.createMessageCollector(m => m.author.id === user2.id, { max: 1, time: 60000})
                collector2.on('collect', msg2 => {
                    if (!user2cars.includes(msg2.content.toLowerCase())) return message.channel.send(`You don't have that car, you currently have: ${user2cars.join(' ')}\nEnter one of the following above`)
                    user2choice = cars.Cars[msg2.content.toLowerCase()].Name

                    //User 3
                    message.channel.send(`${user3}, pick your car!`)
                let user3choice, collector3 = message.channel.createMessageCollector(m => m.author.id === user3.id, { max: 1, time: 60000})
                collector3.on('collect', msg3 => {
                    if (!user3cars.includes(msg3.content.toLowerCase())) return message.channel.send(`You don't have that car, you currently have: ${user3cars.join(' ')}\nEnter one of the following above`)
                    user3choice = cars.Cars[msg3.content.toLowerCase()].Name

                    //User 4
                    message.channel.send(`${user4}, pick your car!`)
                    let user4choice, collector4 = message.channel.createMessageCollector(m => m.author.id === user4.id, { max: 1, time: 60000})
                    collector4.on('collect', msg4 => {
                        if (!user4cars.includes(msg4.content.toLowerCase())) return message.channel.send(`You don't have that car, you currently have: ${user4cars.join(' ')}\nEnter one of the following above`)
                        user4choice = cars.Cars[msg4.content.toLowerCase()].Name
                            
                        collector4.on('end', async () => {
                            let user1car = user1choice
                            let user2car = user2choice
                            let user3car = user3choice
                            let user4car = user4choice
            
                            db.set(`racing_${user.id}`, Date.now())
                            db.set(`racing_${user2.id}`, Date.now())
                            db.set(`racing_${user3.id}`, Date.now())
                            db.set(`racing_${user4.id}`, Date.now())
            
                             let user1carspeed = db.fetch(`${user1car}speed_${user.id}`);
                             let user2carspeed = db.fetch(`${user2car}speed_${user.id}`);
                             let user3carspeed = db.fetch(`${user3car}speed_${user.id}`);
                             let user4carspeed = db.fetch(`${user4car}speed_${user.id}`);
            
                             let speeds = []
                   
                          
            
                             for (var n = 1; n <= 210; n++) {
                                 speeds.push(n)
                         }
                     
                     
            
                         let count = 0,
                         count2 = 0,
                         count3 = 0,
                         count4 = 0,
            
                         i = 0,
                         speed = user1carspeed,
                         speed2 = user2carspeed,
                         speed3 = user3carspeed,
                         speed4 = user4carspeed
                    
                     let embed = new Discord.MessageEmbed()
                     .setTitle("Street Race")
                     .addField(`${user.tag}'s car'`, user1car)
                     .addField(`${user2.tag}'s car'`, user2car)
                     .addField(`${user3.tag}'s car'`, user3car)
                     .addField(`${user4.tag}'s car'`, user4car)
                    .setColor("#60b0f4")
                     let msg = await message.channel.send({embeds: [embed]})
                     
                     let x = setInterval(() => {
                         let amount = getspeed(speed)
                         let amount2 = getspeed2(speed2)
                         let amount3 = getspeed(speed3)
                         let amount4 = getspeed(speed4)
            
                         function getspeed(speedamount) {
                             if (speed <= 125) {
                                 return speedamount = randomRange(1, 2)
                             } else if (speed <= 160) {
                                 return speedamount = randomRange(1, 3)
                             } else if (speed <= 190) {
                                 return speedamount = randomRange(2, 4)
                             } else if (speed == 210) {
                                 return speedamount = randomRange(3, 5)
                             } else {
                                 return speedamount = 1
                             }
                     
                         }
                     
                         function getspeed2(speedamount) {
                            if (speed2 <= 125) {
                                return speedamount = randomRange(1, 2)
                            } else if (speed2 <= 160) {
                                return speedamount = randomRange(1, 3)
                              } else if (speed2 <= 190) {
                                   return speedamount = randomRange(2, 4)
                               } else if (speed2 <= 300) {
                                   return speedamount = randomRange(3, 5)
                               } else {
                                   return speedamount = 1
                               }
                    
                        }
                     
                         function randomRange(min, max) {
                             return Math.round(Math.random() * (max - min)) + min;
                         }
                         count += amount
                         count2 += amount2
                         count3 += amount3
                         count4 += amount4
            
                         if (count >= 20 || count2 >= 20 || count3 >= 20 || count4 >= 20) {
                           
            
                           
                              if (count >= 20) {
                                 db.add(`cash_${user.id}`, 800)
                                 db.add(`notoriety_${user.id}`, 15)
                                 db.add(`pvpwon_${user.id}`, 1)
                                 db.add(`tickets_${user.id}`, 2)
                                 db.add(`raceswon_${user.id}`, 1)
                                message.channel.send(`${user} won the race!`)
            
                             }
                             else if (count2 >= 20) {
                                db.add(`cash_${user2.id}`, 800)
                                 db.add(`notoriety_${user2.id}`, 15)
                                 db.add(`pvpwon_${user2.id}`, 1)
                                 db.add(`tickets_${user2.id}`, 2)
                                 db.add(`raceswon_${user2.id}`, 1)
                                 message.channel.send(`${user2} won the race!`)
            
                             }
                             else if (count3 >= 20) {
                                db.add(`cash_${user3.id}`, 800)
                                db.add(`notoriety_${user3.id}`, 15)
                                db.add(`pvpwon_${user3.id}`, 1)
                                db.add(`tickets_${user3.id}`, 2)
                                db.add(`raceswon_${user3.id}`, 1)
                                message.channel.send(`${user3} won the race!`)
            
                             }
                             else if (count4 >= 20) {
                                db.add(`cash_${user4.id}`, 800)
                                db.add(`notoriety_${user4.id}`, 15)
                                db.add(`pvpwon_${user4.id}`, 1)
                                db.add(`tickets_${user4.id}`, 2)
                                db.add(`raceswon_${user4.id}`, 1)
                                message.channel.send(`${user4} won the race!`)
            
                             }

                             
                     
                             clearInterval(x)
                         }
                     
                    
                     
                     }, 5000)
                 
                 
                 
                 
                 
                 
                    })
                    })
                })
            
                })
                
            })
        
          
        
   

 },    
 permissions: '',
 requiredRoles: [],
}  
