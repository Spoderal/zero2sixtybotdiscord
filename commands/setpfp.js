const db = require('quick.db')
const Discord = require('discord.js')
module.exports = {
    commands: ['setpfp'],
    callback: (message, arguments, text) => {
        let userpfps = db.fetch(`pfps_${message.author.id}`)

        let pfp = arguments.join(' ')
        let pfplist = ['Rainbow Helmet', 'Red Helmet', 'Blue Helmet', 'Green Helmet', 'Purple Helmet', 'Flame Helmet', 'Pinky Helmet', 'Turqoise Helmet', 'Tangerine', 'Flower Power', 'Blank', 'Reverse Blank', 'Cash Money']
        if(!pfplist.includes(pfp)) return message.channel.send("Thats not a profile picture.")
        if(!userpfps) return message.channel.send("You dont have any profile pictures.")
        if(!userpfps.includes(pfp)) return message.channel.send("You dont own that profile picture.")

        db.set(`currentpfp_${message.author.id}`, pfp)

        message.channel.send(`Set your profile picture to "${pfp}"`)

    },
    permissions: '',
    requiredRoles: [],
  }