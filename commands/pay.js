const db = require('quick.db')
const discord = require('discord.js')
const cars = require('../cardb.json')
module.exports = {
    commands: ['pay'],
    callback: (message, arguments, text) => {
        if(message.author.id !== "275419902381260802" && message.author.id !== "890390158241853470"){

            message.channel.send("You dont have permission to use this command!")
            return;
        }
          else{
        let togive = arguments[1]
        let givingto = arguments[0]

        
        if(!togive) return
        if(!givingto) return
      

        db.add(`cash_${givingto}`, togive)

        message.channel.send(`Gave <@${givingto}> $${numberWithCommas(togive)}`)

         
        }
    },
    permissions: '',
    requiredRoles: [],
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  