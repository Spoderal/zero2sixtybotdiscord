const db = require("quick.db")
module.exports = {
    commands: ['start'],
    callback: (message, arguments, text) => {
        let userid = message.author.id
        let cash = db.fetch(`cash_${userid}`)
        if(cash) return message.reply("You have an account!")
        message.channel.send(`To start you'll need to look at the dealer (run the dealership command) and pick a first car, take this $500 and go buy something nice.`)
        db.set(`created_${userid}`, true)
        db.set(`cash_${userid}`, 500)
        db.set(`cars_${userid}`, [])
        db.set(`parts_${userid}`, [])
        db.set(`badges_${user.id}`, [])
    },
    permissions: '',
    requiredRoles: [],
  }