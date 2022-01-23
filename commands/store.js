const cars = require("../cardb.json");
const Discord = require("discord.js");
module.exports = {
  commands: ["store"],
  description: "Shows the stats of the car specified!",
  permissionError: "",
  expectedArgs: "<car>",

  callback: (message, arguments, text) => {
      let embed = new Discord.MessageEmbed()
      .setTitle("Zero2Sixty Store")
      .setDescription("Join the [support server](https://discord.com/api/oauth2/authorize?client_id=844417164186091531&permissions=0&scope=bot) to buy cash")
     .addField("Cash", "$1 = $1,000 each\n\nSo if you pay $5, you get $5,000")
     .setColor("#60b0f4")
    .setThumbnail("https://i.ibb.co/gR16xtK/Logo-Makr-5m5t-Ra.png")

     message.channel.send({embeds: [embed]})
  },
  permissions: "",
  requiredRoles: [],
};
