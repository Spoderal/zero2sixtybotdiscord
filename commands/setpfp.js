const db = require('quick.db')
const Discord = require('discord.js')
const pfpdb = require('../pfpsdb.json')
module.exports = {
    commands: ['setpfp'],
    callback: (message, arguments, text) => {
        let userpfps = db.fetch(`pfps_${message.author.id}`)

        let pfp = arguments.join(' ')
        let pfplist = pfpdb
        if(!pfplist.Pfps[pfp.toLowerCase()]) return message.channel.send("Thats not a profile picture.")
        if(!userpfps) return message.channel.send("You dont have any profile pictures.")
        if(!userpfps.includes(pfp.toLowerCase())) return message.channel.send("You dont own that profile picture.")

        db.set(`currentpfp_${message.author.id}`, pfp.toLowerCase())

        message.channel.send(`Set your profile picture to "${pfp}"`)

    },
    permissions: '',
    requiredRoles: [],
  }