const discord = require('discord.js')
module.exports = {
    commands: ['ping'],
    callback: async (message, arguments, text, client) => {

      
      const msg = await message.channel.send("Pinging...");
      const Embed = new discord.MessageEmbed()
        .setTitle("Pong!")
        .setAuthor(`${message.author.username}` , message.author.displayAvatarURL())
        .setDescription(
          `Latency is ${Math.floor(
            msg.createdTimestamp - message.createdTimestamp
          )}ms\n\nPing is ${Math.round(message.client.ws.ping)}ms`
        )
        .setColor('#fb644c');
        
      msg.edit({embeds: [Embed]});
    
      
    },
    permissions: '',
    requiredRoles: [],
  }