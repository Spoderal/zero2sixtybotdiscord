const db = require('quick.db')

module.exports = {
    commands: ['race'],
    description: 'Race another user!',
    expectedArgs:'<user you want to race> <car you want to race with>',
    permissionError: '',
    
    callback: (message, arguments, text) => {
      
       

        const Discord = require("discord.js");
        const db = require("quick.db");
        const client = new Discord.Client();
        const customcar1 = client.emojis.cache.get("851948907608539146")
        const customcar2 = client.emojis.cache.get("851948907487559750")
        let road = "<:road:872658289689780305>"

        
            const cars = require('../cardb.json');
        
            let user = message.author;
            let user2 = message.mentions.users.first()
            if(!user2) return message.channel.send("Specify a user to race!")
            let pvpwon = db.fetch(`pvpwon_${message.author.id}`)
           let pvpwon2 = db.fetch(`pvpwon_${user2.id}`)
            let pvplost = db.fetch(`pvplost_${message.author.id}`)
            let emoji1 = "<:racecar:872659453365878865>"
            let emoji2 = "<:racecar2:872659452971581441>"
            let user1cars = db.fetch(`cars_${user.id}`)
            let finish = "<:finish:877114047189884959>"
            let racing = db.fetch(`racing_${user.id}`)
        	let racing2 = db.fetch(`racing_${user2.id}`)


            if(racing == true) return message.channel.send(`You're already racing!`)
            if(racing2 == true) return message.channel.send(`They're racing already!`)
            if (!user1cars) return message.channel.send("You dont have any cars!")
            if (!message.mentions.users.first()) return message.channel.send('Please mention the user you want to verse.')
            
            if (!user1cars.some(e => e.includes(arguments.slice(1).join(' ')))) return message.channel.send(`You need to enter the car you want to verse with. E.g. \`race @user dragster\`\nYour current cars: ${user1cars.join(' ')}`)
            if(!arguments.slice(1).join(' ')) return message.channel.send("You need to enter a car! Example: race @user car")
            if(message.author.id === user2.id) return message.channel.send("You cant race yourself!")
        
            let user2cars = db.fetch(`cars_${user2.id}`);
            if (!user2cars) return message.channel.send("They dont have any cars!")
          
            message.channel.send(`${user2}, what car do you wish to verse ${user} in?`)
            let choice, collector = message.channel.createMessageCollector(m => m.author.id === user2.id, { max: 1, time: 600000})
            collector.on('collect', msg => {
                if (!user2cars.includes(msg.content)) return message.channel.send(`You don't have that car, you currently have: ${user2cars.join(' ')}\nEnter one of the following above`)
                choice = Object.entries(cars.Cars).find(s => s[1].Name === msg.content)[0]
        
            })
        
            collector.on('end', async () => {
                if (!choice) return message.channel.send("They didn't answer in time!")
                let user2carspeed = db.fetch(`${choice}speed_${user2.id}`);
                let user1car = Object.entries(cars.Cars).find(s => s[1].Name.includes(arguments.slice(1).join(' ')))[0]
                db.set(`racing_${user.id}`, true)
                db.set(`racing_${user2.id}`, true)

                 let user1carspeed = db.fetch(`${user1car}speed_${user.id}`);
        
                 let speeds = []
       
              

                 for (var n = 1; n <= 210; n++) {
                     speeds.push(n)
             }
         
         

             let count = 0,
             count2 = 0,
             i = 0,
             speed = user1carspeed,
             speed2 = user2carspeed
         let msg = await message.channel.send(`${user}:${emoji1}${road.repeat(20)}${finish}\n${user2}:${emoji2}${road.repeat(20)}${finish}`)
         
         let x = setInterval(() => {
             let amount = getspeed(speed)
             let amount2 = getspeed2(speed2)
         
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
         
             if (count >= 20 || count2 >= 20) {
                 db.set(`racing_${user.id}`, false)
                 db.set(`racing_${user2.id}`, false)

                 if (count >= 20 && count2 >= 20) message.channel.send('Looks like its a tie')
                 else message.channel.send(count >= 20 ? `${message.author} won $250!` : `${user2} won $250!`)
                 if (count >= 20) {
                     db.add(`cash_${user.id}`, 350)
                     db.add(`notoriety_${user.id}`, 10)
                     db.add(`pvpwon_${user.id}`, 1)
                     db.add(`tickets_${user.id}`, 1)
                     
                      if(pvpwon == 100){
                        message.channel.send(`${user} just earned yourself a McLaren F1 for winning 100 races, check your garage!`)
                        db.push(`cars_${message.author.id}`, cars.Cars["1995 McLaren F1"].Name)
                        db.set(`1995 McLaren F1speed_${message.author.id}`, cars.Cars["1995 McLaren F1"].Speed)
                        db.set(`1995 McLaren F1resale_${message.author.id}`, cars.Cars["1995 McLaren F1"].sellprice)
                    }

                 }
                 if (count2 >= 20) {
                    db.add(`cash_${user2.id}`, 350)
                    db.add(`notoriety_${user2.id}`, 25)
                    db.add(`pvpwon_${user2.id}`, 1)
                    db.add(`tickets_${user2.id}`, 1)

                      if(pvpwon2 == 100){
                        message.channel.send(`${user2}, You just earned yourself a McLaren F1 for winning 100 PVP races, check your garage!`)
                        db.push(`cars_${user2.id}`, cars.Cars["1995 McLaren F1"].Name)
                        db.set(`1995 McLaren F1speed_${user2.id}`, cars.Cars["1995 McLaren F1"].Speed)
                        db.set(`1995 McLaren F1resale_${user2.id}`, cars.Cars["1995 McLaren F1"].sellprice)
                    }
                 }
         
                 clearInterval(x)
             }
             console.log(count)
         
             if (++i % 3 === 0 || count <= 20 && count2 <= 20) {
                 msg.edit(`${`${road}`.repeat(!count ? 0 : count - 1)}${emoji1}${`${road}`.repeat(20 - count)}${finish}\n${`${road}`.repeat(!count2 ? 0 : count2 - 1)}${emoji2}${`${road}`.repeat(20 - count2)}${finish}`)
             }
         
         }, 5000)
     
     
     
     
     
     
        })
   

 },    
 permissions: '',
 requiredRoles: [],
}  
