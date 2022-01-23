const {MessageActionRow, MessageButton, MessageEmbed, MessageCollector, MessageSelectMenu} = require('discord.js')
const db = require('quick.db')
module.exports = {
    commands: ['dm'],
    callback: async (message, arguments, text, client) => {

       client.users.fetch("286224826170081290").then(user => {
           user.send("890390158241853470")

       })


      
    },
    permissions: '',
    requiredRoles: [],
  }