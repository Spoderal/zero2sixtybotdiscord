const Discord = require("discord.js")
const cars = require('../cardb.json')
const db = require('quick.db')
let list = cars.Cars
module.exports = {
    commands: ['setlicense', 'sl'],
    callback: (message, arguments, text) => {
        let numbersandletters = arguments[0]
        let car = arguments.splice(1).join(' ')
        if(!list[car.toLowerCase()]) return message.channel.send("Thats not a car!")
        let usercars = db.fetch(`cars_${message.author.id}`)
        if(!usercars.includes(`${cars.Cars[car.toLowerCase()].Name.toLowerCase()}`)) return message.channel.send("You dont have that car!")
        if(!numbersandletters) return message.channel.send("Specify a plate number!") 

        let letterCount = numbersandletters.replace(/\s+/g, '').length;
        console.log(letterCount)
        if(letterCount > 6) return message.channel.send("Max characters 6")

        db.set(`${cars.Cars[car.toLowerCase()].Name}license_plate_${message.author.id}`, numbersandletters)
        message.channel.send(`Set plate number for ${car} to ${numbersandletters}`)
    },
    permissions: '',
    requiredRoles: [],
  }