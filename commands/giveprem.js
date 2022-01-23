const db = require('quick.db')
const Discord = require('discord.js')
const cars = require('../cardb.json')
module.exports = {
    commands: ['givetier'],
    callback: (message, arguments, text, client) => {
        if(message.author.id !== "890390158241853470" && message.author.id !== "474183542797107231" && message.author.id !== "152079857793105920"){

            message.channel.send("You dont have permission to use this command!")
            return;
        }

          else{
       let user = message.mentions.users.first()
       if(!user) return message.channel.send("Specify a user!")
       let tier = arguments[1]
       let tierlist = ['1', '2', '3']

       if(!tierlist.includes(tier)) return message.channel.send("Thats not a tier!")

      db.set(`patreon_tier_${tier}_${user.id}`, true)
      

       message.channel.send(`Gave ${user} tier ${tier} on the patreon.`)


          }
      },
    permissions: '',
    requiredRoles: [],
  }
