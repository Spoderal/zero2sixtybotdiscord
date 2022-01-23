const { MessageFlags } = require('discord.js')
const splice = require('splice')

module.exports = {
    commands: ['select'],
    description: 'Sell a car to the bot!',
    permissionError: '',
    
    callback: (message, arguments, text) => {
        let cars = require('../cardb.json')
        
        let db = require('quick.db')
        let usercars = db.fetch(`cars_${message.author.id}`)
        if(!usercars) return message.channel.send("You don't own any cars!")
        let selecting = arguments.splice(0).join(' ')
        if(!selecting) return message.channel.send("Specify a car!")
     
        
        
        
        if(!cars.Cars[selecting.toLowerCase()]) return message.channel.send("Thats not a car!")

        if(!usercars.includes(selecting.toLowerCase())) return message.channel.send("You don't own that car!")


        db.set(`selected_${message.author.id}`, selecting.toLowerCase())

       message.channel.send(`You selected your ${cars.Cars[selecting.toLowerCase()].Name}`)

        
    },
    permissions: '',
    requiredRoles: [],
  }
  
  