const discord = require('discord.js')
const client = new discord.Client()
const db = require('quick.db')
module.exports = {
    commands: ['paint'],
    callback: (message, arguments, text) => {
    let cars = require('../cardb.json')
    let car = arguments.join(' ')

    if(!cars.Cars[car]) return message.channel.send("Thats not a car!")
    let colors = ['Red', 'Blue', 'Black']
    
    
      
    },
    permissions: '',
    requiredRoles: [],
  }