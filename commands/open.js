const db = require('quick.db')
const lodash = require('lodash')
module.exports = {
    commands: ['open', 'opencrate'],
    callback: (message, arguments, text) => {
        let db = require('quick.db')
        let pfps = require('../pfpsdb.json')
        let crates = require('../cratedb.json')
        let colors = require("../colordb.json")
       
        let list = ['Common', 'Rare', 'Seasonal']

        let bought = arguments[0]
        let cash = db.fetch(`cash_${message.author.id}`)

        if(!bought) return message.channel.send("**To use this command, specify the crate you want to buy. To check what crates are available check the crates shop by sending z!crates.**")
        if(!crates.Crates[bought]) return message.channel.send("**That crate isn't available yet, suggest it in the support server! In the meantime, check how to use the command by running z!open.**")
      

       
          
            if (cash < crates.Crates[bought].Price) return message.channel.send(`You dont have enough cash! This crate costs ${crates.Crates[bought].Price}`)
            let cratecontents = crates.Crates[bought].Contents
            let randomitem = lodash.sample(cratecontents)
            db.subtract(`cash_${message.author.id}`, crates.Crates[bought].Price);
        
            if(randomitem == "The Stig" || randomitem == "Decent Racer" || randomitem == "Fast and also Furious" || randomitem == "Pro Racer" || randomitem == "Powerful Racer" || randomitem == "Pretty Racer" || randomitem == "Based Racer" || randomitem == "Trololololol" || randomitem == "Horse Racer" || randomitem == "Troll Racer" || randomitem == "FeelsRacerMan" || randomitem == "Cheesy Racer" || randomitem == "Dank Racer" || randomitem == "Rich Racer") {
                message.channel.send(`You opened a ${bought} and won a "${randomitem}" profile title!`);
            }
           else {
            db.push(`pfps_${message.author.id}`, randomitem)
            message.channel.send(`You opened a ${bought} and won a ${randomitem} profile image! Preview:${pfps.Pfps[randomitem].Image}`);

           }
           
        
        
    },
    permissions: '',
    requiredRoles: [],
  }