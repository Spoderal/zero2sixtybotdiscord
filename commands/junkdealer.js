const { prefix } = require('../config.json')
const { MessageEmbed, MessageReaction, DiscordAPIError, MessageActionRow, MessageSelectMenu } = require('discord.js')
const cars = require('../cardb.json')
const parts = require('../partsdb.json')
const db = require("quick.db")

module.exports = {
    commands: ['junkdealer', 'jd'],
    callback: (message, arguments, text) => {

      let opened = db.fetch(`jdealeropen_${message.author.id}`)
      let timeout = 15000
      if (opened !== null && timeout - (Date.now() - opened) > 0) {

        return message.channel.send("You already have the junk dealership open, wait 15 seconds before opening it again.")
      }
      else {
      let apages = 1
      let bpages = 2
      let cpages = 2
      let dpages = 2
      let spages = 1
     
        let aemote = "<:z_a_class:898440152437886988>"
        let bemote = "<:z_b_class:898440152450465852>"
        let cemote = "<:z_c_class:898440152790220830>"
        let demote = "<:z_d_class:898440153201278976>"
        let eemote = "<:z_epic:910446626378756177>"
        let semote = "<:z_class_s:910447303498825728>"
        let embed = new MessageEmbed()
        .setTitle('Dealership')
        .setThumbnail("https://i.ibb.co/1ZvZyPB/Logo-Makr-3-V9-MQG-1-2.png")
        .addField(`Available Classes`, "*Choose a class from the drop down below*\n\nD Class\nC Class\nB Class", true)
        .setColor("#60b0f4")
        .setDescription(`\`z!buy (full car name)\` to buy a car\n\n[Official Server](https://discord.gg/SFrujkEs5A)\n\n[Support the development!](https://www.buymeacoffee.com/zero2sixty)`)

        const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Select a class')
            .addOptions([
              {
                label: 'D Class',
                description: 'Select this for the list of D class junk cars',
                value: 'first_option',
                customId: 'd_class'
              },
               {
                label: 'C Class',
                description: 'Select this for the list of C class junk cars',
                value: 'second_option',
                customId: 'c_class'
              },
              {
                label: 'B Class',
                description: 'Select this for the list of B class junk cars',
                value: 'third_option',
                customId: 'b_class'
              },
             
            ]),
        );
        message.channel.send({embeds: [embed], components: [row]}).then(msg => {

          db.set(`jdealeropen_${message.author.id}`, Date.now())
          const filter = (interaction) => interaction.isSelectMenu() && interaction.user.id === message.author.id;

          const collector = message.channel.createMessageComponentCollector({
            filter,
            time: 1000 * 15,
          })

          collector.on('collect', async(collected) => {
            collected.deferUpdate()
            
            const value = collected.values[0];
            if (value === 'first_option') {
              let embed2
                    embed2 = new MessageEmbed()
   
                   .setTitle('D Class Junk')
         .setFooter('Tip: Purchase a car with "z!buy (full car name)"')
         .setDescription(`**
         Page 1\n
            ${cars.Cars['junked 1969 ford mustang'].Emote} ${cars.Cars['junked 1969 ford mustang'].Name} : $${numberWithCommas(cars.Cars['junked 1969 ford mustang'].Price)}

            ${cars.Cars['junked 1967 chevy camaro'].Emote} ${cars.Cars['junked 1967 chevy camaro'].Name} : $${numberWithCommas(cars.Cars['junked 1967 chevy camaro'].Price)}

            ${cars.Cars['junked 1990 nissan 240sx'].Emote} ${cars.Cars['junked 1990 nissan 240sx'].Name} : $${numberWithCommas(cars.Cars['junked 1990 nissan 240sx'].Price)}
      
         **`)
         .setColor("#60b0f4")
         .setThumbnail("https://i.ibb.co/JQ0y5S2/Logo-Makr-0rd-JBs-1.png")
         msg.edit({embeds: [embed2], components: [row]})
            }
            else if (value === 'second_option') {
              let embed2
                    embed2 = new MessageEmbed()
   
                   .setTitle('C Class Junk')
         .setFooter('Tip: Purchase a car with "z!buy (full car name)"')
         .setDescription(`**
         Page 1\n
         ${cars.Cars['junked 1990 bmw m3'].Emote} ${cars.Cars['junked 1990 bmw m3'].Name} : $${numberWithCommas(cars.Cars['junked 1990 bmw m3'].Price)}

         ${cars.Cars['junked 1971 chevy corvette'].Emote} ${cars.Cars['junked 1971 chevy corvette'].Name} : $${numberWithCommas(cars.Cars['junked 1971 chevy corvette'].Price)}

         **`)
         .setColor("#60b0f4")
         .setThumbnail("https://i.ibb.co/n0t1df6/Logo-Makr-8e-Br0z-2.png")
         msg.edit({embeds: [embed2], components: [row]})
            }
            else if (value === 'third_option') {
              let embed2
                    embed2 = new MessageEmbed()
   
                   .setTitle('B Class Junk')
         .setFooter('Tip: Purchase a car with "z!buy (full car name)"')
         .setDescription(`**
         Page 1\n
            ${cars.Cars['junked 1973 ferrari dino'].Emote} ${cars.Cars['junked 1973 ferrari dino'].Name} : $${numberWithCommas(cars.Cars['junked 1973 ferrari dino'].Price)}

            ${cars.Cars['junked 1969 ford gt40'].Emote} ${cars.Cars['junked 1969 ford gt40'].Name} : $${numberWithCommas(cars.Cars['junked 1969 ford gt40'].Price)}

         **`)
         .setColor("#60b0f4")
         .setThumbnail("https://i.ibb.co/wRWxJHJ/Logo-Makr-3-Qttqh-1.png")
         msg.edit({embeds: [embed2], components: [row]})
            }
        


          })

        })

      
    
      }
    
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