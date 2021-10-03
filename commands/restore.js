module.exports = {
    commands: ['restore'],
    description: 'Installs a part on your junk car!',
    permissionError: '',
    
    callback: (message, arguments, arguments2, text) => {
        const db = require('quick.db')
        const user1 = message.author
        const user1cars = db.fetch(`cars_${user1.id}`)
        const user1parts = db.fetch(`junkparts_${user1.id}`)
        const partdb = require("../partsdb.json")
        const cars = require("../cardb.json")
        let part = arguments[0]
        let car = arguments.splice(1).join(" ")
        if(!cars.Cars.JunkedCars[car]) return message.channel.send("Thats not a car!")
        let partsavailable = ['Doors', 'Engine', 'Transmission', 'Glass', 'Hood', 'Tires']
        if(!user1parts || user1parts == null) db.set(`junkparts_${message.author.id}`, [''])
        if(!user1cars || user1cars == null) db.set(`junkcars_${user1.id}`, [''])
        if(!part) return message.channel.send("Specify a part!");
        if(!car) return message.channel.send("Specify a car!");
        if(!user1cars.includes(cars.Cars.JunkedCars[car].Name)) return message.channel.send("You dont own that car!");
        
        let partsneeded = db.fetch(`${car}partsneeded_${message.author.id}`)
        let partsadded = db.fetch(`${car}partsadded_${message.author.id}`)
        if(!partsadded || partsadded == null) db.set(`${car}partsadded_${message.author.id}`, [''])
        let resale = db.fetch(`${car}resale_${message.author.id}`)
        if(part == "Finish"){
            if(car == "Junked 1968 Chevy Camaro SS") {
                if(!partsneeded.length == 0) return message.channel.send("This car is not ready to be restored fully!")
                let filtered = user1cars.filter(e => e !== 'Junked 1968 Chevy Camaro SS');
                db.set(`cars_${user1.id}`, filtered)
                db.push(`cars_${message.author.id}`, '1968 Chevy Camaro SS')
                db.set(`1968 Chevy Camaro SSspeed_${message.author.id}`, cars.Cars['1968 Chevy Camaro SS'].Speed)
                db.set(`1968 Chevy Camaro SSresale_${message.author.id}`, cars.Cars['1968 Chevy Camaro SS'].sellprice)
                
                message.channel.send(`You restored your 1968 Chevy Camaro SS`)
            } 
            else if(car == "Junked 1971 Datsun 240Z") {
                if(!partsneeded.length == 0) return message.channel.send("This car is not ready to be restored fully!")
                let filtered = user1cars.filter(e => e !== 'Junked 1971 Datsun 240Z');
                db.set(`junkcars_${user1.id}`, filtered)
                db.push(`cars_${message.author.id}`, '1971 Datsun 240Z')
                db.set(`1971 Datsun 240Zspeed_${message.author.id}`, cars.Cars['1971 Datsun 240Z'].Speed)
                db.set(`1971 Datsun 240Zresale_${message.author.id}`, cars.Cars['1971 Datsun 240Z'].sellprice)
                
                message.channel.send(`You restored your 1971 Datsun 240Z`)
            }
        }
        else {

            if(partsavailable.includes(part)) {
                if(!partsavailable.includes(part)) return message.channel.send("Thats not an available part to restore!");
                if(!user1parts.includes(part)) return message.channel.send("You dont own that part!");
                
                if(partsadded.includes(part)) return message.channel.send("Thats already a restored part!");
                const filtered = partsneeded.filter(e => e !== part);
    
                db.set(`${car}partsneeded_${message.author.id}`, filtered)
                db.set(`junkparts_${message.author.id}`, filtered)
                db.push(`${car}partsadded_${message.author.id}`, part)
                db.add(`${car}resale_${message.author.id}`, 50)
                message.channel.send(`Restored the ${part} on your ${car}`)
    
            }
        }
       

    },
    permissions: '',
    requiredRoles: [],
  }
  