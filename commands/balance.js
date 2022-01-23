const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    commands: ['balance', 'bal'],
    callback: (message, arguments, text) => {
      let disabled = db.fetch(`balance_disabled_${message.guild.id}`)
      if(disabled == true) return message.channel.send("This command is disabled!")
      let emote = '<:z_money:900186722145538088>'
      let goldemote = '<:z_gold:925591755611590740>'
      let user = message.mentions.users.first() || message.author
        let userid = user.id
        let cash = db.fetch(`cash_${userid}`) || 0
        let gold = db.fetch(`gold_${userid}`) || 0
        let tickets = db.fetch(`tickets_${userid}`) || 0
        let pumpkins = db.fetch(`pumpkins_${userid}`) || 0
        if(!cash || cash == null)  cash = 0;
        
        let embed = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s Balance`)
        .setDescription(`💵 Cash: $${numberWithCommas(cash)}\n\n🎟️ Tickets: ${tickets}`)
        .setColor("#60b0f4")
        .setThumbnail('https://i.ibb.co/FB8RwK9/Logo-Makr-5-Toeui.png')

        message.reply({embeds: [embed]})
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