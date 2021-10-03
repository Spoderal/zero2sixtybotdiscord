const cardb = require('../cardb.json')
const junkeddb = cardb.JunkedCars
const discord = require('discord.js')
const lodash = require('lodash')
const db = require("quick.db")
const junk = require('./junk')
module.exports = {
    commands: ['junkyard'],
    callback: (message, arguments, text) => {
        
        let junkembed = "<:junk:872742534156259348>"
        let caremoji = "<:junkcar:872940633390735383>"
        let junkcars = db.fetch(`cars_${message.author.id}`)
        let junkparts= db.fetch(`junkparts_${message.author.id}`)
        let randomresult = ['Junked 1971 Datsun 240Z', 'Junked 1968 Chevy Camaro SS', 'Engine', 'Transmission', 'Tires', 'Glass', 'Hood', 'Doors']
        let randomcar = lodash.sample(randomresult)

        const embed = new discord.MessageEmbed()
        embed.setTitle(`Junkyard`)
        embed.setDescription(` Click the reaction to search for junk\n\n${junkembed}${junkembed}${junkembed}${junkembed}${caremoji}\n
        ${junkembed}${junkembed}${junkembed}${junkembed}${junkembed}\n
        ${junkembed}${junkembed}${caremoji}${junkembed}${junkembed}\n
        ${caremoji}${junkembed}${junkembed}${junkembed}${junkembed}\n
        ${junkembed}${junkembed}${junkembed}${caremoji}${junkembed}\n`)
            
        message.channel.send(embed).then(msg => {
        msg.react('🔍')

    
        const AFilter = (reaction, user) => reaction.emoji.name === '🔍' && user.id === message.author.id;
     
    
    
        const AClass = msg.createReactionCollector(AFilter, {time: 60000});
     
     
        AClass.on('collect', r => {
            if(randomcar === 'Nothing') {
                embed.setDescription(`You found **Nothing**`)
                embed.setImage("https://www.alpinematerials.com/wp-content/uploads/2017/03/8Y7A5119.jpg")
            }
            else if(randomcar === 'Junked 1971 Datsun 240Z' ) {
                if(!junkcars || junkcars == null) {
                    junkcars == ['']
                }
                if(junkcars.includes(cardb.Cars.JunkedCars['Junked 1971 Datsun 240Z'].Name)){
                    return message.channel.send("You found a Junked 1971 Datsun 240Z but you already own this car!");
                }
                
                    db.push(`cars_${message.author.id}`, 'Junked 1971 Datsun 240Z')
            
                    embed.setDescription(`You found a **Junked 1971 Datsun 240Z**`)
                    embed.setImage("https://zcarguide.com/wp-content/uploads/2017/05/partssalvage.jpg")
                    db.set(`Junked 1971 Datsun 240Zpartsneeded_${message.author.id}`, cardb.Cars.JunkedCars['Junked 1971 Datsun 240Z'].Partstoinstall)
                    db.set(`Junked 1971 Datsun 240Zpartsadded_${message.author.id}`, [])
                    db.set(`Junked 1971 Datsun 240Zspeed_${message.author.id}`, cardb.Cars.JunkedCars['Junked 1971 Datsun 240Z'].Speed)
                    db.set(`Junked 1971 Datsun 240Zresale_${message.author.id}`, cardb.Cars.JunkedCars['Junked 1971 Datsun 240Z'].sellprice)

                    
              
            }
          else if(randomcar === 'Engine' ) {
                if(!junkparts || junkparts == null) {
                    junkparts == ['']
                }
                if(junkparts.includes('Engine')){
                    return message.channel.send("You found an Engine but you already own this part!");
                }
                embed.setDescription(`You found an **Engine**`)

                    db.push(`junkparts_${message.author.id}`, 'Engine')
                
               
            }
            else if(randomcar === 'Transmission' ) {
                if(!junkparts || junkparts == null) {
                    junkparts == ['']
                }
                if(junkparts.includes('Transmission')){
                    return message.channel.send("You found a Transmission but you already own this part!");
                }
                embed.setDescription(`You found a **Transmission**`)

                    db.push(`junkparts_${message.author.id}`, 'Transmission')
               
            }
            else if(randomcar === 'Doors' ) {
                if(!junkparts || junkparts == null) {
                    junkparts == ['']
                }
                if(junkparts.includes('Doors')){
                    return message.channel.send("You found Doors but you already own this part!");
                }
                embed.setDescription(`You found **Doors**`)

                    db.push(`junkparts_${message.author.id}`, 'Doors')

               
            }
            else if(randomcar === 'Glass' ) {
                if(!junkparts || junkparts == null) {
                    junkparts == ['']
                }
                if(junkparts.includes('Glass')){
                    return message.channel.send("You found Glass but you already own this part!");
                }
                embed.setDescription(`You found **Glass**`)

                    db.push(`junkparts_${message.author.id}`, 'Glass')
                
               
            }
            else if(randomcar === 'Hood' ) {
                if(!junkparts || junkparts == null) {
                    junkparts == ['']
                }
                if(junkparts.includes('Hood')){
                    return message.channel.send("You found a Hood but you already own this part!");
                }
                embed.setDescription(`You found a **Hood**`)

                    db.push(`junkparts_${message.author.id}`, 'Hood')
                
               
            }
            else if(randomcar === 'Tires' ) {
                if(!junkparts || junkparts == null) {
                    junkparts == ['']
                }
                if(junkparts.includes('Tires')){
                    return message.channel.send("You found an Engine but you already own this part!");
                }
                embed.setDescription(`You found **Tires**`)

                    db.push(`junkparts_${message.author.id}`, 'Tires')
                
               
            }
            else if(randomcar === 'Junked 1968 Chevy Camaro SS' ) {
                if(!junkcars || junkcars == null) {
                    junkcars == ['']
                }
                if(junkcars.includes(cardb.Cars.JunkedCars['Junked 1968 Chevy Camaro SS'].Name)) {
                    return message.channel.send("You found a Junked 1968 Chevy Camaro SS but you already own this car!");
                }
               

                    embed.setDescription(`You found a **Junked 1968 Chevy Camaro SS**`)
                    embed.setImage("https://i0.wp.com/www.musclecarsandtrucks.com/wp-content/uploads/2020/06/Junkyard-Chevy-Camaro-Z28.2.jpg?fit=1280%2C704&ssl=1")
    
                    db.push(`cars_${message.author.id}`, 'Junked 1968 Chevy Camaro SS')
               
                    db.set(`Junked 1968 Chevy Camaro SSpartsneeded_${message.author.id}`, cardb.Cars.JunkedCars['Junked 1968 Chevy Camaro SS'].Partstoinstall)
                    db.set(`Junked 1968 Chevy Camaro SSpartsadded_${message.author.id}`, [])
                    db.set(`Junked 1968 Chevy Camaro SSspeed_${message.author.id}`, cardb.Cars.JunkedCars['Junked 1968 Chevy Camaro SS'].Speed)
                    db.set(`Junked 1968 Chevy Camaro SSresale_${message.author.id}`,cardb.Cars.JunkedCars['Junked 1968 Chevy Camaro SS'].sellprice )

                    
            }

            else if(randomcar === 'Junked 1969 Ford Mustang Mach 1' ) {
                if(!junkcars || junkcars == null) {
                    junkcars == ['']
                }
                if(junkcars.includes(cardb.Cars.JunkedCars['Junked 1969 Ford Mustang Mach 1'].Name)) {
                    return message.channel.send("You found a Junked 1969 Ford Mustang Mach 1 but you already own this car!");
                }
               

                    embed.setDescription(`You found a **Junked 1969 Ford Mustang Mach 1**`)
                    embed.setImage(cardb.Cars["Junked 1969 Ford Mustang Mach 1"].Image)
    
                    db.push(`cars_${message.author.id}`, 'Junked 1969 Ford Mustang Mach 1')
               
                    db.set(`Junked 1969 Ford Mustang Mach 1partsneeded_${message.author.id}`, cardb.Cars.JunkedCars['Junked 1969 Ford Mustang Mach 1'].Partstoinstall)
                    db.set(`Junked 1969 Ford Mustang Mach 1partsadded_${message.author.id}`, [])
                    db.set(`Junked 1969 Ford Mustang Mach 1speed_${message.author.id}`, cardb.Cars.JunkedCars['Junked 1969 Ford Mustang Mach 1'].Speed)
                    db.set(`JJunked 1969 Ford Mustang Mach 1resale_${message.author.id}`,cardb.Cars.JunkedCars['Junked 1969 Ford Mustang Mach 1'].sellprice )

                    
            }

              else if(randomcar === 'Junked 1970 Dodge Charger' ) {
                if(!junkcars || junkcars == null) {
                    junkcars == ['']
                }
                if(junkcars.includes(cardb.Cars.JunkedCars['Junked 1970 Dodge Charger'].Name)) {
                    return message.channel.send("You found a Junked 1970 Dodge Charger but you already own this car!");
                }
               

                    embed.setDescription(`You found a **Junked 1970 Dodge Charger**`)
                    embed.setImage(cardb.Cars["Junked 1970 Dodge Charger"].Image)
    
                    db.push(`cars_${message.author.id}`, 'Junked 1970 Dodge Charger')
               
                    db.set(`Junked 1970 Dodge Chargerpartsneeded_${message.author.id}`, cardb.Cars.JunkedCars['Junked 1970 Dodge Charger'].Partstoinstall)
                    db.set(`Junked 1970 Dodge Chargerpartsadded_${message.author.id}`, [])
                    db.set(`Junked 1970 Dodge Chargerspeed_${message.author.id}`, cardb.Cars.JunkedCars['Junked 1970 Dodge Charger'].Speed)
                    db.set(`Junked 1970 Dodge Chargerresale_${message.author.id}`,cardb.Cars.JunkedCars['Junked 1970 Dodge Charger'].sellprice )

                    
            }
        
            
          const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
    try {
        for (const reaction of userReactions.values()) {
             reaction.users.remove(message.author.id);
        }
    } catch (error) {
        console.error('Failed to remove reactions.');
    }
          msg.edit(embed)
          msg.reactions.removeAll()
      }); 
        })
    
       
        
    },
    permissions: '',
    requiredRoles: [],
  }