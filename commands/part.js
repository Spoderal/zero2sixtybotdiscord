const parts = require("../partsdb.json");
const Discord = require("discord.js");
module.exports = {
  commands: ["part"],
  description: "Shows the stats of the car specified!",
  permissionError: "",
  expectedArgs: "<car>",

  callback: (message, arguments, text) => {
    var list = parts.Parts
    var part = arguments[0]
    if(!part) return message.channel.send("Specify what part you want to see the stats of! Example: z!part T1Exhaust")
    if(!list[part.toLowerCase()]) return message.channel.send("That part isn't available yet, suggest it in the support server! In the meantime, check how to use the command by running z!part.")
    let sellprice = parts.Parts[part.toLowerCase()].sellprice || 'N/A'
    var emote = parts.Parts[part.toLowerCase()].Emote
    var tier = parts.Parts[part.toLowerCase()].Tier || "N/A"
    let color
    if(tier == "1"){
      color ="#ff676a"
    }
    else if(tier == "2"){
      color = "#00ff8e"
    }
    else if(tier == "3"){
      color = "#d25cfe"
    }
    else if(tier == "j"){
      color = "#ebd7cc"
    }
    else if(tier == "N/A"){
      color = "#0000"
    }
      let embed = new Discord.MessageEmbed()
      .setTitle(`${emote} ${parts.Parts[part.toLowerCase()].Name} Stats`)
      .setDescription(`Added Performance: +${parts.Parts[part.toLowerCase()].AddedSpeed}\nTier: ${parts.Parts[part.toLowerCase()].Tier}\nPrice: $${numberWithCommas(parts.Parts[part.toLowerCase()].Price)}\nSell for: $${numberWithCommas(sellprice)}`)
      .setColor(color)

      if(part.toLowerCase() == "t1drifttires" || part.toLowerCase() == "driftsuspension" || part.toLowerCase() == "t2drifttires"){
        embed.setDescription(`Drift Score: +${parts.Parts[part.toLowerCase()].DriftScore}\nDecreased Performance: -${parts.Parts[part.toLowerCase()].DecreaseSpeed}\nPrice: $${numberWithCommas(parts.Parts[part.toLowerCase()].Price)}\nSell for: $${numberWithCommas(sellprice)}`)

      }
      if(part.toLowerCase() == "racesuspension" || part.toLowerCase() == "t2racesuspension"){
        embed.setDescription(`Drift Score: -${parts.Parts[part.toLowerCase()].DecreasedDrift}\nAdded Performance: +${parts.Parts[part.toLowerCase()].AddedSpeed}\nPrice: $${numberWithCommas(parts.Parts[part.toLowerCase()].Price)}\nSell for: $${numberWithCommas(sellprice)}`)

      }
      if(part.toLowerCase() == "t1wintertires" || part.toLowerCase() == "t2wintertires"){
        embed.setDescription(`Decreased Performance: -${parts.Parts[part.toLowerCase()].DecreaseSpeed}\nAdded Snow Score: ${numberWithCommas(parts.Parts[part.toLowerCase()].AddedSnow)}\nPrice: $${numberWithCommas(parts.Parts[part.toLowerCase()].Price)}\nSell for: $${numberWithCommas(sellprice)}`)

      }
      if(part.toLowerCase() == "t1nitrous"){
        embed.setDescription(`Boost: +${parts.Parts[part.toLowerCase()].Boost}\nPrice: $${numberWithCommas(parts.Parts[part.toLowerCase()].Price)}\n\nGrants the ability to use nitrous`)

      }
      if(part.toLowerCase() == "t1spoiler"){
        embed.setDescription(`Aero: +${parts.Parts[part.toLowerCase()].Aero} (Random speed boost 1-5)\nTier: ${parts.Parts[part.toLowerCase()].Tier}\nPrice: $${numberWithCommas(parts.Parts[part.toLowerCase()].Price)}\nSell for: $${numberWithCommas(sellprice)}\n\nGives you a random speed boost in a race`)

      }
      if(part.toLowerCase() == "t1weightreduction"){
        embed.setDescription(`Added Performance: +${parts.Parts[part.toLowerCase()].AddedSpeed}\nDrift Score: +${parts.Parts[part.toLowerCase()].DriftScore}\nTier: ${parts.Parts[part.toLowerCase()].Tier}\nPrice: $${numberWithCommas(parts.Parts[part.toLowerCase()].Price)}\nSell for: $${numberWithCommas(sellprice)}`)

      }
      
      message.reply({embeds: [embed]})

    
  },
  permissions: "",
  requiredRoles: [],
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}