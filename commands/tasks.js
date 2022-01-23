const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    commands: ['tasks'],
    callback: (message, arguments, text) => {
        let userid = message.author.id
        let cash = db.fetch(`cash_${userid}`)
        if(!cash || cash == null)  cash = 0;
        let dailytask1 = db.fetch(`dailytask1_${message.author.id}`)
        let task1 = db.fetch(`dailytask1`)
        let task2 = db.fetch(`weeklytask1`)

        let embed = new Discord.MessageEmbed()
        .setTitle(`Tasks`)
        .setDescription(`Complete daily/weekly tasks for rewards.`)
        .addField("Daily", `${task1.Task} : $${numberWithCommas(task1.Reward)}`)
        .addField("Weekly", `${task2.Task} : $${numberWithCommas(task2.Reward)}`)
        .setColor("#60b0f4")
        .setThumbnail("https://i.ibb.co/Srtk0HT/Logo-Makr-5-Db-APp.png")
       
        message.reply({embeds: [embed]})
    },
    permissions: '',
    requiredRoles: [],
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}