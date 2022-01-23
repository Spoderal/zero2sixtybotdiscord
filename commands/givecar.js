const db = require('quick.db')
const discord = require('discord.js')
const cars = require('../cardb.json')
module.exports = {
    commands: ['givecar'],
    callback: (message, arguments, text) => {
        if(message.author.id !== "275419902381260802"){

            message.channel.send("You dont have permission to use this command!")
            return;
        }
          else{
        let togive = arguments.splice(1).join(' ')
        let givingto = arguments[0]

        
        if(!togive) return
        if(!givingto) return
      
        if(!cars.Cars[togive.toLowerCase()]) return message.channel.send("Thats not a car!")

        db.push(`cars_${givingto}`, cars.Cars[togive.toLowerCase()].Name.toLowerCase())
        db.set(`${cars.Cars[togive.toLowerCase()].Name}speed_${givingto}`, cars.Cars[togive.toLowerCase()].Speed)
        db.set(`${cars.Cars[togive.toLowerCase()].Name}resale_${givingto}`, cars.Cars[togive.toLowerCase()].sellprice)

        message.channel.send(`Gave <@${givingto}> a ${cars.Cars[togive.toLowerCase()].Name}`)

         
        }
    },
    permissions: '',
    requiredRoles: [],
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  