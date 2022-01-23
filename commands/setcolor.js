const db = require('quick.db')
const Discord = require('discord.js')
module.exports = {
    commands: ['setcolor'],
    callback: (message, arguments, text) => {
        let userbg = db.fetch(`profilepagebg_${message.author.id}`)

        let color = arguments.join(' ')
        let colorlist = ['red', 'blue', 'green', 'white', 'dark', 'pink', 'orange', 'snow', 'road', 'police']
        if(!colorlist.includes(color)) return message.channel.send("Thats not a profile color. Available: Red, Blue, Green, White, Dark, Orange, Pink, Snow (EXCLUSIVE FROM SEASON)")
        if(color.toLowerCase() == 'red'){
            db.set(`profilepagebg_${message.author.id}`, "./profilepage_red.png")
        }
        else if(color.toLowerCase() == 'blue'){
            db.set(`profilepagebg_${message.author.id}`, "./profilepage.png")
        }
        else if(color.toLowerCase() == 'green'){
            db.set(`profilepagebg_${message.author.id}`, "./profilepage_green.png")
        }
        else if(color.toLowerCase() == 'white'){
            db.set(`profilepagebg_${message.author.id}`, "./profilepage_white.png")
        }
        else if(color.toLowerCase() == 'dark'){
            db.set(`profilepagebg_${message.author.id}`, "./profilepage_dark.png")
        }
        else if(color.toLowerCase() == 'orange'){
            db.set(`profilepagebg_${message.author.id}`, "./profilepage_orange.png")
        }
        else if(color.toLowerCase() == 'pink'){
            db.set(`profilepagebg_${message.author.id}`, "./profilepage_pink.png")
        }
        else if(color.toLowerCase() == 'snow'){
            db.set(`profilepagebg_${message.author.id}`, "./profilepage_snow.png")
        }
        else if(color.toLowerCase() == 'road'){
            db.set(`profilepagebg_${message.author.id}`, "./profilepage_road.png")
        }
        else if(color.toLowerCase() == 'police'){
            db.set(`profilepagebg_${message.author.id}`, "./profilepage_police.png")
        }
        message.channel.send(`Set your profile background color to "${color}"`)

    },
    permissions: '',
    requiredRoles: [],
  }