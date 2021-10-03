const { MessageFlags } = require('discord.js')
const splice = require('splice')
const junk = require('./junk')

module.exports = {
    commands: ['sell'],
    description: 'Sell a car to the bot!',
    permissionError: '',
    
    callback: (message, arguments, text) => {
        let cars = require('../cardb.json')
        let db = require('quick.db')
        let usercars = db.fetch(`cars_${message.author.id}`)
        let selling = arguments.join(' ')
        if(!selling) return message.channel.send("Specify a part!")
    
        
        
        if(cars.Cars[selling]){
            if(!usercars.includes(cars.Cars[selling].Name)) return message.channel.send("You dont have that car!")
            if(!cars.Cars[selling].sellprice) return message.channel.send("That car is unsellable!")
            let resale = db.fetch(`${selling}resale_${message.author.id}`)
            const filtered = usercars.filter(e => e !== selling);
            db.set(`cars_${message.author.id}`, filtered)
            db.add(`cash_${message.author.id}`, resale)
            message.channel.send(`You sold your ${selling} for ${resale}!`)

        }
        
        else if(cars.JunkedParts[selling]){
            let resale2 = cars.JunkedParts[selling].sellprice
            let junkparts = db.fetch(`junkparts_${message.author.id}`)
            if(!junkparts.includes(cars.JunkedParts[selling].Name)) return message.channel.send("You dont have that part!")
            if(!cars.JunkedParts[selling].sellprice) return message.channel.send("That part is unsellable!")
            let resale = db.fetch(`${selling}resale_${message.author.id}`)
            const filtered = junkparts.filter(e => e !== selling);
            db.set(`junkparts_${message.author.id}`, filtered)
            db.add(`cash_${message.author.id}`, resale2)
            message.channel.send(`You sold your ${selling} for ${resale2}!`)

        }

     


      

        
    },
    permissions: '',
    requiredRoles: [],
  }
  
  