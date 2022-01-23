const { prefix } = require('../config.json')
const cars = require('../cardb.json')
const wait = require('util').promisify(setTimeout);
const db = require('quick.db')

module.exports = {
  commands: ['dealership', 'dealer'],
  callback: async (message, arguments, text, client) => {
    
    const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton, DiscordAPIError } = require('discord.js');
        let opened = db.fetch(`dealeropened_${message.author.id}`)
        let timeout = 15000
        if (opened !== null && timeout - (Date.now() - opened) > 0) {

          return message.channel.send("You already have the dealership open, wait 15 seconds before opening it again.")
        }
        else {

      
        let aemote = "<:z_a_class:898440152437886988>"
        let bemote = "<:z_b_class:898440152450465852>"
        let cemote = "<:z_c_class:898440152790220830>"
        let demote = "<:z_d_class:898440153201278976>"
        let eemote = "<:z_epic:910446626378756177>"
        let semote = "<:z_class_s:910447303498825728>"
        const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Select a class')
            .addOptions([
              {
                label: 'D Class',
                description: 'Select this for the list of D class cars',
                value: 'first_option',
                customId: 'd_class'
              },
               {
                label: 'D Class Page 2',
                description: 'Select this for the 2nd page of D class cars',
                value: 'first_option_2',
                customId: 'd_class'
              },
              {
                label: 'C Class',
                description: 'Select this for the list of C class cars',
                value: 'second_option',
                customId: 'c_class'
              },
              {
                label: 'C Class Page 2',
                description: 'Select this for the 2nd page of C class cars',
                value: 'second_option_2',
                customId: 'c_class'
              },
              {
                label: 'B Class',
                description: 'Select this for the list of B class cars',
                value: 'third_option',
              },
              {
                label: 'B Class Page 2',
                description: 'Select this for the list of B class cars',
                value: 'third_option_2',
              },
              {
                label: 'A Class',
                description: 'Select this for the list of A class cars',
                value: 'fourth_option',
              },
              {
                label: 'S Class',
                description: 'Select this for the list of S class cars',
                value: 'fifth_option',
              },
              {
                label: 'E Class',
                description: 'Select this for the list of E class cars',
                value: 'sixth_option',
              },
              {
                label: 'U Class',
                description: 'Select this for the list of U class cars',
                value: 'special_option',
              },
            ]),
        );

        let embed = new MessageEmbed()
        .setTitle('Dealership')
        .setThumbnail("https://i.ibb.co/844BRBp/Logo-Makr-3-V9-MQG-1.png")
        .addField(`Available Classes`, "*Choose a class from the drop down below*\n\nD Class (Entry)\nC Class\nB Class\nA Class\nS Class\nU Class (Best)\nE Class (Special)", true)
        .setColor("#60b0f4")
        .setDescription(`\`z!buy (full car name)\` to buy a car\n\n[Official Server](https://discord.gg/SFrujkEs5A)\n[Buy me a coffee!](https://www.buymeacoffee.com/zero2sixty)`)
        message.channel.send({embeds: [embed], components: [row]}).then(async msg => {
          db.set(`dealeropened_${message.author.id}`, Date.now())

          try{
          const filter = (interaction) => interaction.isSelectMenu() && interaction.user.id === message.author.id;

          const collector = message.channel.createMessageComponentCollector({
            filter,
            time: 1000 * 15,
          })

     
          collector.on('collect', async (collected) => {
            
            const value = collected.values[0];
            if (value === 'first_option') {
              await collected.deferUpdate()
              let embed2
                    embed2 = new MessageEmbed()
   
                   .setTitle('D Class')
         .setFooter('Tip: Purchase a car with "z!buy (full car name)"')
         .setDescription(`**
         Page 1\n

         ${cars.Cars["1995 mazda miata"].Emote} ${cars.Cars["1995 mazda miata"].Name} :  $${numberWithCommas(cars.Cars["1995 mazda miata"].Price)}\n
         ${cars.Cars["1997 acura integra"].Emote} ${cars.Cars["1997 acura integra"].Name} : $${numberWithCommas(cars.Cars["1997 acura integra"].Price)}\n
         ${cars.Cars["1991 toyota mr2"].Emote} ${cars.Cars["1991 toyota mr2"].Name} : $${numberWithCommas(cars.Cars["1991 toyota mr2"].Price)}\n 
         ${cars.Cars["2002 pontiac firebird"].Emote} ${cars.Cars["2002 pontiac firebird"].Name} : $${numberWithCommas(cars.Cars["2002 pontiac firebird"].Price)}\n
         ${cars.Cars["1964 peel p50"].Emote} ${cars.Cars["1964 peel p50"].Name} : $${numberWithCommas(cars.Cars["1964 peel p50"].Price)}\n
         ${cars.Cars["1999 mitsubishi eclipse"].Emote} ${cars.Cars["1999 mitsubishi eclipse"].Name} : $${numberWithCommas(cars.Cars["1999 mitsubishi eclipse"].Price)}\n
         ${cars.Cars["2000 toyota corolla levin"].Emote} ${cars.Cars["2000 toyota corolla levin"].Name} : $${numberWithCommas(cars.Cars["2000 toyota corolla levin"].Price)}\n
         ${cars.Cars["2009 volkswagen golf gti"].Emote} ${cars.Cars["2009 volkswagen golf gti"].Name} : $${numberWithCommas(cars.Cars["2009 volkswagen golf gti"].Price)}\n
         ${cars.Cars["2005 dodge neon srt4"].Emote} ${cars.Cars["2005 dodge neon srt4"].Name} : $${numberWithCommas(cars.Cars["2005 dodge neon srt4"].Price)}\n

         **`)
         .setColor("#60b0f4")
         .setThumbnail("https://i.ibb.co/R9rzFp2/Logo-Makr-0rd-JBs.png")
         msg.edit({embeds: [embed2], components: [row]})
        }

        else  if (value === 'first_option_2') {
          await collected.deferUpdate()
          let embed2
                    embed2 = new MessageEmbed()
                    
                   .setTitle('D Class')
                   .setFooter('Tip: Purchase a car with "z!buy (full car name)"')
         .setDescription(`**
         Page 2\n
         
         ${cars.Cars["1998 bmw m3 e36"].Emote} ${cars.Cars["1998 bmw m3 e36"].Name} : $${numberWithCommas(cars.Cars["1998 bmw m3 e36"].Price)}\n
         ${cars.Cars["1998 pontiac fiero"].Emote} ${cars.Cars["1998 pontiac fiero"].Name} : $${numberWithCommas(cars.Cars["1998 pontiac fiero"].Price)}\n
         ${cars.Cars["1989 chevy camaro"].Emote} ${cars.Cars["1989 chevy camaro"].Name} : $${numberWithCommas(cars.Cars["1989 chevy camaro"].Price)}\n
         ${cars.Cars["2008 nissan 350z"].Emote} ${cars.Cars["2008 nissan 350z"].Name} : $${numberWithCommas(cars.Cars["2008 nissan 350z"].Price)}\n
         ${cars.Cars["2014 hyundai genesis coupe"].Emote} ${cars.Cars["2014 hyundai genesis coupe"].Name} : $${numberWithCommas(cars.Cars["2014 hyundai genesis coupe"].Price)}\n
         ${cars.Cars["2019 subaru brz"].Emote} ${cars.Cars["2019 subaru brz"].Name} : $${numberWithCommas(cars.Cars["2019 subaru brz"].Price)}\n
         **`)
         .setColor("#60b0f4")
         .setThumbnail("https://i.ibb.co/R9rzFp2/Logo-Makr-0rd-JBs.png")
         msg.edit({embeds: [embed2], components: [row]})

            }

            else  if (value === 'second_option') {
              await collected.deferUpdate()
              let embed2
              embed2 = new MessageEmbed()

             .setTitle('C Class')
   .setFooter('Tip: Purchase a car with "z!buy (full car name)"')
   .setDescription(`**
   Page 1\n

   ${cars.Cars["2015 bmw m3"].Emote} ${cars.Cars["2015 bmw m3"].Name} : $${numberWithCommas(cars.Cars["2015 bmw m3"].Price)}\n
   ${cars.Cars["2004 subaru wrx sti"].Emote} ${cars.Cars["2004 subaru wrx sti"].Name} : $${numberWithCommas(cars.Cars["2004 subaru wrx sti"].Price)}\n
   ${cars.Cars["2010 ford mustang"].Emote} ${cars.Cars["2010 ford mustang"].Name} : $${numberWithCommas(cars.Cars["2010 ford mustang"].Price)}\n
   ${cars.Cars["2002 bmw m3 gtr"].Emote} ${cars.Cars["2002 bmw m3 gtr"].Name} : $${numberWithCommas(cars.Cars["2002 bmw m3 gtr"].Price)}\n
   ${cars.Cars["1989 nissan skyline r32"].Emote} ${cars.Cars["1989 nissan skyline r32"].Name} : $${numberWithCommas(cars.Cars["1989 nissan skyline r32"].Price)}\n
   ${cars.Cars["1995 nissan skyline r33"].Emote} ${cars.Cars["1995 nissan skyline r33"].Name} : $${numberWithCommas(cars.Cars["1995 nissan skyline r33"].Price)}\n
   ${cars.Cars["2013 mazda speed3"].Emote} ${cars.Cars["2013 mazda speed3"].Name} : $${numberWithCommas(cars.Cars["2013 mazda speed3"].Price)}\n
   ${cars.Cars["2010 chevy camaro v6"].Emote} ${cars.Cars["2010 chevy camaro v6"].Name} : $${numberWithCommas(cars.Cars["2010 chevy camaro v6"].Price)}\n
   ${cars.Cars["2001 toyota supra mk4"].Emote} ${cars.Cars["2001 toyota supra mk4"].Name} : $${numberWithCommas(cars.Cars["2001 toyota supra mk4"].Price)}\n
   ${cars.Cars["2007 mitsubishi evo ix"].Emote} ${cars.Cars["2007 mitsubishi evo ix"].Name} : $${numberWithCommas(cars.Cars["2007 mitsubishi evo ix"].Price)}
   **`)
   .setColor("#60b0f4")
   .setThumbnail("https://i.ibb.co/PjrDvmT/Logo-Makr-8e-Br0z.png")
   msg.edit({embeds: [embed2], components: [row]})

            }

            else  if (value === 'second_option_2') {
              await collected.deferUpdate()
              let embed2
              embed2 = new MessageEmbed()

             .setTitle('C Class')
   .setFooter('Tip: Purchase a car with "z!buy (full car name)"')
   .setDescription(`**
   Page 2\n
   ${cars.Cars["2002 mazda rx7 fd"].Emote} ${cars.Cars["2002 mazda rx7 fd"].Name} : $${numberWithCommas(cars.Cars["2002 mazda rx7 fd"].Price)}\n
   ${cars.Cars["1994 mitsubishi 3000gt vr4"].Emote} ${cars.Cars["1994 mitsubishi 3000gt vr4"].Name} : $${numberWithCommas(cars.Cars["1994 mitsubishi 3000gt vr4"].Price)}\n
   ${cars.Cars["2009 honda s2000 cr"].Emote} ${cars.Cars["2009 honda s2000 cr"].Name} : $${numberWithCommas(cars.Cars["2009 honda s2000 cr"].Price)}\n
   ${cars.Cars["2016 alfa romeo 4c spider"].Emote} ${cars.Cars["2016 alfa romeo 4c spider"].Name} : $${numberWithCommas(cars.Cars["2016 alfa romeo 4c spider"].Price)}\n
   ${cars.Cars["2018 honda civic type r"].Emote} ${cars.Cars["2018 honda civic type r"].Name} : $${numberWithCommas(cars.Cars["2018 honda civic type r"].Price)}\n
   ${cars.Cars["2002 nissan skyline r34"].Emote} ${cars.Cars["2002 nissan skyline r34"].Name} : $${numberWithCommas(cars.Cars["2002 nissan skyline r34"].Price)}\n
   ${cars.Cars["1994 porsche 911"].Emote} ${cars.Cars["1994 porsche 911"].Name} : $${numberWithCommas(cars.Cars["1994 porsche 911"].Price)}\n
   ${cars.Cars["2004 corvette c5"].Emote} ${cars.Cars["2004 corvette c5"].Name} : $${numberWithCommas(cars.Cars["2004 corvette c5"].Price)}\n
   **`)
   .setColor("#60b0f4")
   .setThumbnail("https://i.ibb.co/PjrDvmT/Logo-Makr-8e-Br0z.png")
   msg.edit({embeds: [embed2], components: [row]})

            }

            else  if (value === 'third_option') {
              await collected.deferUpdate()
              let embed2
              embed2 = new MessageEmbed()

             .setTitle('B Class')
   .setFooter('Tip: Purchase a car with "z!buy (full car name)"')
   .setDescription(`**
   Page 1\n
   
 ${cars.Cars["2020 audi tt rs"].Emote} ${cars.Cars["2020 audi tt rs"].Name} : $${numberWithCommas(cars.Cars["2020 audi tt rs"].Price)}\n
 ${cars.Cars["2011 bmw m3"].Emote} ${cars.Cars["2011 bmw m3"].Name} : $${numberWithCommas(cars.Cars["2011 bmw m3"].Price)}\n
 ${cars.Cars["1993 porsche 959"].Emote} ${cars.Cars["1993 porsche 959"].Name} : $${numberWithCommas(cars.Cars["1993 porsche 959"].Price)}\n
 ${cars.Cars["2020 nissan 370z nismo"].Emote} ${cars.Cars["2020 nissan 370z nismo"].Name} : $${numberWithCommas(cars.Cars["2020 nissan 370z nismo"].Price)}\n
 ${cars.Cars["2021 toyota supra"].Emote} ${cars.Cars["2021 toyota supra"].Name} : $${numberWithCommas(cars.Cars["2021 toyota supra"].Price)}\n
 ${cars.Cars["2020 porsche 718 cayman"].Emote} ${cars.Cars["2020 porsche 718 cayman"].Name} : $${numberWithCommas(cars.Cars["2020 porsche 718 cayman"].Price)}\n
 ${cars.Cars["2015 lotus exige sport"].Emote} ${cars.Cars["2015 lotus exige sport"].Name} : $${numberWithCommas(cars.Cars["2015 lotus exige sport"].Price)}\n
 ${cars.Cars["2011 audi rs5"].Emote} ${cars.Cars["2011 audi rs5"].Name} : $${numberWithCommas(cars.Cars["2011 audi rs5"].Price)}\n
 ${cars.Cars["2012 dodge charger srt8"].Emote} ${cars.Cars["2012 dodge charger srt8"].Name} : $${numberWithCommas(cars.Cars["2012 dodge charger srt8"].Price)}\n
 ${cars.Cars["2019 chevy camaro zl1"].Emote} ${cars.Cars["2019 chevy camaro zl1"].Name} : $${numberWithCommas(cars.Cars["2019 chevy camaro zl1"].Price)})\n
 **`)
 .setColor("#60b0f4")
 .setThumbnail("https://i.ibb.co/NKBYZL2/Logo-Makr-3-Qttqh.png")
 msg.edit({embeds: [embed2], components: [row]})
 
}
else  if (value === 'third_option_2') {
  await collected.deferUpdate()
  
  let embed2
  embed2 = new MessageEmbed()
  
  .setTitle('B Class')
  .setFooter('Tip: Purchase a car with "z!buy (full car name)"')
  .setDescription(`**
  Page 2\n
  
  ${cars.Cars["2021 ford mustang mach 1"].Emote} ${cars.Cars["2021 ford mustang mach 1"].Name} : $${numberWithCommas(cars.Cars["2021 ford mustang mach 1"].Price)}
   ${cars.Cars["2012 dodge challenger srt8"].Emote} ${cars.Cars["2012 dodge challenger srt8"].Name} : $${numberWithCommas(cars.Cars["2012 dodge challenger srt8"].Price)}\n
   ${cars.Cars["2017 dodge viper acr"].Emote} ${cars.Cars["2017 dodge viper acr"].Name} : $${numberWithCommas(cars.Cars["2017 dodge viper acr"].Price)}\n
   ${cars.Cars["2016 jaguar f type"].Emote} ${cars.Cars["2016 jaguar f type"].Name} : $${numberWithCommas(cars.Cars["2016 jaguar f type"].Price)}\n
   ${cars.Cars["2009 corvette c6"].Emote} ${cars.Cars["2009 corvette c6"].Name} : $${numberWithCommas(cars.Cars["2009 corvette c6"].Price)}\n
   ${cars.Cars["2020 chevy corvette c8"].Emote} ${cars.Cars["2020 chevy corvette c8"].Name} : $${numberWithCommas(cars.Cars["2020 chevy corvette c8"].Price)}\n
   ${cars.Cars["2015 mercedes amg gts"].Emote} ${cars.Cars["2015 mercedes amg gts"].Name} : $${numberWithCommas(cars.Cars["2015 mercedes amg gts"].Price)}\n
   ${cars.Cars["2016 alfa romeo giulia"].Emote} ${cars.Cars["2016 alfa romeo giulia"].Name} : $${numberWithCommas(cars.Cars["2016 alfa romeo giulia"].Price)}
   **`)
   .setColor("#60b0f4")
   .setThumbnail("https://i.ibb.co/NKBYZL2/Logo-Makr-3-Qttqh.png")
   msg.edit({embeds: [embed2], components: [row]})

            }

            else  if (value === 'fourth_option') {
              await collected.deferUpdate()

              let embed2
              embed2 = new MessageEmbed()

             .setTitle('A Class')
   .setFooter('Tip: Purchase a car with "z!buy (full car name)"')
   .setDescription(`**
   Page 1\n
   
   ${cars.Cars["1998 ferrari f355"].Emote} ${cars.Cars["1998 ferrari f355"].Name} : $${numberWithCommas(cars.Cars["1998 ferrari f355"].Price)}\n
   ${cars.Cars["2021 nissan gtr"].Emote} ${cars.Cars["2021 nissan gtr"].Name} : $${numberWithCommas(cars.Cars["2021 nissan gtr"].Price)}\n
   ${cars.Cars["1993 jaguar xj220"].Emote} ${cars.Cars["1993 jaguar xj220"].Name} : $${numberWithCommas(cars.Cars["1993 jaguar xj220"].Price)}\n
   ${cars.Cars["2021 porsche 911 gt3"].Emote} ${cars.Cars["2021 porsche 911 gt3"].Name} : $${numberWithCommas(cars.Cars["2021 porsche 911 gt3"].Price)}\n
   ${cars.Cars["2017 ford gt"].Emote} ${cars.Cars["2017 ford gt"].Name} : $${numberWithCommas(cars.Cars["2017 ford gt"].Price)}\n
   ${cars.Cars["2014 lamborghini huracan"].Emote} ${cars.Cars["2014 lamborghini huracan"].Name} : $${numberWithCommas(cars.Cars["2014 lamborghini huracan"].Price)}\n
   ${cars.Cars["2018 audi r8"].Emote} ${cars.Cars["2018 audi r8"].Name} : $${numberWithCommas(cars.Cars["2018 audi r8"].Price)}\n
   ${cars.Cars["2014 mclaren 12c"].Emote} ${cars.Cars["2014 mclaren 12c"].Name} : $${numberWithCommas(cars.Cars["2014 mclaren 12c"].Price)}\n
   ${cars.Cars["2020 mclaren 570s"].Emote} ${cars.Cars["2020 mclaren 570s"].Name} : $${numberWithCommas(cars.Cars["2020 mclaren 570s"].Price)}\n
   ${cars.Cars["2021 porsche taycan turbo s"].Emote} ${cars.Cars["2021 porsche taycan turbo s"].Name} : $${numberWithCommas(cars.Cars["2021 porsche taycan turbo s"].Price)}

   **`)
   .setColor("#60b0f4")
   .setThumbnail("https://i.ibb.co/n05Hy6k/Logo-Makr-1s5-Rq-S.png")
   msg.edit({embeds: [embed2], components: [row]})

            }

            else  if (value === 'fifth_option') {
              await collected.deferUpdate()

              let embed2
              embed2 = new MessageEmbed()

             .setTitle('S Class')
   .setFooter('Tip: Purchase a car with "z!buy (full car name)"')
   .setDescription(`**
   Page 1\n

${cars.Cars["2010 ferrari 458 italia"].Emote} ${cars.Cars["2010 ferrari 458 italia"].Name} : $${numberWithCommas(cars.Cars["2010 ferrari 458 italia"].Price)}\n
${cars.Cars["2018 lamborghini aventador s"].Emote} ${cars.Cars["2018 lamborghini aventador s"].Name} : $${numberWithCommas(cars.Cars["2018 lamborghini aventador s"].Price)}\n
${cars.Cars["2016 aston martin vulkan"].Emote} ${cars.Cars["2016 aston martin vulkan"].Name} : $${numberWithCommas(cars.Cars["2016 aston martin vulkan"].Price)}\n
${cars.Cars["2013 mclaren p1"].Emote} ${cars.Cars["2013 mclaren p1"].Name} : $${numberWithCommas(cars.Cars["2013 mclaren p1"].Price)}\n
${cars.Cars["2021 mclaren 720s"].Emote} ${cars.Cars["2021 mclaren 720s"].Name} : $${numberWithCommas(cars.Cars["2021 mclaren 720s"].Price)}\n
${cars.Cars["2021 ferrari sf90 stradale"].Emote} ${cars.Cars["2021 ferrari sf90 stradale"].Name} : $${numberWithCommas(cars.Cars["2021 ferrari sf90 stradale"].Price)}\n
${cars.Cars["2008 bugatti veyron"].Emote} ${cars.Cars["2008 bugatti veyron"].Name} : $${numberWithCommas(cars.Cars["2008 bugatti veyron"].Price)}\n
${cars.Cars["2022 aston martin valkyrie"].Emote} ${cars.Cars["2022 aston martin valkyrie"].Name} : $${numberWithCommas(cars.Cars["2022 aston martin valkyrie"].Price)}\n
${cars.Cars["2016 bugatti chiron"].Emote} ${cars.Cars["2016 bugatti chiron"].Name} : $${numberWithCommas(cars.Cars["2016 bugatti chiron"].Price)}\n
${cars.Cars["2018 koenigsegg agera"].Emote} ${cars.Cars["2018 koenigsegg agera"].Name} : $${numberWithCommas(cars.Cars["2018 koenigsegg agera"].Price)}


   **`)
   .setColor("#60b0f4")
   .setThumbnail("https://i.ibb.co/VSQYBhs/Logo-Makr-5-ZL94f.png")
   msg.edit({embeds: [embed2], components: [row]})

            }

            else  if (value === 'sixth_option') {
              await collected.deferUpdate()
              let embed2
              embed2 = new MessageEmbed()

             .setTitle('E Class')
   .setFooter('Tip: Purchase a car with "z!buy (full car name)"')
   .setDescription(`**
   Page 1\n
   
   ${cars.Cars["1981 dmc delorean"].Emote} ${cars.Cars["1981 dmc delorean"].Name} : $${numberWithCommas(cars.Cars["1981 dmc delorean"].Price)}\n
   ${cars.Cars["bat tumbler"].Emote} ${cars.Cars["bat tumbler"].Name} : $${numberWithCommas(cars.Cars["bat tumbler"].Price)}\n
   ${cars.Cars["the ectomobile"].Emote} ${cars.Cars["the ectomobile"].Name} : $${numberWithCommas(cars.Cars["the ectomobile"].Price)}\n


   **`)
   .setColor("#60b0f4")
   .setThumbnail("https://i.ibb.co/8Pg0v34/Logo-Makr-1-FSxlp.png")
   msg.edit({embeds: [embed2], components: [row]})

            }

            else  if (value === 'special_option') {
              await collected.deferUpdate()

              let embed2
              embed2 = new MessageEmbed()

             .setTitle('U Class')
   .setFooter('Tip: Purchase a car with "z!buy (full car name)"')
   .setDescription(`**
   Page 1\n
   ${cars.Cars["2020 koenigsegg jesko"].Emote} ${cars.Cars["2020 koenigsegg jesko"].Name} : $${numberWithCommas(cars.Cars["2020 koenigsegg jesko"].Price)}

  **
   `)
   .setColor("#60b0f4")
   .setThumbnail("https://i.ibb.co/6gjkPzZ/Logo-Makr-3iqn-NC.png")
   msg.edit({embeds: [embed2], components: [row]})

            }

            
          })
        } catch(err) {
          return msg.reply(`Error: ${err}`)
        }
  
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