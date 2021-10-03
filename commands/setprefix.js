const db = require("quick.db")

module.exports = {
    commands: ['setprefix'],
    callback: (message, arguments, text) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need administrator to access this command.")
        let prefix = db.get(`prefix_${message.guild.id}`)
        let newprefix = arguments[0]

        if(!newprefix) return message.channel.send("Specify a prefix!")

        message.channel.send(`Prefix set to ${newprefix}`)

        db.set(`prefix_${message.guild.id}`, newprefix)
     
    },
    permissions: '',
    requiredRoles: [],
  }