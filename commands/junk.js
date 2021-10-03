const cars = require("../cardb.json");
const Discord = require("discord.js");
module.exports = {
  commands: ["junk"],
  description: "Shows the stats of the car specified!",
  permissionError: "",
  expectedArgs: "<car>",

  callback: (message, arguments, text) => {
    const db = require("quick.db")
    var car =arguments.join(' ')
    if(!car) return message.reply("Specify a car!")
    var usercars = db.fetch(`cars_${message.author.id}`) 
    let list = ['Junked 1971 Datsun 240Z', 'Junked 1968 Chevy Camaro SS']
    if(!list.includes(car)) return message.channel.send("That isnt junk!")
    if(!usercars.includes(`${cars.Cars.JunkedCars[car].Name}`)) return message.channel.send("You dont have that car!")
    let speed = db.fetch(`${car}speed_${message.author.id}`) || 'None'
    let partsneeded = db.fetch(`${car}partsneeded_${message.author.id}`) || ['None']
    let partsadded = db.fetch(`${car}partsadded_${message.author.id}`) || ['None']
    let  resale = db.fetch(`${car}resale_${message.author.id}`) || 'None'
    if(partsneeded.length == 0) return message.channel.send("You can restore this car! Type z!restore Finish")
  
    
    if(!resale || resale == null) {
      db.set(`${car}resale_${message.author.id}`,cars.Cars.JunkedCars[car].sellprice )
    }
    if(!partsneeded || partsneeded == null || partsneeded == [] || partsneeded == [""]) return message.reply("No parts needed, restore with z!restore Finish (car)")
  
    if(!partsadded || partsadded == null || partsadded == [''] || partsadded.length == 0)  {
        partsadded = ['None']
    }


  
   let embed = new Discord.MessageEmbed()
    .setTitle(`Your ${cars.Cars.JunkedCars[car].Name}`)
    .addField(`Speed`, `${speed}`, true)
   
   

    .addField(`Resale Value`, `${resale}`)
    .addField(`Parts needed`, `${partsneeded.join(' \n')}`, true)
    .addField(`Parts restored`, `${partsadded.join('\n')}`, true)
  

    message.channel.send(embed)
      
  
  },
  permissions: "",
  requiredRoles: [],
};
