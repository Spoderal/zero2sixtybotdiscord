const Discord = require('discord.js')
const db = require('quick.db')
const { Client, Intents, MessageEmbed } = require('discord.js');
const cardb = require('../cardb.json')
const partdb = require('../partsdb.json')
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
        let partemote = "<:partsico:932205558956711936>"
        let carsemote = "<:carsico:932206014240006194>"
        let junkemote = "<:z_junk_parts:898432495450734632>"
        let enginesemote = "<:z_engine_parts:898432495127773235>"
        let created = db.fetch(`created_${targetId}`)
        if(!created) return message.channel.send("You or this user haven't started yet!")
        let cars = db.fetch(`cars_${targetId}`) || ['No Cars']
        if(cars == null) return message.channel.reply("You dont own any cars!")
        let engines = db.fetch(`engines_${message.author.id}`) || ['No Engines']
        let parts = db.fetch(`parts_${targetId}`) || ['no parts']
        let cash = db.fetch(`cash_${targetId}`) || 0
        if(parts == null) {parts = ["None"]}
        if(cars.length === 0 || cars == null)  {cars = ['No Cars']}
        if(parts.length == 0 || parts == null)  {parts = ['no parts']}
        if(engines.length === 0 || engines == null)  {engines = ['None']}
        var usercars = []
        var actcar
        var cararrayLength = cars.length;
        var userparts = []
        var actpart
        var partarraylength = parts.length;
        var speeds = []
        let highestspeed
        let filteredcar
for (var i = 0; i < cararrayLength; i++ && cars !== ['No Cars']) {
    actcar = cars[i]
    usercars.push(`${cardb.Cars[actcar.toLowerCase()].Emote} ${cardb.Cars[actcar.toLowerCase()].Name}`)
    let userspeed = db.fetch(`${cardb.Cars[actcar.toLowerCase()].Name}speed_${message.author.id}`)
    let speed = parseInt(userspeed)
    let carobject = {
        name: cardb.Cars[actcar.toLowerCase()].Name,
        speed
    }
    
    speeds.push(carobject)
    
    
    //Do something
}

for (var i = 0; i < partarraylength; i++ && parts !== ['no parts']) {
    
    if(!parts || parts.length == 0) {
        actpart = "no parts"
    }
    actpart = parts[i]
    userparts.push(`${partdb.Parts[actpart.toLowerCase()].Emote} ${partdb.Parts[actpart.toLowerCase()].Name}`)
    //Do something
}

for(var i = 0; i < speeds.length; i++){
    console.log(speeds[i].speed)
    let newspeeds = []
    newspeeds.push(speeds[i].speed)
    highestspeed = Math.max.apply(Math, newspeeds)
    filteredcar = speeds.filter(e => e.speed == highestspeed);
}
 
        if(engines == null || engines.length == 0 || engines == [''])  {
            engines == ["None"]
        }

        
    
    
        let embed1 = new MessageEmbed()
        .setTitle(`${target.username}'s cars`)
        .addField(`${carsemote} Cars`, `${usercars.join(' \n\n ')}`, true)
        .addField(`${partemote} Parts`, `${userparts.join(' \n\n ')}`, true)
        .addField(`Best Car (Speed)`, `${filteredcar[0].name}`)
        .setThumbnail('https://i.ibb.co/DCNwJrs/Logo-Makr-0i1c-Uy.png') 
       
        .addField("​", "​")
      
        .setFooter('$' + numberWithCommas(cash))
        .setColor(`#60b0f4`)
        
        message.channel.send({embeds: [embed1]})
    

    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  

function convert(val) {
  
    // thousands, millions, billions etc..
    var s = ["", "k", "m", "b", "t"];
  
    // dividing the value by 3.
    var sNum = Math.floor(("" + val).length / 3);
  
    // calculating the precised value.
    var sVal = parseFloat((
      sNum != 0 ? (val / Math.pow(1000, sNum)) : val).toPrecision(2));
    
    if (sVal % 1 != 0) {
        sVal = sVal.toFixed(1);
    }
  
    // appending the letter to precised val.
    return sVal + s[sNum];
  }