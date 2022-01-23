const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    commands: ['disable'],
    callback: (message, arguments, text, client) => {
        
        let commandslist = ['balance', 'bodykits', 'botrace', 'buy', 'claim', 'crates', 'createcrew', 'crew', 'crewicon', 'crewleader', 'crewrank', 'customlicense',
        'dailycash', 'dailycrate', 'dealership', 'deletecrew', 'driftrace', 'driftrace', 'garage', 'give', 'imports', 'joincrew', 'junk', 'junkyard', 'leaderboard', 'leavecrew', 'mycar', 'open',
        'paint', 'part', 'parts', 'ping', 'premium', 'profile', 'prostuff', 'race', 'remove', 'sell', 'setpfp', 'settitle', 'start', 'stats', 'tradein', 'unbox', 'upgrade']

        let commandtodisable = arguments[0]
        let alreadydis = db.fetch(`${commandtodisable.toLowerCase()}_disabled_${message.guild.id}`, true)

        if(!commandslist.includes(commandtodisable.toLowerCase())) return message.channel.send("Thats not a command!")
        if(alreadydis) return message.channel.send("That command is already disabled! If you'd like to enable it, run the enable command.")
        message.channel.send(`Disabled ${commandtodisable.toLowerCase()}`)

        db.set(`${commandtodisable.toLowerCase()}_disabled_${message.guild.id}`, true)
    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}