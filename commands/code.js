const db = require('quick.db')
const Discord = require('discord.js')
const cars = require('../cardb.json')
const codes = require('../codes.json')
module.exports = {
    commands: ['code'],
    callback: (message, arguments, text, client) => {
        let code = arguments[0]
        
        if(!code) return message.channel.send("Specify a code to redeem! You can find codes in the Discord server, or on the Twitter page!")
        
        if(codes.Discord[code]){
            let redeemed = db.fetch(`redeemed_${code}_${message.author.id}`)
            if(redeemed) return message.channel.send("You've already redeemed this code!")
            if(codes.Discord[code].Gold){
                message.channel.send(`Redeemed code ${code} and earned ${numberWithCommas(codes.Discord[code].Reward)} gold`)
                db.add(`gold_${message.author.id}`, codes.Discord[code].Reward)

            }
            else {
                message.channel.send(`Redeemed code ${code} and earned $${numberWithCommas(codes.Discord[code].Reward)}`)
                db.add(`cash_${message.author.id}`, codes.Discord[code].Reward)
            }
            db.set(`redeemed_${code}_${message.author.id}`, true)
        }
        else if(codes.Twitter[code]){
            let redeemed = db.fetch(`redeemed_${code}_${message.author.id}`)
            if(redeemed) return message.channel.send("You've already redeemed this code!")
            if(codes.Twitter[code].Gold){
                message.channel.send(`Redeemed code ${code} and earned ${numberWithCommas(codes.Twitter[code].Reward)} gold`)
                db.add(`gold_${message.author.id}`, codes.Twitter[code].Reward)

            }
            else {
                message.channel.send(`Redeemed code ${code} and earned $${numberWithCommas(codes.Twitter[code].Reward)}`)
                db.add(`cash_${message.author.id}`, codes.Twitter[code].Reward)
            }
            db.set(`redeemed_${code}_${message.author.id}`, true)
        }
        else {
            message.channel.send("Thats not a valid code!")
        }
    },
    permissions: '',
    requiredRoles: [],
  }


  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
