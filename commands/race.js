module.exports = {
    commands: ['race'],
    description: 'Race another user!',
    expectedArgs:'<user you want to race> <car you want to race with>',
    permissionError: '',
    
    callback: (message, arguments, text, client) => {
        
        const lodash = require('lodash')

        let gifs = ['https://c.tenor.com/FKZHV97zKHkAAAAS/fast-street-racing.gif', 'https://c.tenor.com/GltPuC9GMPgAAAAS/smart-car-fast.gif', 'https://c.tenor.com/a4c0DSEcKeUAAAAM/racing-speeding.gif']
        let randomgif = lodash.sample(gifs)
        const ms = require('pretty-ms')
        const discord = require("discord.js");
        const db = require("quick.db");
        const parts = require('../partsdb.json')
        let road = "<:road:872658289689780305>"

        
            const cars = require('../cardb.json');
        
            let user = message.author;
            let user2 = message.mentions.users.first()
            if(!user2) return message.channel.send("Specify a user to race!")
            let user2badge1 = db.fetch(`100racebadge_${user2.id}`)
            let user2badge2 = db.fetch(`howbadge_${user2.id}`)
            let badge1 = db.fetch(`100racebadge_${message.author.id}`)
            let badge2 = db.fetch(`howbadge_${message.author.id}`)
            let mclaren1 =  db.fetch(`mclarenwon_${message.author.id}`)
            let mclaren2 = db.fetch(`mclarenwon_${user2.id}`)
            let pvpwon = db.fetch(`pvpwon_${message.author.id}`)
           let pvpwon2 = db.fetch(`pvpwon_${user2.id}`)
           let timeout = 120000
            let pvplost = db.fetch(`pvplost_${message.author.id}`)
            let emoji1 = "<:racecar:872659453365878865>"
            let emoji2 = "<:racecar2:872659452971581441>"
            let user1cars = db.fetch(`cars_${user.id}`)
            let finish = "<:finish:877114047189884959>"
            let racing = db.fetch(`racing_${user.id}`)
        	let racing2 = db.fetch(`racing_${user2.id}`)

            if (racing !== null && timeout - (Date.now() - racing) > 0) {
                let time = ms(timeout - (Date.now() - racing), {compact: true});
              
                return message.channel.send(`Please wait ${time} before racing again.`)
              } 
              if (racing2 !== null && timeout - (Date.now() - racing2) > 0) {
                let time = ms(timeout - (Date.now() - racing2), {compact: true});
              
                return message.channel.send(`The other user needs to wait ${time} before racing again.`)
              } 

              
            if (!user1cars) return message.channel.send("You dont have any cars!")
            if (!message.mentions.users.first()) return message.channel.send('Please mention the user you want to verse.')
            if(!arguments.slice(1).join(' ')) return message.channel.send("You need to enter a car! Example: race @user car")
            let user1carchoice = arguments.slice(1).join(' ').toLowerCase()
            if(!user1carchoice) return message.channel.send("You need to enter a car! Example: race @user car")
            if (!user1cars.some(e => e.includes(arguments.slice(1).join(' ').toLowerCase()))) return message.channel.send(`You need to enter the car you want to verse with. E.g. \`race @user dragster\`\nYour current cars: ${user1cars.join(' ')}`)
            if(message.author.id === user2.id) return message.channel.send("You cant race yourself!")
        
            let user2cars = db.fetch(`cars_${user2.id}`);
            if (!user2cars) return message.channel.send("They dont have any cars!")
            if(!cars.Cars[user1carchoice]) return message.channel.send("Thats not a car!")

            let restoration = db.fetch(`${cars.Cars[user1carchoice.toLowerCase()].Name}restoration_${message.author.id}`)
            if(cars.Cars[user1carchoice.toLowerCase()].Junked && restoration < 100){
                return message.channel.send("This car is too junked to race, sorry!")
            }
            message.channel.send(`${user2}, what car do you wish to verse ${user} in?`)
            const filter = (m = discord.Message) => {
                return m.author.id === user2.id
            }
            let choice, collector = message.channel.createMessageCollector({
                filter,
                max: 1,
                time: 1000 * 20
            })
            let user2carchoice
            collector.on('collect', msg => {
                 user2carchoice = msg.content.toLowerCase()
                if(!cars.Cars[user2carchoice]) return message.channel.send("Thats not a car!")
                if (!user2cars.includes(user2carchoice)) return message.channel.send(`You don't have that car, you currently have: ${user2cars.join(' ')}\nEnter one of the following above`)
                choice = cars.Cars[user2carchoice].Name
                let restoration2 = db.fetch(`${cars.Cars[choice.toLowerCase()].Name}restoration_${message.author.id}`)
                if(cars.Cars[choice.toLowerCase()].Junked && restoration2 < 100){
                    return message.channel.send("This car is too junked to race, sorry!")
                }
            })
        
            collector.on('end', async () => {
                if (!choice) return message.channel.send("They didn't answer in time!")
                let user2carspeed = db.fetch(`${choice}speed_${user2.id}`);
                let user2car = cars.Cars[user2carchoice].Name
                let user1car =  cars.Cars[user1carchoice].Name
                db.set(`racing_${user.id}`, Date.now())
                db.set(`racing_${user2.id}`, Date.now())
                console.log(choice)
                 let user1carspeed = db.fetch(`${user1car}speed_${user.id}`);
                console.log(user1carspeed)
                 let speeds = []
       
              

                 for (var n = 1; n <= 210; n++) {
                     speeds.push(n)
             }
         
         

             let count = 0,
             count2 = 0,
             i = 0,
             speed = user1carspeed,
             speed2 = user2carspeed
             console.log(speed)
             console.log(speed2)
             let spoiler = db.fetch(`${user1car}spoiler_${message.author.id}`)
             if(spoiler){
                 let aero = parts.Parts[spoiler.toLowerCase()].Aero
                 
                 if(aero <= 2){
                     let randaeroadd = randomRange(1, 5)
                     speed += randaeroadd
 
                 }
             }
             let spoiler2 = db.fetch(`${user2car}spoiler_${message.author.id}`)
             if(spoiler2){
                 let aero = parts.Parts[spoiler2.toLowerCase()].Aero
                 
                 if(aero <= 2){
                     let randaeroadd = randomRange(1, 5)
                     speed2 += randaeroadd
 
                 }
             }
             let embed = new discord.MessageEmbed()
             .setTitle(`Racing ${user2.tag}...`)
             .setImage(randomgif)
             .setColor("#60b0f4")
             .addField("Speeds", `${message.author}: ${user1carspeed} MPH\n ${user2}: ${user2carspeed} MPH`)
             .setDescription(`${message.author}'s car: ${user1car}\n\n${user2}'s' car: ${user2car}`)
         let msg = await  message.channel.send({embeds: [embed]})
             
         let x = setInterval(() => {
             let amount = getspeed(speed)
             let amount2 = getspeed2(speed2)
         
             function getspeed(speedamount) {
                if(speed == 125){
                    return speedamount = 1

                }
                else if (speed <= 135) {
                    return speedamount = randomRange(1, 1)
                }else if (speed <= 150) {
                    return speedamount = randomRange(1, 2)
                } 
                else if (speed <= 170) {
                    return speedamount = randomRange(2, 3)
                } 
                else if (speed <= 190) {
                    return speedamount = randomRange(2, 4)
                } else if (speed <= 230) {
                    return speedamount = randomRange(3, 4)
                }
                else if (speed <= 270) {
                    return speedamount = randomRange(4, 5)
                }
                else if (speed <= 500) {
                    return speedamount = randomRange(4, 6)
                }
                 else {
                    return speedamount = 1
                }
        
            }
        
            function getspeed2(speedamount) {
                if(speed2 == 125){
                    return speedamount = 1

                }
                else if (speed2 <= 135) {
                    return speedamount = randomRange(1, 1)
                }else if (speed2 <= 150) {
                    return speedamount = randomRange(1, 2)
                } 
                else if (speed2 <= 170) {
                    return speedamount = randomRange(2, 3)
                } 
                else if (speed2 <= 190) {
                    return speedamount = randomRange(2, 4)
                } else if (speed <= 230) {
                    return speedamount = randomRange(3, 4)
                }
                else if (speed2 <= 270) {
                    return speedamount = randomRange(4, 5)
                }
                else if (speed2 <= 500) {
                    return speedamount = randomRange(4, 6)
                }
                 else {
                    return speedamount = 1
                }
        
            }
         
           
         
            count += amount
            count2 += amount2
             if (count >= 20 || count2 >= 20) {
                 
                 
                if (count >= 20 && count2 >= 20)  {
                    message.channel.send('Looks like its a tie')
                } 
               else  if (count >= 20) {
                   db.add(`cash_${user.id}`, 500)
                     db.add(`notoriety_${user.id}`, 10)
                     db.add(`pvpwon_${user.id}`, 1)
                     db.add(`tickets_${user.id}`, 1)
                     db.add(`wins_${user.id}`, 1)
                     db.add(`loses_${user2.id}`, 1)
                     let embedwin = new discord.MessageEmbed()
                     .setTitle(`${message.author.tag} won!`)
                     .addField(`Earnings`, `500`)
                     .setColor("#60b0f4")
                     msg.reply(`<@${message.author.id}> <@${user2.id}>`)
                     msg.edit({embeds: [embedwin]})
                     if(user1car == "1964 Peel P50" && !badge2){
                        message.channel.send(`You just earned the "How?" races badge for winning a race in a Peel P50! Check your profile.`)
                        db.set(`howbadge_${user.id}`, true)

                    }
                    if(pvpwon >= 100 && !mclaren1 && !badge1){
                        message.channel.send(`${user} just earned yourself a McLaren F1 for winning 100 PVP  races, and a badge, check your garage!`)
                        db.push(`cars_${message.author.id}`, cars.Cars["1995 McLaren F1"].Name)
                        db.set(`1995 McLaren F1speed_${message.author.id}`, cars.Cars["1995 McLaren F1"].Speed)
                        db.set(`mclarenwon_${user.id}`, true)
                        db.set(`1995 McLaren F1resale_${message.author.id}`, cars.Cars["1995 McLaren F1"].sellprice)
                        db.set(`100racebadge_${user.id}`, true)
                    }

                 }
                else if (count2 >= 20) {
                    db.add(`cash_${user2.id}`, 500)
                    db.add(`notoriety_${user2.id}`, 25)
                    db.add(`pvpwon_${user2.id}`, 1)
                    db.add(`tickets_${user2.id}`, 1)
                    db.add(`wins_${user2.id}`, 1)
                    db.add(`loses_${user.id}`, 1)
                    let embedwin = new discord.MessageEmbed()
                    .setTitle(`${user2.tag} won!`)
                    .addField(`Earnings`, `500`)
                    .setColor("#60b0f4")
                    msg.reply(`<@${message.author.id}> <@${user2.id}>`)
                    msg.edit({embeds: [embedwin]})
                    if(choice == "1964 Peel P50" && !user2badge2){
                        message.channel.send(`You just earned the "How?" races badge for winning a race in a Peel P50! Check your profile.`)
                        db.set(`howbadge_${user.id}`, true)

                    }
                      if(pvpwon2 >= 100 && !mclaren2 && !user2badge1){
                        message.channel.send(`${user2}, You just earned yourself a McLaren F1 for winning 100 PVP races, and a badge, check your garage!`)
                        db.push(`cars_${user2.id}`, cars.Cars["1995 McLaren F1"].Name)
                        db.set(`1995 McLaren F1speed_${user2.id}`, cars.Cars["1995 McLaren F1"].Speed)
                        db.set(`1995 McLaren F1resale_${user2.id}`, cars.Cars["1995 McLaren F1"].sellprice)
                        db.set(`mclarenwon_${user2.id}`, true)
                        db.set(`100racebadge_${user2.id}`, true)
                    }
                 }
                 
                 clearInterval(x)
             }
             console.log(count)
         
             
             
            }, 5000)
     
     
            
            
     
            
        })
        
        
    },    
 permissions: '',
 requiredRoles: [],
}  

function randomRange(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}