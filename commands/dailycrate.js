const Discord = require("discord.js")
const cars = require('../cardb.json')
const db = require('quick.db')
const ms = require('pretty-ms')
const cratedb = require('../cratedb.json')
const lodash = require('lodash')

module.exports = {
    commands: ['dailycrate'],
    callback: (message, arguments, text) => {
        let daily = db.fetch(`dailycrate_${message.author.id}`)
        let premium = db.fetch(`premium_${message.author.id}`)
        if(!premium == true) return message.channel.send("You don't have fast! Find out about it with z!fast")
        let cratecontents = cratedb.Crates.Premium.Contents
        let craterarecontents = cratedb.Crates.Premium.RareContents

        let finalcontent
        let randomcommon = lodash.sample(cratecontents)
        let randomrare = lodash.sample(craterarecontents)

        let between = lodash.random(3)
        console.log(between)
        if(between == 1 || between == 2 || between == 0){
            finalcontent = randomcommon
        }
        else if(between == 3){
            finalcontent = randomrare

        }
        let timeout = 86400000;

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));
            let timeEmbed = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You've already collected your daily crate\n\nCollect it again in ${time} hours.`);
            message.channel.send({embeds: [timeEmbed]})
        }
        else{
         
        db.set(`dailycrate_${message.author.id}`, Date.now())
        let embed = new Discord.MessageEmbed()
        .setTitle(`Daily Crate for ${message.author.username}`)
        .addField("Earned Item", `${finalcontent}`)
        message.channel.send({embeds: [embed]})


        if(finalcontent == "2000 Cash"){
            db.add(`cash_${message.author.id}`, 2000)
        }
        else if(finalcontent == "1000 Cash"){
            db.add(`cash_${message.author.id}`, 1000)

        }
        else if(finalcontent == "5000 Cash"){
            db.add(`cash_${message.author.id}`, 5000)

        }
        else if(finalcontent == "T1Intake"){
            db.push(`parts_${message.author.id}`, "T1Intake")

        }
        else if(finalcontent == "T1DriftTires"){
            db.push(`parts_${message.author.id}`, "T1DriftTires")

        }
        else if(finalcontent == "2008 Nissan 350Z"){
            db.push(`cars_${message.author.id}`, "2008 Nissan 350Z")
            db.set(`2008 Nissan 350Zspeed_${message.author.id}`, cars.Cars["2008 Nissan 350Z"].Speed)
            db.set(`2008 Nissan 350Zresale_${message.author.id}`, cars.Cars["2008 Nissan 350Z"].sellprice)
        }
        else if(finalcontent == "1995 Honda Civic Hatch Si"){
            db.push(`cars_${message.author.id}`, "1995 Honda Civic Hatch Si")
            db.set(`1995 Honda Civic Hatch Sispeed_${message.author.id}`, cars.Cars["1995 Honda Civic Hatch Si"].Speed)
            db.set(`1995 Honda Civic Hatch Siresale_${message.author.id}`, cars.Cars["1995 Honda Civic Hatch Si"].sellprice)
        }
        }

    },
    permissions: '',
    requiredRoles: [],
  }