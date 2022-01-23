const cars = require("../cardb.json");
const Discord = require("discord.js");
module.exports = {
  commands: ["stats"],
  description: "Shows the stats of the car specified!",
  permissionError: "",
  expectedArgs: "<car>",

  callback: (message, arguments, text) => {
    var list = cars.Cars
    var car = arguments.join(' ').toLowerCase();
    if(!car) return message.channel.send("Specify what car you want to see the stats of! Example: z!stats 1995 Mazda Miata")
    if(!list[car]) return message.channel.send("That car isn't available yet, suggest it in the support server! In the meantime, check how to use the command by running z!stats.")
    let kmh = cars.Cars[car].Speed * 1.609344
    var flooredkmh = Math.floor(kmh)
      let embed = new Discord.MessageEmbed()
     .setTitle(`${cars.Cars[car].Emote} ${cars.Cars[car].Name} Stats`)
      .addField(`Top Speed`, `${cars.Cars[car].Speed} MPH\n${flooredkmh} KMH`)
      .addField(`Engine`, `${cars.Cars[car].Engine}`)
      .addField(`Sell Price`, `$${numberWithCommas(cars.Cars[car].sellprice)}`)
      .addField(`Price`, `$${numberWithCommas(cars.Cars[car].Price)}`)
      .setImage(cars.Cars[car].Image)
      .setColor("#60b0f4")
      
      if(cars.Cars[car].Rear){
        embed.setThumbnail(cars.Cars[car].Rear)
      }
       
      if(cars.Cars[car].Junked){
        embed.setDescription("**JUNKED**")
      }
      if(cars.Cars[car].Rally){
        embed.setDescription("**RALLY CAPABLE**")
      }
      if(cars.Cars[car].Squad){
        embed.setDescription("**SQUAD CAR**")
      }
      if(cars.Cars[car].Winter){
        embed.setDescription("**SNOW BOOST**")
      }

      message.reply({embeds: [embed]})

    
  },
  permissions: "",
  requiredRoles: [],
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}