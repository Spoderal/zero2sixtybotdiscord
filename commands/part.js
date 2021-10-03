const parts = require("../partsdb.json");
const Discord = require("discord.js");
module.exports = {
  commands: ["part"],
  description: "Shows the stats of the car specified!",
  permissionError: "",
  expectedArgs: "<car>",

  callback: (message, arguments, text) => {
    var list = parts.Parts
    var part = arguments[0];
    if(!part) return message.channel.send("Specify what part you want to see the stats of! Example: z!part MagnaFlowAxleBackPerformanceExhaust\n**NO SPACES AND MAKE SURE IT MATCHES THE EXACT NAME ON THE PARTS LIST, EXAMPLE: MagnaFlowAxleBackPerformanceExhaust**")
    if(!list[part]) return message.channel.send("That part isn't available yet, suggest it in the support server! In the meantime, check how to use the command by running z!part.")
      let embed = new Discord.MessageEmbed()
      .setTitle(`${parts.Parts[part].Name} Stats`)
      .setDescription(`Added Performance: +${parts.Parts[part].AddedSpeed}\nPrice: $${numberWithCommas(parts.Parts[part].Price)}`)
      .setImage(`${parts.Parts[part].Image}`)

      if(part == "Tier1DriftTires"){
        embed.setDescription(`Drift Score: +${parts.Parts[part].DriftScore}\nDecreased Performance: -${parts.Parts[part].DecreaseSpeed}\nPrice: $${numberWithCommas(parts.Parts[part].Price)}`)

      }
      message.reply(embed)

    
  },
  permissions: "",
  requiredRoles: [],
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}