const db = require('quick.db')
const lodash = require('lodash')
module.exports = {
    commands: ['unbox'],
    callback: (message, arguments, text) => {
        let db = require('quick.db')
        let pfps = require('../pfpsdb.json')
        let crates = require('../cratedb.json')
        let colors = require("../colordb.json")
        let cars = require('../cardb.json')
        let list = ['Common Import', 'Rare Import']

        let bought = arguments.join(' ')
        let cash = db.fetch(`cash_${message.author.id}`)

        if(!bought) return message.channel.send("**To use this command, specify the crate you want to buy. To check what crates are available check the crates shop by sending z!crates.**")
        if(!crates.Crates[bought]) return message.channel.send("**That crate isn't available yet, suggest it in the support server! In the meantime, check how to use the command by running z!open.**")
      

       
          
            if (cash < crates.Crates[bought].Price) return message.channel.send(`You dont have enough cash! This crate costs ${crates.Crates[bought].Price}`)
            let cratecontents = crates.Crates[bought].Contents
            let randomitem = lodash.sample(cratecontents)
            db.subtract(`cash_${message.author.id}`, crates.Crates[bought].Price);
        
            db.push(`cars_${message.author.id}`, randomitem)
            db.set(`${randomitem}speed_${message.author.id}`, cars.Cars[randomitem].Speed)
            db.set(`${randomitem}resale_${message.author.id}`, cars.Cars[randomitem].sellprice)

            message.channel.send(`You opened a ${bought} and got a ${randomitem}!`);
        
        
    },
    permissions: '',
    requiredRoles: [],
  }