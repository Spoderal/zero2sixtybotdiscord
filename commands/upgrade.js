const discord = require("discord.js")
const client = new discord.Client()

module.exports = {
    commands: ['upgrade'],
    description: 'Upgrade a part on your car!',
    permissionError: '',
    
    callback: (message, arguments, arguments2, text) => {
        const db = require('quick.db')
        const user1 = message.author
        const parts = db.fetch(`parts_${user1.id}`)
        const user1cars = db.fetch(`cars_${user1.id}`)
        const car = arguments.splice(1).join(" ")
        let carexhaust = db.fetch(`${car}exhaust_${user1.id}`)
        let cartires= db.fetch(`${car}tires_${user1.id}`)
        let carturbo= db.fetch(`${car}turbo_${user1.id}`)
		let carintake = db.fetch(`${car}intake_${user1.id}`)
        
        let usercarspeed = db.fetch(`${car}speed_${message.author.id}`)
        const partdb = require("../partsdb.json")
        const cars = require("../cardb.json")
        
        let list2 = ['1995 Mazda Miata', '2022 Acura NSX Type S', '2000 Acura NSX', '1997 Acura Integra','1971 Datsun 240Z', '1968 Chevy Camaro SS', '2001 Toyota Supra MK4', '2010 Ferrari 458 Italia', '2014 Lamborghini Huracan', '1991 Acura NSX', '1991 Toyota MR2', '2002 Pontiac Firebird', '1994 Mitsubishi 3000GT VR4', '2014 Hyundai Genesis Coupe', '2008 Nissan 350Z', '2010 Chevy Camaro V6', '2020 Chevy Corvette C8', '2020 Porsche 718 Cayman', '2021 Ford Mustang Mach 1', '1998 BMW M3 E36', '2005 Dodge Neon SRT4']
        
        const parttoinstall = arguments[0]

        if(!parts) return message.channel.send("You dont have any parts!")
        let list = ['Tier1Exhaust', 'Tier1Tires', 'Tier1Intake', 'Turbo']
        let exhaustlist = ['Tier1Exhaust']
        let tireslist = ['Tier1Tires']
        let turbolist = ['Turbo']
        let intakelist = ['Tier1Intake']
        let enginelist = ['2JZ-GTE']
        if(!list.includes(parttoinstall)) return message.channel.send("Thats not an available part!")
        if(!list2.includes(car)) return message.channel.send("Thats not an available car!")
        if(!user1cars.includes(cars.Cars[car].Name)) return message.channel.send("You dont own that car!")

        parseInt(usercarspeed)
       if(parttoinstall === "Engine"){
        let userengines = db.fetch(`engines_${message.author.id}`)
        if(!userengines || userengines == null || userengines == []) return message.channel.send("You dont have any engines.")
        message.channel.send(`What engine would you like to put inside your ${car}`)
        let choice, collector = message.channel.createMessageCollector(m => m.author.id === message.author.id, { max: 1, time: 600000})
        collector.on('collect', msg => {
         
            if (!userengines.includes(msg.content)) return message.channel.send(`You don't have that engine, you currently have: ${userengines.join(' ')}\nEnter one of the following above`)
            choice = Object.entries(partdb.Parts).find(s => s[1].Name === msg.content)[0]
            
        })
    
        collector.on('end', async () => {
            if (!userengines.includes(choice)) return;
                let carengine = db.fetch(`${car}engine_${message.author.id}`)
                if(!carengine == cars.Cars[car].Engine) return message.channel.send("Remove your old engine before putting in a new one!")
                if(carengine == choice) return message.channel.send("This engine is already installed in this car!")
                db.set(`${car}engine_${message.author.id}`, choice )
                db.add(`${car}speed_${message.author.id}`, partdb.Parts[choice].AddedSpeed)
                db.add(`${car}resale_${message.author.id}`, partdb.Parts[choice].sellprice)
                message.channel.send(`Swapped engine for a ${choice} and added ${partdb.Parts[choice].AddedSpeed} speed.`)


            
            })
       }
       else {
        const partspeed = partdb.Parts[parttoinstall].AddedSpeed
        if(!parts.includes(partdb.Parts[parttoinstall].Name)) return message.channel.send("You dont have that part!");

           if(exhaustlist.includes(parttoinstall)){
               if(carexhaust) return message.channel.send("You already have an exhaust installed!")
               const filtered = parts.filter(e => e !== parttoinstall);
           db.set(`${car}exhaust_${user1.id}`, `${partdb.Parts[parttoinstall].Name}`)
           db.set(`parts_${message.author.id}`, filtered)
           db.add(`${car}speed_${message.author.id}`, partdb.Parts[parttoinstall].AddedSpeed)
           db.add(`${car}resale_${message.author.id}`, partdb.Parts[parttoinstall].sellprice )
           message.channel.send(`You installed a ${parttoinstall} on your ${car}`)
           }
           else if(tireslist.includes(parttoinstall)){
               if(cartires) return message.channel.send("You already have tires installed!")
               const filtered = parts.filter(e => e !== parttoinstall);
               db.set(`parts_${message.author.id}`, filtered)
               db.set(`${car}tires_${user1.id}`, `${partdb.Parts[parttoinstall].Name}`)
               db.add(`${car}speed_${message.author.id}`, partdb.Parts[parttoinstall].AddedSpeed)
               db.add(`${car}resale_${message.author.id}`, partdb.Parts[parttoinstall].sellprice )
               message.channel.send(`You installed ${parttoinstall} tires on your ${car}`)
               }
               else if(turbolist.includes(parttoinstall)){
                   if(carturbo) return message.channel.send("You already have a turbo installed!")
                   const filtered = parts.filter(e => e !== parttoinstall);
                   db.set(`parts_${message.author.id}`, filtered)
                   db.set(`${car}turbo_${user1.id}`, `${partdb.Parts[parttoinstall].Name}`)
                   db.add(`${car}speed_${message.author.id}`, partdb.Parts[parttoinstall].AddedSpeed)
                   db.add(`${car}resale_${message.author.id}`, partdb.Parts[parttoinstall].sellprice )
                   message.channel.send(`You installed a ${parttoinstall} on your ${car}`)
                   }
                   else if(intakelist.includes(parttoinstall)){
                       if(carturbo) return message.channel.send("You already have an intake installed!")
                       const filtered = parts.filter(e => e !== parttoinstall);
                       db.set(`parts_${message.author.id}`, filtered)
                       db.set(`${car}intake_${user1.id}`, `${partdb.Parts[parttoinstall].Name}`)
                       db.add(`${car}speed_${message.author.id}`, partdb.Parts[parttoinstall].AddedSpeed)
                       db.add(`${car}resale_${message.author.id}`, partdb.Parts[parttoinstall].sellprice )
                       message.channel.send(`You installed a ${parttoinstall} on your ${car}`)
                       }
   
           
          
       }

    },
    permissions: '',
    requiredRoles: [],
  }
  