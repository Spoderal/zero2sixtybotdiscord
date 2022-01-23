const db = require('quick.db')
const lodash = require('lodash')
const { MessageEmbed } = require('discord.js')
module.exports = {
    commands: ['open', 'opencrate'],
    callback: (message, arguments, text) => {
        let db = require('quick.db')
        let pfps = require('../pfpsdb.json')
        let crates = require('../cratedb.json')
        let colors = require("../colordb.json")
       
        let list = ['common', 'rare', 'seasonal']
        
        let bought = arguments[0]
        let cash = db.fetch(`cash_${message.author.id}`)
        let titlelist = ["the stig", "decent racer", "fast and also furious", "pro racer" , "powerful racer", "pretty racer" , "based racer" , "trololololol", "horse racer" , "troll racer" , "feelsracerman", "cheesy racer","dank racer", "rich racer"]
        if(!bought) return message.channel.send("**To use this command, specify the crate you want to buy. To check what crates are available check the crates shop by sending z!crates.**")
        if(!crates.Crates[bought.toLowerCase()]) return message.channel.send("**That crate isn't available yet, suggest it in the support server! In the meantime, check how to use the command by running z!open.**")
        if(!crates.Crates[bought.toLowerCase()].Price) return message.channel.send("Thats not a purchasable crate!")
      

       
        if (cash < crates.Crates[bought.toLowerCase()].Price) return message.channel.send(`You dont have enough cash! This crate costs ${crates.Crates[bought.toLowerCase()].Price}`)
        let cratecontents = crates.Crates[bought.toLowerCase()].Contents
        let randomitem = lodash.sample(cratecontents)
        db.subtract(`cash_${message.author.id}`, crates.Crates[bought.toLowerCase()].Price);
        let embed = new MessageEmbed()
        
            if(pfps.Pfps.Titles[randomitem]) {
                message.channel.send(`You opened a ${bought} and won a "${randomitem}" profile title!`);
                db.push(`titles_${message.author.id}`, randomitem)
            }
           else if(pfps.Pfps[randomitem]) {
            db.push(`pfps_${message.author.id}`, randomitem)
           
            embed.setTitle("Preview")
            embed.setImage(pfps.Pfps[randomitem].Image)
            message.channel.send({content:`You opened a ${bought} and won a ${randomitem} profile image!`, embeds: [embed]});

           }
           
        
        
    },
    permissions: '',
    requiredRoles: [],
  }