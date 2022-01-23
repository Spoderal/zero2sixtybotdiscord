const db = require('quick.db')
const squads = require('../squads.json')
const cars = require('../cardb.json')
module.exports = {
    commands: ['choose'],
    description: 'Shows how much money you have!',
  
    
    callback: (message, arguments, text) => {
      
    let car = arguments.splice(1).join(' ')
    let squad = arguments[0]

    if(!car) return message.channel.send("Format: z!choose [squad] [id of car]\n\nExample: z!choose skullcrunchers 1")
    if(!squad) return message.channel.send("Format: z!choose [squad] [id of car]\n\nExample: z!choose skullcrunchers 1")

    if(!squads.Squads[squad.toLowerCase()]) return message.channel.send("Thats not a squad!")

    if(!squads.Squads[squad.toLowerCase()].Members) return message.channel.send("Thats not a squad!")


            let badgesquad2 = db.fetch(`squad2beat_${message.author.id}`)
            let badgesquad3 = db.fetch(`squad3beat_${message.author.id}`)
            let badgesquad4 = db.fetch(`squad4beat_${message.author.id}`)

            let chosen2 = db.fetch(`chosen2_${message.author.id}`)
            let chosen3 = db.fetch(`chosen3_${message.author.id}`)
            let chosen4 = db.fetch(`chosen4_${message.author.id}`)

    if(squad.toLowerCase() == "skullcrunchers"){
        if(!badgesquad2) return message.channel.send("You need to beat this squad before choosing a car!")
        if(chosen2) return message.channel.send("You've already chosen a car from this squad!")
        if(car > 5) return message.channel.send("Choose a number between 1 and 5")
        if(car < 1) return message.channel.send("Choose a number between 1 and 5")
        if(car == "1"){
            message.channel.send(`You chose Dales 2004 Subaru WRX STI!`)
            db.push(`cars_${message.author.id}`, `dales 2004 subaru wrx sti`)
            db.set(`Dales 2004 Subaru WRX STIspeed_${message.author.id}`, cars.Cars["dales 2004 subaru wrx sti"].Speed)
             db.set(`Dales 2004 Subaru WRX STIresale_${message.author.id}`, cars.Cars["dales 2004 subaru wrx sti"].sellprice)
             db.set(`chosen2_${message.author.id}`, true)
            return;
        }
        else if(car == "2"){
            message.channel.send(`You chose Joes 2010 Ford Mustang!`)
            db.push(`cars_${message.author.id}`, `joes 2010 ford mustang`)
            db.set(`Joes 2010 Ford Mustangspeed_${message.author.id}`, cars.Cars["joes 2010 ford mustang"].Speed)
             db.set(`Joes 2010 Ford Mustangresale_${message.author.id}`, cars.Cars["joes 2010 ford mustang"].sellprice)
             db.set(`chosen2_${message.author.id}`, true)

            return;
        }
        else if(car == "3"){
            message.channel.send(`You chose Seans 1989 Nissan Skyline R32!`)
            db.push(`cars_${message.author.id}`, `seans 1989 nissan skyline r32`)
            db.set(`Seans 1989 Nissan Skyline R32speed_${message.author.id}`, cars.Cars["seans 1989 nissan skyline r32"].Speed)
             db.set(`Seans 1989 Nissan Skyline R32resale_${message.author.id}`, cars.Cars["seans 1989 nissan skyline r32"].sellprice)
             db.set(`chosen2_${message.author.id}`, true)

            return;
        }
         else if(car == "4"){
            message.channel.send(`You chose Ashleys 2013 Mazda Speed3!`)
            db.push(`cars_${message.author.id}`, `ashleys 2013 mazda speed3`)
            db.set(`Ashleys 2013 Mazda Speed3speed_${message.author.id}`, cars.Cars["ashleys 2013 mazda speed3"].Speed)
             db.set(`Ashleys 2013 Mazda Speed3resale_${message.author.id}`, cars.Cars["ashleys 2013 mazda speed3"].sellprice)
             db.set(`chosen2_${message.author.id}`, true)

            return;
        }
        else if(car == "5"){
            message.channel.send(`You chose Damiens 2001 Toyota Supra MK4!`)
            db.push(`cars_${message.author.id}`, `damiens 2001 toyota supra mk4`)
            db.set(`Damiens 2001 Toyota Supra MK4speed_${message.author.id}`, cars.Cars["damiens 2001 toyota supra mk4"].Speed)
             db.set(`Damiens 2001 Toyota Supra MK4resale_${message.author.id}`, cars.Cars["damiens 2001 toyota supra mk4"].sellprice)
             db.set(`chosen2_${message.author.id}`, true)

            return;
        }
    }
    else if(squad.toLowerCase() == "thespeed"){
        if(!badgesquad3) return message.channel.send("You need to beat this squad before choosing a car!")
        if(chosen3) return message.channel.send("You've already chosen a car from this squad!")

        if(car > 5) return message.channel.send("Choose a number between 1 and 5")
        if(car < 1) return message.channel.send("Choose a number between 1 and 5")
        if(car == "1"){
            message.channel.send(`You chose Madisons 2015 Lotus Exige Sport!`)
            db.push(`cars_${message.author.id}`, `madisons 2015 lotus exige sport`)
            db.set(`Madisons 2015 Lotus Exige Sportspeed_${message.author.id}`, cars.Cars["madisons 2015 lotus exige sport"].Speed)
             db.set(`Madisons 2015 Lotus Exige Sportresale_${message.author.id}`, cars.Cars["madisons 2015 lotus exige sport"].sellprice)
             db.set(`chosen3_${message.author.id}`, true)

            return;
        }
        else if(car== "2"){
            message.channel.send(`You chose Jeremys 2011 Audi RS5!`)
            db.push(`cars_${message.author.id}`, `jeremys 2011 audi rs5`)
            db.set(`Jeremys 2011 Audi RS5speed_${message.author.id}`, cars.Cars["jeremys 2011 audi rs5"].Speed)
             db.set(`Jeremys 2011 Audi RS5resale_${message.author.id}`, cars.Cars["jeremys 2011 audi rs5"].sellprice)
             db.set(`chosen3_${message.author.id}`, true)

            return;
        }
        else if(car== "3"){
            message.channel.send(`You chose Elis 2020 Audi TT RS!`)
            db.push(`cars_${message.author.id}`, `elis 2020 audi tt rs`)
            db.set(`Elis 2020 Audi TT RSspeed_${message.author.id}`, cars.Cars["elis 2020 audi tt rs"].Speed)
             db.set(`Elis 2020 Audi TT RSresale_${message.author.id}`, cars.Cars["elis 2020 audi tt rs"].sellprice)
             db.set(`chosen3_${message.author.id}`, true)

            return;
        }
         else if(car== "4"){
            message.channel.send(`You chose Xs 2012 Dodge Challenger SRT8!`)
            db.push(`cars_${message.author.id}`, `xs 2012 dodge challenger srt8`)
            db.set(`Xs 2012 Dodge Challenger SRT8speed_${message.author.id}`, cars.Cars["xs 2012 dodge challenger srt8"].Speed)
             db.set(`Xs 2012 Dodge Challenger SRT8resale_${message.author.id}`, cars.Cars["xs 2012 dodge challenger srt8"].sellprice)
             db.set(`chosen3_${message.author.id}`, true)

            return;
        }
        else if(car== "5"){
            message.channel.send(`You chose Alexs 1993 Porsche 959!`)
            db.push(`cars_${message.author.id}`, `alexs 1993 porsche 959`)
            db.set(`Alexs 1993 Porsche 959speed_${message.author.id}`, cars.Cars["alexs 1993 porsche 959"].Speed)
             db.set(`Alexs 1993 Porsche 959resale_${message.author.id}`, cars.Cars["alexs 1993 porsche 959"].sellprice)
             db.set(`chosen3_${message.author.id}`, true)

            return;
        }
    }

    else if(squad.toLowerCase() == "scrapheads"){
        if(!badgesquad4) return message.channel.send("You need to beat this squad before choosing a car!")
        if(chosen4) return message.channel.send("You've already chosen a car from this squad!")

        if(car > 5) return message.channel.send("Choose a number between 1 and 5")
        if(car < 1) return message.channel.send("Choose a number between 1 and 5")
        if(car== "1"){
            message.channel.send(`You chose Rexs 1969 Ford Mustang!`)
            db.push(`cars_${message.author.id}`, `rexs 1969 ford mustang`)
            db.set(`Rexs 1969 Ford Mustangspeed_${message.author.id}`, cars.Cars["rexs 1969 ford mustang"].Speed)
             db.set(`Rexs 1969 Ford Mustangresale_${message.author.id}`, cars.Cars["rexs 1969 ford mustang"].sellprice)
             db.set(`chosen4_${message.author.id}`, true)

            return;
        }
        else if(car == "2"){
            message.channel.send(`You chose Ryans 1990 Nissan 240SX!`)
            db.push(`cars_${message.author.id}`, `ryans 1990 nissan 240sx`)
            db.set(`Ryans 1990 Nissan 240SXspeed_${message.author.id}`, cars.Cars["ryans 1990 nissan 240sx"].Speed)
             db.set(`Ryans 1990 Nissan 240SXresale_${message.author.id}`, cars.Cars["ryans 1990 nissan 240sx"].sellprice)
             db.set(`chosen4_${message.author.id}`, true)

            return;
        }
        else if(car == "3"){
            message.channel.send(`You chose Saws 1990 BMW M3!`)
            db.push(`cars_${message.author.id}`, `saws 1990 bmw m3`)
            db.set(`Saws 1990 BMW M3speed_${message.author.id}`, cars.Cars["saws 1990 bmw m3"].Speed)
             db.set(`Saws 1990 BMW M3resale_${message.author.id}`, cars.Cars["saws 1990 bmw m3"].sellprice)
             db.set(`chosen4_${message.author.id}`, true)

            return;
        }
         else if(car == "4"){
            message.channel.send(`You chose Heathers 1967 Chevy Camaro!`)
            db.push(`cars_${message.author.id}`, `heathers 1967 chevy camaro`)
            db.set(`Heathers 1967 Chevy Camarospeed_${message.author.id}`, cars.Cars["heathers 1967 chevy camaro"].Speed)
             db.set(`Heathers 1967 Chevy Camaroresale_${message.author.id}`, cars.Cars["heathers 1967 chevy camaro"].sellprice)
             db.set(`chosen4_${message.author.id}`, true)

            return;
        }
        else if(car == "5"){
            message.channel.send(`You chose Scrappys 1973 Ferrari Dino!`)
            db.push(`cars_${message.author.id}`, `scrappys 1973 ferrari dino`)
            db.set(`Scrappys 1973 Ferrari Dinospeed_${message.author.id}`, cars.Cars["scrappys 1973 ferrari dino"].Speed)
             db.set(`Scrappys 1973 Ferrari Dinoresale_${message.author.id}`, cars.Cars["scrappys 1973 ferrari dino"].sellprice)
             db.set(`chosen4_${message.author.id}`, true)

            return;
        }
    }
     
    },
    permissions: '',
    requiredRoles: [],
  }
        