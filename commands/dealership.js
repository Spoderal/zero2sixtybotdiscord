const { prefix } = require('../config.json')
const { MessageEmbed, MessageReaction } = require('discord.js')
const cars = require('../cardb.json')

module.exports = {
    commands: ['dealership', 'dealer'],
    callback: (message, arguments, text) => {
      let mistu = "<:mitsubishi:872308994360881163>"
      let toyot = "<:toyota:872308997271748639>"
      let porsche = "<:porsche:872308173216837684>"
      let bmw = "<:bmw:872310455509581844>"
      let chevy = "<:chevy:872310486610378795>"
      let dodge = "<:dodge:872310454821740564>"
      let ford = "<:ford:872310486820077618>"
      let honda = "<:honda:872310455635439646>"
      let hyund = "<:hyundai:872308994495098900>"
      let jaguar = "<:jaguar:872310454817533983>"
      let mazda = "<:mazda:872309395273445378>"
      let nissan = "<:nissan:872309395273445377>"
      let pontiac = "<:pontiac:872308998202867782>"
      let acura = "<:acura:872365013606731776>"
      let lambo = "<:lamborghini:872366245960351775>"
      let ferrari = "<:ferrari:872308439039217665>"
      let audi = "<:audi:874817084259967039>"
      let subaru = "<:subaru:875135724075225139>"
      let lotus = "<:lotus:879220029764292608>"
      let viper = "<:viper:879246028337979442>"
      let aston = "<:aston:880338345543209010>"
      let mclaren = "<:mclaren:884619536807125062>"
      let alfa = "<:alfaromeo:884619536635133954>"

    const embed = new MessageEmbed()
    embed.setTitle('Dealership')
    embed.setFooter('z!buy (full car name) to buy a car')
    embed.setThumbnail("https://i.ibb.co/wWn4Vgq/dealer.png")
    embed.addField("A Class Cars", "🇦", true)
    embed.addField("B Class Cars", "🇧", true)
    embed.addField("C Class Cars", "🇨", true)
    embed.addField("D Class Cars", "🇩", true)
    embed.setDescription(`[Official Server](https://discord.gg/SFrujkEs5A)\n[Buy me a coffee!](https://www.buymeacoffee.com/zero2sixty)`)

    message.channel.send(embed).then(msg => {
    msg.react('🇩')
    msg.react('🇨')
    msg.react('🇧')
    msg.react('🇦')
    msg.react('⬅️')
  
    const AFilter = (reaction, user) => reaction.emoji.name === '🇩' && user.id === message.author.id;
    const BFilter = (reaction, user) => reaction.emoji.name === '🇨' && user.id === message.author.id;
    const CFilter = (reaction, user) => reaction.emoji.name === '🇧' && user.id === message.author.id;
    const DFilter = (reaction, user) => reaction.emoji.name === '🇦' && user.id === message.author.id;
    const EFilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;


    const AClass = msg.createReactionCollector(AFilter, {time: 60000});
    const BClass = msg.createReactionCollector(BFilter, {time: 60000});
    const CClass = msg.createReactionCollector(CFilter, {time: 60000});
    const DClass = msg.createReactionCollector(DFilter, {time: 60000});
    const EClass = msg.createReactionCollector(EFilter, {time: 60000});


    AClass.on('collect', r => {
      embed.fields = []

      embed.setTitle('A Dealer')
      embed.setFooter('Prefix is "z!"')
      embed.setDescription(`**
      ${cars.Cars["1964 Peel P50"].Name} : $${numberWithCommas(cars.Cars["1964 Peel P50"].Price)}
      ${mazda} ${cars.Cars["1995 Mazda Miata"].Name} :  $${numberWithCommas(cars.Cars["1995 Mazda Miata"].Price)}\n
      ${acura} ${cars.Cars["1997 Acura Integra"].Name} : $${numberWithCommas(cars.Cars["1997 Acura Integra"].Price)}\n
      ${toyot} ${cars.Cars["1991 Toyota MR2"].Name} : $${numberWithCommas(cars.Cars["1991 Toyota MR2"].Price)}\n 
      ${pontiac} ${cars.Cars["2002 Pontiac Firebird"].Name} : $${numberWithCommas(cars.Cars["2002 Pontiac Firebird"].Price)}\n
      ${dodge} ${cars.Cars["2005 Dodge Neon SRT4"].Name} : $${numberWithCommas(cars.Cars["2005 Dodge Neon SRT4"].Price)}\n
      ${bmw} ${cars.Cars["1998 BMW M3 E36"].Name} : $${numberWithCommas(cars.Cars["1998 BMW M3 E36"].Price)}\n
      ${nissan} ${cars.Cars["2008 Nissan 350Z"].Name} : $${numberWithCommas(cars.Cars["2008 Nissan 350Z"].Price)}\n
      ${hyund} ${cars.Cars["2014 Hyundai Genesis Coupe"].Name} : $${numberWithCommas(cars.Cars["2014 Hyundai Genesis Coupe"].Price)}\n
      ${subaru} ${cars.Cars["2019 Subaru BRZ"].Name} : $${numberWithCommas(cars.Cars["2019 Subaru BRZ"].Price)}\n

      **`)
      embed.setThumbnail("https://i.ibb.co/Y2Ky02W/Aclass.png")
                  
      const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
try {
	for (const reaction of userReactions.values()) {
		 reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error('Failed to remove reactions.');
}
      msg.edit(embed)
  });
  BClass.on('collect', r => {
      embed.fields = []
      embed.setTitle("B Class")

      embed.setFooter('Prefix is "z!"')
     .setDescription(`**${bmw} ${cars.Cars["2015 BMW M3"].Name} : $${numberWithCommas(cars.Cars["2015 BMW M3"].Price)}\n
     ${subaru} ${cars.Cars["2004 Subaru WRX STI"].Name} : $${numberWithCommas(cars.Cars["2004 Subaru WRX STI"].Price)}\n
     ${ford} ${cars.Cars["2010 Ford Mustang"].Name} : $${numberWithCommas(cars.Cars["2010 Ford Mustang"].Price)}\n
     ${nissan} ${cars.Cars["1989 Nissan Skyline R32"].Name} : $${numberWithCommas(cars.Cars["1989 Nissan Skyline R32"].Price)}\n
     ${nissan} ${cars.Cars["1995 Nissan Skyline R33"].Name} : $${numberWithCommas(cars.Cars["1995 Nissan Skyline R33"].Price)}\n
     ${mazda} ${cars.Cars["2013 Mazda Speed3"].Name} : $${numberWithCommas(cars.Cars["2013 Mazda Speed3"].Price)}\n
     ${chevy} ${cars.Cars["2010 Chevy Camaro V6"].Name} : $${numberWithCommas(cars.Cars["2010 Chevy Camaro V6"].Price)}\n
     ${toyot} ${cars.Cars["2001 Toyota Supra MK4"].Name} : $${numberWithCommas(cars.Cars["2001 Toyota Supra MK4"].Price)}\n
     ${mistu} ${cars.Cars["2007 Mitsubishi Evo IX"].Name} : $${numberWithCommas(cars.Cars["2007 Mitsubishi Evo IX"].Price)}\n
     ${mazda} ${cars.Cars["2002 Mazda RX7 FD"].Name} : $${numberWithCommas(cars.Cars["2002 Mazda RX7 FD"].Price)}\n
     ${mistu} ${cars.Cars["1994 Mitsubishi 3000GT VR4"].Name} : $${numberWithCommas(cars.Cars["1994 Mitsubishi 3000GT VR4"].Price)}\n
     ${honda} ${cars.Cars["2009 Honda S2000 CR"].Name} : $${numberWithCommas(cars.Cars["2009 Honda S2000 CR"].Price)}\n
     ${alfa} ${cars.Cars["2016 Alfa Romeo 4C Spider"].Name} : $${numberWithCommas(cars.Cars["2016 Alfa Romeo 4C Spider"].Price)}\n
     ${porsche} ${cars.Cars["1994 Porsche 911"].Name} : $${numberWithCommas(cars.Cars["1994 Porsche 911"].Price)}\n
     **`)
     embed.setThumbnail("https://i.ibb.co/JjGdrp2/BClass.png")

     const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
     try {
       for (const reaction of userReactions.values()) {
          reaction.users.remove(message.author.id);
       }
     } catch (error) {
       console.error('Failed to remove reactions.');
     }
      msg.edit(embed)
  
  });
  CClass.on('collect', r => {
    embed.fields = []
    embed.setTitle("C Class")

    embed.setFooter('Prefix is "z!"')
   .setDescription(`**
   ${audi} ${cars.Cars["2020 Audi TT RS"].Name} : $${numberWithCommas(cars.Cars["2020 Audi TT RS"].Price)}\n
   ${nissan} ${cars.Cars["2020 Nissan 370Z Nismo"].Name} : $${numberWithCommas(cars.Cars["2020 Nissan 370Z Nismo"].Price)}\n
   ${porsche} ${cars.Cars["2020 Porsche 718 Cayman"].Name} : $${numberWithCommas(cars.Cars["2020 Porsche 718 Cayman"].Price)}\n
   ${lotus} ${cars.Cars["2015 Lotus Exige Sport"].Name} : $${numberWithCommas(cars.Cars["2015 Lotus Exige Sport"].Price)}\n
   ${audi} ${cars.Cars["2011 Audi RS5"].Name} : $${numberWithCommas(cars.Cars["2011 Audi RS5"].Price)}\n
   ${dodge} ${cars.Cars["2012 Dodge Charger SRT8"].Name} : $${numberWithCommas(cars.Cars["2012 Dodge Charger SRT8"].Price)}\n
   ${ford} ${cars.Cars["2021 Ford Mustang Mach 1"].Name} : $${numberWithCommas(cars.Cars["2021 Ford Mustang Mach 1"].Price)}\n
   ${dodge} ${cars.Cars["2012 Dodge Challenger SRT8"].Name} : $${numberWithCommas(cars.Cars["2012 Dodge Challenger SRT8"].Price)}\n
   ${viper} ${cars.Cars["2017 Dodge Viper ACR"].Name} : $${numberWithCommas(cars.Cars["2017 Dodge Viper ACR"].Price)}\n
   ${jaguar} ${cars.Cars["2016 Jaguar F Type"].Name} : $${numberWithCommas(cars.Cars["2016 Jaguar F Type"].Price)}\n
   ${chevy} ${cars.Cars["2009 Corvette C6"].Name} : $${numberWithCommas(cars.Cars["2009 Corvette C6"].Price)}\n
   ${chevy} ${cars.Cars["2020 Chevy Corvette C8"].Name} : $${numberWithCommas(cars.Cars["2020 Chevy Corvette C8"].Price)}\n
   

   **`)
   embed.setThumbnail("https://i.ibb.co/wcLj4mK/cclass.png")

   const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
   try {
     for (const reaction of userReactions.values()) {
        reaction.users.remove(message.author.id);
     }
   } catch (error) {
     console.error('Failed to remove reactions.');
   }
    msg.edit(embed)

});


DClass.on('collect', r => {
  embed.fields = []
  embed.setTitle("D Class")

  embed.setFooter('Prefix is "z!"')
 .setDescription(`**
 ${nissan} ${cars.Cars["2021 Nissan GTR"].Name} : $${numberWithCommas(cars.Cars["2021 Nissan GTR"].Price)}\n
 ${porsche} ${cars.Cars["2021 Porsche 911 GT3"].Name} : $${numberWithCommas(cars.Cars["2021 Porsche 911 GT3"].Price)}\n
 ${lambo} ${cars.Cars["2014 Lamborghini Huracan"].Name} : $${numberWithCommas(cars.Cars["2014 Lamborghini Huracan"].Price)}\n
 ${audi} ${cars.Cars["2018 Audi R8"].Name} : $${numberWithCommas(cars.Cars["2018 Audi R8"].Price)}\n
 ${mclaren} ${cars.Cars["2014 McLaren 12C"].Name} : $${numberWithCommas(cars.Cars["2014 McLaren 12C"].Price)}\n
 ${ferrari} ${cars.Cars["2010 Ferrari 458 Italia"].Name} : $${numberWithCommas(cars.Cars["2010 Ferrari 458 Italia"].Price)}\n
 ${aston} ${cars.Cars["2016 Aston Martin Vulkan"].Name} : $${numberWithCommas(cars.Cars["2016 Aston Martin Vulkan"].Price)}\n
 ${mclaren} ${cars.Cars["2021 McLaren 720S"].Name} : $${numberWithCommas(cars.Cars["2021 McLaren 720S"].Price)}\n
 ${ferrari} ${cars.Cars["2021 Ferrari SF90 Stradale"].Name} : $${numberWithCommas(cars.Cars["2021 Ferrari SF90 Stradale"].Price)}\n

 **`)
 embed.setThumbnail("https://i.ibb.co/wcLj4mK/cclass.png")

 const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
 try {
   for (const reaction of userReactions.values()) {
      reaction.users.remove(message.author.id);
   }
 } catch (error) {
   console.error('Failed to remove reactions.');
 }
  msg.edit(embed)

});

EClass.on('collect', r => {
  embed.fields = []
  embed.setTitle('Dealership')
  embed.setFooter('z!buy (full car name) to buy a car')
  embed.setThumbnail("https://i.ibb.co/wWn4Vgq/dealer.png")
  embed.addField("A Class Cars", "🇦", true)
  embed.addField("B Class Cars", "🇧", true)
  embed.addField("C Class Cars", "🇨", true)
  embed.setDescription(`[Official Server](https://discord.gg/SFrujkEs5A)\n[Buy me a coffee!](https://www.buymeacoffee.com/zero2sixty)`)
 const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
 try {
   for (const reaction of userReactions.values()) {
      reaction.users.remove(message.author.id);
   }
 } catch (error) {
   console.error('Failed to remove reactions.');
 }
  msg.edit(embed)

});


    })

    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}