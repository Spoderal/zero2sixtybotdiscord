const cars = require("../cardb.json");
const Discord = require("discord.js");
const parts = require("../partsdb.json");
module.exports = {
  commands: ["mycar"],
  description: "Shows the stats of the car specified!",
  permissionError: "",
  expectedArgs: "<car>",

  callback: (message, arguments, text) => {
    const db = require("quick.db")
    var car =arguments.join(' ').toLowerCase()
    if(!car) return message.reply("Specify a car!")
    var usercars = db.fetch(`cars_${message.author.id}`) 
    if(!cars.Cars[car]) return message.channel.send("Thats not a car!")
    let list = cars.Cars
    if(!list[car]) return message.channel.send("That isnt an available car to modify yet!")
    if(!usercars.includes(`${car}`)) return message.channel.send("You dont have that car!")
    let exhaust = db.fetch(`${cars.Cars[car].Name}exhaust_${message.author.id}`) || 'Stock Exhaust'
    let tires = db.fetch(`${cars.Cars[car].Name}tires_${message.author.id}`) || 'Stock Tires'
    let turbo = db.fetch(`${cars.Cars[car].Name}turbo_${message.author.id}`) || 'No Turbo'
    let intake = db.fetch(`${cars.Cars[car].Name}intake_${message.author.id}`) || 'No Intake'
    let suspension = db.fetch(`${cars.Cars[car].Name}suspension_${message.author.id}`) || 'Stock Suspension'
    let driftscore = db.fetch(`${cars.Cars[car].Name}drift_${message.author.id}`) || 0
    let speed = db.fetch(`${cars.Cars[car].Name}speed_${message.author.id}`) || 0
    let spoiler = db.fetch(`${cars.Cars[car].Name}spoiler_${message.author.id}`) 
    let restoration = db.fetch(`${cars.Cars[car].Name}restoration_${message.author.id}`)
    let weight = db.fetch(`${cars.Cars[car].Name}weight_${message.author.id}`) || 'No Kit'

    let engine = db.fetch(`${cars.Cars[car].Name}engine_${message.author.id}`) || cars.Cars[car].Engine
    let bodykit = db.fetch(`${cars.Cars[car].Name}bodykit_${message.author.id}`)
    let kmh = speed * 1.609344
    var flooredkmh = Math.floor(kmh)
    let licensePlate = db.fetch(`${cars.Cars[car].Name}license_plate_${message.author.id}`) || '000000'
    var resale = db.fetch(`${cars.Cars[car].Name}resale_${message.author.id}`) || 'Not sellable'
 
    let speedemote = "<:speeddefault:932423319020531753>"
    let caremote = cars.Cars[car].Emote || "<:z_none:898352936785178645>"
    let enginesobj = parts.Parts[engine]
    let exhaustsobj = parts.Parts[exhaust.toLowerCase()]
    let tiresobj = parts.Parts[tires.toLowerCase()]
    let turboobj = parts.Parts[turbo.toLowerCase()]
    let intakeobj = parts.Parts[intake.toLowerCase()]
    let suspensionobj = parts.Parts[suspension.toLowerCase()]

    let engineemote = "<:enginedefault:932419391587483688>"
    let exhaustemote = exhaustsobj.Emote
    let intakeemote = intakeobj.Emote
    let tiresemote = tiresobj.Emote
    let turboemote = turboobj.Emote
    let suspensionemote = suspensionobj.Emote
    let spoileremote

  

   

    let carimage = db.fetch(`${cars.Cars[car].Name}livery_${message.author.id}`) || cars.Cars[car].Image
    
   let embed = new Discord.MessageEmbed()
   .setFooter(`License Plate: ${licensePlate}`)
    .setTitle(`${caremote} ${cars.Cars[car].Name}`)
    .addField(`${speedemote} Speed`, `${speed} MPH/${flooredkmh} KMH`, true)
    .addField(`${engineemote} Engine`, `${engine}`, true)
    .addField(`${exhaustemote} Exhaust`, `${exhaust}`, true)
    .addField(`${tiresemote} Tires`, `${tires}`, true)
    .addField(`${turboemote} Turbo`, `${turbo}`, true)
    .addField(`${intakeemote} Intake`, `${intake}`, true)
    .addField(`${suspensionemote} Suspension`, `${suspension}`, true)
    .addField(`Weight`, `${weight}`, true)
    .setColor("#60b0f4")
    .addField(`Resale Value`, `${numberWithCommas(resale)}`, true)
    .setImage(`${carimage}`)
    if(driftscore > 0){
      embed.addField(`Drift Score`, `${driftscore}`, true)
    }
    if(bodykit){
      embed.setImage(`${cars.Cars[car].Bodykit}`)
      
      if(cars.Cars[car].BodykitRear){
        
        embed.setThumbnail(`${cars.Cars[car].BodykitRear}`)
      }
    }

    if(restoration != null){
      embed.addField("Restoration %", `${restoration}`, true)

    }

    if(spoiler){
      let aero = db.fetch(`${cars.Cars[car].Name}aero_${message.author.id}`) 
      embed.addField(`${spoileremote} Spoiler`, `${spoiler}`, true)
      embed.addField(`${spoileremote} Aero`, `${aero}`, true)
      .addField("\u200b", "\u200b", true)

    }

    message.channel.send({embeds: [embed]})
      
  
  },
  permissions: "",
  requiredRoles: [],
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}