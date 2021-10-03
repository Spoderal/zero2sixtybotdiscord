const db = require('quick.db')
const lodash = require('lodash')

module.exports = {
    commands: ['botrace'],
    description: 'Race a bot!',
    expectedArgs:'<user you want to race> <car you want to race with>',
    permissionError: '',
    
    callback: async (message, arguments, text) => {
      
       
        const Discord = require("discord.js");
        const db = require("quick.db");
        const client = new Discord.Client();
   
        
            const cars = require('../cardb.json');
            let races = db.fetch(`races_${message.guild.id}`)
			let moneyearned = 250
            let user = message.author;
            let bot = arguments[0]
            let botlist = ['Bot1', 'Bot2']
            let botcar = null
            let racing = db.fetch(`racing_${user.id}`)
            let emoji1 = "<:racecar:872659453365878865>"
            let finish = "<:finish:877114047189884959>"
            let emoji2 = "<:racecar2:872659452971581441>"
            let road = "<:road:872658289689780305>"
            let user1cars = db.fetch(`cars_${user.id}`)
            let bot1cars = ['1995 Mazda Miata', '1995 Mazda Miata', '1991 Toyota MR2', '1995 Mazda Miata']
            let bot2cars = ['2014 Hyundai Genesis Coupe', '2008 Nissan 350Z', '2008 Nissan 350Z']
            if(racing) return message.channel.send(`You're already racing!`)
            if (!user1cars) return message.channel.send("You dont have any cars!")
            if (!bot) return message.channel.send('Please specify  the bot you want to verse. Bots available: Bot1, and Bot2')
            if(!botlist.includes(bot)) return message.reply("Thats not a bot! The available bots are: Bot1, and Bot2")
            if (!user1cars.some(e => e.includes(arguments.slice(1).join(' ')))) return message.channel.send(`You need to enter the car you want to verse with. E.g. \`race [bot] [car]\`\nYour current cars: ${user1cars.join(' ')}`)
            if(!arguments.slice(1).join(' ')) return message.channel.send("You need to enter a car! Example: race @user car")

            if(bot === 'Bot1')  {
                botcar = lodash.sample(bot1cars);
    			let moneyearned = 250;
            }

            if(bot === 'Bot2')  {
                botcar = lodash.sample(bot2cars)
                moneyearned += 250
            }
          
           db.set(`racing_${user.id}`, true)
			
        	
        
    
            
        
          
                let user2carspeed = cars.Cars[botcar].Speed;
               
                let user1car = Object.entries(cars.Cars).find(s => s[1].Name.includes(arguments.slice(1).join(' ')))[0]
        
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
            message.channel.send(`Bots Car: ${botcar}`)
            let msg = await message.channel.send(`You:${emoji1}${road.repeat(20)}${finish}\nBot:${emoji2}${road.repeat(20)}${finish}`)
            db.add(`races_${message.guild.id}`, 1)
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
                    } else if (speed <= 300) {
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
                    db.subtract(`races_${message.guild.id}`, 1)
                    db.set(`racing_${user.id}`, false)
                    if (count >= 20 && count2 >= 20)  return message.channel.send('Looks like its a tie')
                    else message.channel.send(count >= 20 ? `${message.author} won $${moneyearned}!` : `${message.author}, The bot won $${moneyearned}!`)
                    if (count >= 20) {
                        db.set(`racing_${user.id}`, false)
                        db.add(`cash_${user.id}`, moneyearned)
                        db.add(`notoriety_${user.id}`, 10)
                        db.subtract(`races_${message.guild.id}`, 1)

                    }
                    if (count2 >= 20) {
                       db.subtract(`races_${message.guild.id}`, 1)
                        message.channel.send("Bot: Tough luck loser! Maybe get a better ride.")
                    }
                    
                    clearInterval(x)
                }
                console.log(count)
            
                if (++i % 3 === 0 && count <= 20 && count2 <= 20) {
                    msg.edit(`${`${road}`.repeat(!count ? 0 : count - 1)}${emoji1}${`${road}`.repeat(20 - count)}${finish}\n${`${road}`.repeat(!count2 ? 0 : count2 - 1)}${emoji2}${`${road}`.repeat(20 - count2)}${finish}`)
                }
            
            }, 5000)
        
        
          
        
        
        
      
      

    },    
    permissions: '',
    requiredRoles: [],
  }  
  