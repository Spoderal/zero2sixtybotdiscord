const { prefix } = require('../config.json')
const { MessageEmbed, MessageReaction } = require('discord.js')


module.exports = {
    commands: ['help'],
    callback: (message, arguments, text) => {
    const embed = new MessageEmbed()
    embed.setTitle('Help Menu')
    embed.setFooter('Prefix is "z!"')
    embed.setThumbnail("https://i.ibb.co/4dxPJB7/help.png")
    embed.addField(" Main Commands", "🔴", true)
    embed.addField(" Profile Commands", "🟠", true)
    embed.addField(" Modify Commands", "🟡", true)
    embed.addField(" Junkyard Commands", "🟢", true)
    embed.setDescription(`**SOMETIMES THE BOT WILL BUG AND CRASH, IF IT SAYS YOU ARE ALREADY RACING, JOIN THE SUPPORT SERVER, WORKING ON A[Official Server](https://discord.gg/SFrujkEs5A)\n[Buy me a coffee!](https://www.buymeacoffee.com/zero2sixty)\n**Type z!updatelog for the new update!**`)

    message.channel.send(embed).then(msg => {
    msg.react('🔴')
    msg.react('🟠')
    msg.react('🟡')
    msg.react('🟢')
    msg.react('⬅️')

    const AFilter = (reaction, user) => reaction.emoji.name === '🔴' && user.id === message.author.id;
    const BFilter = (reaction, user) => reaction.emoji.name === '🟠' && user.id === message.author.id;
    const CFilter = (reaction, user) => reaction.emoji.name === '🟡' && user.id === message.author.id;
    const DFilter = (reaction, user) => reaction.emoji.name === '🟢' && user.id === message.author.id;
    const EFilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;


    const AClass = msg.createReactionCollector(AFilter, {time: 60000});
    const BClass = msg.createReactionCollector(BFilter, {time: 60000});
    const CClass = msg.createReactionCollector(CFilter, {time: 60000});
    const DClass = msg.createReactionCollector(DFilter, {time: 60000});
    const EClass = msg.createReactionCollector(EFilter, {time: 60000});


    AClass.on('collect', r => {
      embed.fields = []

      embed.setTitle('Main Help')
      embed.setFooter('Prefix is "z!"')
      embed.setDescription(`**\nbal = Shows how much money you have.\n
      botrace <bot> <full name of your car> = Race a bot.\n
      buy <full name of car> = Buys a car/part. Example: z!buy 1995 Mazda Miata/z!buy Magna Flow AxleBack Performance Exhaust\n
      dealership = Lists the current available cars.\n
      garage = Shows your cars and parts.\n
      help = Describes all of this bot's commands.\n**
      race <@user> <full name of your car> = Race another user.\n
      sell <full name of car> = Sell a car.\n
      stats <full name of car> = Show base stats of car.\n
      start = Start the game, you cant do anything without starting.\n
      **
      `)
                  
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
      embed.setTitle("Profile Help")

      embed.setFooter('Prefix is "z!"')
     .setDescription(`**mystats = Shows your profile stats.\n
     open <crate> = Opens a crate.\n
     crates = Lists the current available crates.\n
     pfps = Shows the profile pictures you own.\n
     setpfp <profile picture name> = Sets your profile page picture.\n
     settitle <title name> = Sets your title\n
         **
     `)
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
    embed.setTitle("Modifying Help")

    embed.setFooter('Prefix is "z!"')
   .setDescription(`**mycar = Shows your cars stats.\n
   part <part no spaces> = Shows the stats of the part specifed.\n
   parts = Shows all the purchasable parts.\n
   buy <part no spaces> = Buy a part from the parts shop.\n
   modify <part full name no spaces> <car full name> = Add a part to your car.\n
   removepart <part full name no spaces> <car full name> = Sell a part on your car.\n 
**
   `)
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
  embed.setTitle("Junkyard Help")

  embed.setFooter('Prefix is "z!"')
 .setDescription(`**junkyard = Search the junkyard by clicking the magnifying glass.\n
 junk <junk car full name> = Show your progress on the junk car specified.\n
 restore <part> <junk car full name> =  Restore the part specified on the junk car specified.\n

 Tutorial:

 z!junkyard
 React
 Find car (Ex: 1971 Datsun 240Z)
 z!junkyard
 Find parts for car
 Restore said parts on car (z!restore Engine 1971 Datsun 240Z)
 When all parts are restored, type z!restore Finish (car) and your car is now in your garage, and it is modifiable and raceable.
**
 `)
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
  embed.setTitle('Help Menu')
  embed.setFooter('Prefix is "z!"')
  embed.setThumbnail("https://i.ibb.co/McnXxm4/help.png")
  embed.addField(" Main Commands", "🔴", true)
  embed.addField(" Profile Commands", "🟠", true)
  embed.addField(" Modify Commands", "🟡", true)
  embed.addField(" Junkyard Commands", "🟢", true)
  embed.setDescription(`[Official Server](https://discord.gg/SFrujkEs5A)\n[Buy me a coffee!](https://www.buymeacoffee.com/zero2sixty)\n**Type z!updatelog for the new update!**`)
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