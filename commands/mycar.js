const cars = require("../cardb.json");
const Discord = require("discord.js");
module.exports = {
  commands: ["mycar"],
  description: "Shows the stats of the car specified!",
  permissionError: "",
  expectedArgs: "<car>",

  callback: (message, arguments, text) => {
    const db = require("quick.db")
    var car =arguments.join(' ')
    if(!car) return message.reply("Specify a car!")
    var usercars = db.fetch(`cars_${message.author.id}`) 
    if(!cars.Cars[car]) return message.channel.send("Thats not a car!")
  
    let list = cars.Cars
    if(!list[car]) return message.channel.send("That isnt an available car to modify yet!")
    if(!usercars.includes(`${cars.Cars[car].Name}`)) return message.channel.send("You dont have that car!")
    let exhaust = db.fetch(`${car}exhaust_${message.author.id}`) || 'Stock'
    let tires = db.fetch(`${car}tires_${message.author.id}`) || 'Stock'
    let turbo = db.fetch(`${car}turbo_${message.author.id}`) || 'None'
    let intake = db.fetch(`${car}intake_${message.author.id}`) || 'None'
    let speed = db.fetch(`${car}speed_${message.author.id}`) || 0
    let engine = db.fetch(`${car}engine_${message.author.id}`) || cars.Cars[car].Engine
    var resale = db.fetch(`${car}resale_${message.author.id}`) || 'Not sellable'
    if(!resale || resale == null) {
      resale == 'Not sellable'
    }

    if(exhaust == null || exhaust == []){
      db.set(`${car}exhaust_${message.author.id}`, 'Stock') 
    }
    if(tires == null || tires == []){
      db.set(`${car}tires_${message.author.id}`, 'Stock') 
    }
    if(turbo == null || turbo == []){
      db.set(`${car}turbo_${message.author.id}`, 'None') 
    }
    if(intake == null || turbo == []){
      db.set(`${car}intake_${message.author.id}`, 'None') 
    }
   let embed = new Discord.MessageEmbed()
    .setTitle(`Your ${cars.Cars[car].Name}`)
    .addField(`Speed`, `${speed}`, true)
    .addField(`Engine`, `${engine}`, true)
    .addField(`Exhaust`, `${exhaust}`, true)
    .addField(`Tires`, `${tires}`, true)
    .addField(`Turbo`, `${turbo}`, true)
    .addField(`Intake`, `${intake}`, true)
 
    .addField(`Resale Value`, `${numberWithCommas(resale)}`, true)
    .setImage(`${cars.Cars[car].Image}`)

    message.channel.send(embed)
      
  
  },
  permissions: "",
  requiredRoles: [],
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}