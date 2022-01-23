const db = require('quick.db')
const discord = require('discord.js')

module.exports = {
    commands: ['give'],
    callback: (message, arguments, text) => {
        if(message.author.id !== "275419902381260802"){

            message.channel.send("You dont have permission to use this command!")
            return;
        }
          else{
        let togive = arguments[0]
        let givingto = message.mentions.users.first()

        
        if(!togive) return
        if(!givingto) return
        if(togive.toLowerCase() == "premium") 
        {

            let premium = db.fetch(`premium_${givingto.id}`)
    
            if(premium == true) return message.channel.send("This user already has premium!")
            db.set(`premium_${givingto.id}`, true)
            db.push(`pfps_${givingto.id}`, "Fast Helmet")
            db.add(`cash_${message.author.id}`, 50000)
    
    
            let embed = new discord.MessageEmbed()
            .setTitle("Thank you for your purchase!")
            .setThumbnail('https://i.ibb.co/9WTq2Sn/Logo-Makr-8-YKJ71.png')
            .addField("Your new perks", `- 2x Notoriety
    
            - 2x Cash in bot races
            
            - Special Premium Profile Picture
            
            - Increased daily reward
            
            - Free daily premium crate
            
            - Discount on new cars
            
            - Supporting the bots development
            
            You also received 50k cash!`)
            .setColor("#60b0f4")
            message.channel.send({embeds: [embed]})
              }
    
         
        }
    },
    permissions: '',
    requiredRoles: [],
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  