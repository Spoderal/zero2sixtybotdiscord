const db = require('quick.db')
const Discord = require('discord.js')
module.exports = {
    commands: ['settitle'],
    callback: (message, arguments, text) => {
        let userpfps = db.fetch(`titles_${message.author.id}`)

        let pfp = arguments.join(' ')
        let pfplist = ['The Stig', 'Pro Racer', 'Decent Racer', 'Fast and also Furious', 'Cool Racer', 'Pretty Racer', 'Trololololol', 'Based Racer', 'Horse Racer', 'Powerful Racer']
        if(!pfplist.includes(pfp)) return message.channel.send("Thats not a profile title.")
        if(!userpfps) return message.channel.send("You dont have any profile titles.")
        if(!userpfps.includes(pfp)) return message.channel.send("You dont own that profile title.")

        db.set(`currenttitle_${message.author.id}`, pfp)

        message.channel.send(`Set your profile title to "${pfp}"`)

    },
    permissions: '',
    requiredRoles: [],
  }