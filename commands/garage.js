const Discord = require('discord.js')
const db = require('quick.db')
const junk = require('./junk')
const { Client, Intents, MessageEmbed } = require('discord.js');

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_MESSAGES)
myIntents.add(Intents.FLAGS.GUILDS)

module.exports = {
    commands: ['garage', 'cars'],
    description: 'Shows your cars!',
    permissionError: '',
    
    callback: (message, arguments, text) => {
        const target = message.mentions.users.first() || message.author
        let targetId = target.id

        let cars = db.fetch(`cars_${targetId}`) || ['No Cars']
        if(cars == null) return message.channel.reply("You dont own any cars!")
        let junkedparts = db.fetch(`junkparts_${targetId}`)|| ['None']
        let engines = db.fetch(`engines_${message.author.id}`) || ['No Engines']
        let parts = db.fetch(`parts_${targetId}`) || ['No Parts']
        let cash = db.fetch(`cash_${targetId}`) || 0
        if(parts == null) {parts = ["None"]}
   
        if(cars.length === 0 || cars == null)  {cars = ['No Cars']}
        if(parts.length === 0 || parts == null)  {parts = ['No Parts']}
        if(junkedparts.length === 0 || junkedparts == null)  {junkedparts = ['None']}
        if(engines.length === 0 || engines == null)  {engines = ['None']}

     
    
        if(junkedparts.length == 0 || junkedparts == null || junkedparts == [''])  {
            junkedparts == ["None"]
        }

        if(engines == null || engines.length == 0 || engines == [''])  {
            engines == ["None"]
        }


    
    
        let embed1 = new MessageEmbed()
        .setTitle(`${target.username}'s cars`)
        .addField("🔑 Cars", `${cars.join(' \n ')}`, true)
        .addField("🔧 Parts", `${parts.join(' \n ')}`, true)
        .setThumbnail('https://i.ibb.co/TckxhcR/garage.png') 
       
        .addField("​", "​")
      
        .addField("⚒ Junk Parts", `${junkedparts.join(` \n`)}`, true)
        .setFooter('$' + numberWithCommas(cash), 'https://i.ibb.co/nmrZVxb/Logo-Makr-3qgsut.png')
        .addField("🗝 Engines", `${engines.join(` \n`)}`, true)
        
        
        message.channel.send(embed1)
    

    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  