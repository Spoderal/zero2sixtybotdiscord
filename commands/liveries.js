const cars = require("../cardb.json");
const {MessageEmbed, MessageButton, MessageActionRow} = require("discord.js");
const parts = require("../partsdb.json");
const db = require('quick.db')
module.exports = {
  commands: ["livery"],
  description: "Shows the stats of the car specified!",
  permissionError: "",
  expectedArgs: "<car>",

  callback: (message, arguments, text, client) => {
    const db = require("quick.db")
    let tosend = arguments[0]
    if(!tosend) return message.channel.send("Specify if you'd like to see the list of liveries (list), install a livery (install [id] [car]), uninstall your current livery (uninstall [car]), view a livery (view [id] [car]), or submit one for review (submit [car]).")
    let sendlist = ['list', 'install', 'uninstall', 'submit', 'view', 'approve']
    if(!sendlist.includes(tosend.toLowerCase())) return message.channel.send("Specify if you'd like to see the list of liveries (list), install one, (install), uninstall the current one(uninstall), view a livery(view), or submit one for review(submit).")
   
   
    if(tosend.toLowerCase() == "list"){
        message.channel.send("What car would you like to see liveries for?")
        const filter = (m = discord.Message) => {
            return m.author.id === message.author.id
        }
        let collector = message.channel.createMessageCollector({
            filter,
            max: 1,
            time: 1000 * 20
        })
        collector.on('collect', m => {
            var car = m.content.toLowerCase()
    var usercars = db.fetch(`cars_${message.author.id}`) 
    if(!cars.Cars[car]) return message.channel.send("Thats not a car!")
    let list = cars.Cars
    if(!list[car]) return message.channel.send("That isnt an available car yet! If you'd like to suggest it, use z!suggest.")
    let liveriesforcar = db.fetch(`liveries_${cars.Cars[car].Name}`) || ['None']
    if(!liveriesforcar) return message.channel.send("This car doesn't have liveries yet, if you'd like to submit one, do z!livery submit")
    let liverylist = []
    for (var i = 0; i < liveriesforcar.length; i++) {
        actliv = liveriesforcar[i]
        liverylist.push(`${actliv.id}`)
        //Do something
    }
    let embed = new MessageEmbed()
    .setTitle(`Liveries for ${cars.Cars[car].Name}`)
    .setThumbnail(cars.Cars[car].Image)
    .setColor("#60b0f4")
    .setDescription(`${liverylist.join('\n')}`)

    message.channel.send({embeds: [embed]})
    })
    }

    else  if(tosend.toLowerCase() == "submit"){
        let cartosubmit = arguments.splice(1).join(' ')
        if(!cartosubmit) return message.channel.send("Usage: z!livery submit (car)")
        let list = cars.Cars
        if(!list[cartosubmit.toLowerCase()]) return message.channel.send("That isnt an available car yet! If you'd like to suggest it, use z!suggest.")
        message.channel.send("What livery would you like to submit?")
        const filter = (m = discord.Message) => {
            return m.author.id === message.author.id
        }
        let collector = message.channel.createMessageCollector({
            filter,
            max: 1,
            time: 1000 * 30
        })
        collector.on('collect', m => {
            var linktoimg = m.attatchments
            let ImageLink
            if (m.attachments.size > 0) {
                m.attachments.forEach(attachment => {
                 ImageLink = attachment.url;

                })
                let numberlivery = db.fetch(`liverycount_${message.author.id}`) || 0
                db.add(`liverycount_${message.author.id}`, 1)
                db.add(`${cars.Cars[cartosubmit.toLowerCase()].Name}_liverytosubmit_id`, 1)
                let embed = new MessageEmbed()
                .setImage(ImageLink)
                .setDescription("Submitted for review!")
                .addField("Car", cars.Cars[cartosubmit.toLowerCase()].Name)
                .addField("ID", `${db.fetch(`${cars.Cars[cartosubmit.toLowerCase()].Name}_liverytosubmit_id`)}`)
                message.channel.send({embeds: [embed]})
                let submitchannel = client.channels.cache.get('931078225021521920')
                let row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('approve')
                        .setLabel('Approve')
                        .setStyle('PRIMARY'),
                        new MessageButton()
                        .setCustomId('deny')
                        .setLabel('Deny')
                        .setStyle('PRIMARY'),
                );
                
                submitchannel.send({embeds: [embed]})
                db.set(`${cars.Cars[cartosubmit.toLowerCase()].Name}_liverytosubmit_image`, ImageLink)
                const carlivery = {
                    id: db.fetch(`${cars.Cars[cartosubmit.toLowerCase()].Name}_liverytosubmit_id`),
                    image: db.fetch(`${cars.Cars[cartosubmit.toLowerCase()].Name}_liverytosubmit_image`)
                }

                db.push(`${cars.Cars[cartosubmit.toLowerCase()].Name}_liveriestosubmit`, carlivery)
              }
              else {
                  return message.channel.send("Specify an image!")
              }
            
    
    })
    }

    else if(tosend.toLowerCase() == "approve"){
        if(message.author.id !== "890390158241853470" && message.author.id !== "699794627095429180" && message.author.id !== "152079857793105920" && message.author.id !== "474183542797107231") return message.channel.send("You don't have permission to run this command.")
        let idtoapprove = arguments[1]
        let cartoapprove = arguments.splice(2).join(' ')
        if(!idtoapprove) return message.channel.send("Specify an id!")
        if(!cartoapprove) return message.channel.send("Specify a car!")
        let list = cars.Cars
        if(!list[cartoapprove.toLowerCase()]) return message.channel.send("That isnt an available car!")

        if(!db.fetch(`${cars.Cars[cartoapprove.toLowerCase()].Name}_liveriestosubmit`)) return message.channel.send("This car doesn't have any livery id's")

        let carid =  db.fetch(`${cars.Cars[cartoapprove.toLowerCase()].Name}_liveriestosubmit`)
        


        let filtered = carid.filter(e => e.id == idtoapprove);
    

        if(filtered == [] || filtered.length == 0 || !filtered || filtered == null) return message.channel.send("Thats not a valid ID!")
        db.push(`liveries_${cars.Cars[cartoapprove.toLowerCase()].Name}`, filtered[0])
        let embedapprove = new MessageEmbed()
        .setTitle(`Approved ${idtoapprove}`)
        .setImage(filtered[0].image)

      
        message.channel.send({embeds: [embedapprove]})
    }

    else if(tosend.toLowerCase() == "view"){
        let idtoview = arguments[1]
        let cartoview = arguments.splice(2).join(' ')
        if(!idtoview) return message.channel.send("Specify an id!")
        if(!cartoview) return message.channel.send("Specify a car!")
        let list = cars.Cars
        if(!list[cartoview.toLowerCase()]) return message.channel.send("That isnt an available car!")

        if(!db.fetch(`liveries_${cars.Cars[cartoview.toLowerCase()].Name}`)) return message.channel.send("This car doesn't have any livery id's")

        let carid =  db.fetch(`liveries_${cars.Cars[cartoview.toLowerCase()].Name}`)
        


        let filtered = carid.filter(e => e.id == idtoview);
        if(filtered == [] || filtered.length == 0 || !filtered || filtered == null) return message.channel.send("Thats not a valid ID!")
        let embedapprove = new MessageEmbed()
        .setTitle(`${idtoview}`)
        .setImage(filtered[0].image)


        message.channel.send({embeds: [embedapprove]})
    }

    else if(tosend.toLowerCase() == "install"){
        let idtoview = arguments[1]
        let cartoview = arguments.splice(2).join(' ')
        
        if(!idtoview) return message.channel.send("Specify an id!")
        if(!cartoview) return message.channel.send("Specify a car!")
        let list = cars.Cars
        if(!list[cartoview.toLowerCase()]) return message.channel.send("That isnt an available car!")

        let usercars = db.fetch(`cars_${message.author.id}`)
        if(!usercars.includes(`${cartoview.toLowerCase()}`)) return message.channel.send("You dont have that car!")

        if(!db.fetch(`liveries_${cars.Cars[cartoview.toLowerCase()].Name}`)) return message.channel.send("This car doesn't have any livery id's")

        let carid =  db.fetch(`liveries_${cars.Cars[cartoview.toLowerCase()].Name}`)
        


        let filtered = carid.filter(e => e.id == idtoview);
        if(filtered == [] || filtered.length == 0 || !filtered || filtered == null) return message.channel.send("Thats not a valid ID!")
        db.set(`${cars.Cars[cartoview.toLowerCase()].Name}livery_${message.author.id}`, filtered[0].image)
        let embedapprove = new MessageEmbed()
        .setTitle(`Installed ${idtoview}`)
        .setImage(filtered[0].image)


        message.channel.send({embeds: [embedapprove]})
    }
    else if(tosend.toLowerCase() == "uninstall"){
        let cartoview = arguments.splice(1).join(' ')
        
        if(!cartoview) return message.channel.send("Specify a car!")
        let list = cars.Cars
        if(!list[cartoview.toLowerCase()]) return message.channel.send("That isnt an available car!")
        let usercars = db.fetch(`cars_${message.author.id}`)
        if(!usercars.includes(`${cartoview.toLowerCase()}`)) return message.channel.send("You dont have that car!")

        if(!db.fetch(`liveries_${cars.Cars[cartoview.toLowerCase()].Name}`)) return message.channel.send("This car doesn't have any livery id's")

        let liverycar =  db.fetch(`${cars.Cars[cartoview.toLowerCase()].Name}livery_${message.author.id}`)
        




        if(!liverycar) return message.channel.send("This car doesn't have a livery!")
        db.delete(`${cars.Cars[cartoview.toLowerCase()].Name}livery_${message.author.id}`)

        message.channel.send(`✅ Removed livery`)
  
    }
  },
  permissions: "",
  requiredRoles: [],
};
