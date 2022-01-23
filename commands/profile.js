const cars = require("../cardb.json");
const Discord = require("discord.js");
const db = require("quick.db")
const moment = require("moment")
const Canvas = require("canvas")
const profilepics = require("../pfpsdb.json")
const badgedb = require("../badgedb.json")
module.exports = {
  commands: ["profile"],
  description: "Shows your stats!",
  permissionError: "",
  expectedArgs: "<car>",

  callback: async (message, arguments, text)  => {
    const canvas = Canvas.createCanvas(820, 400)
    const context = canvas.getContext('2d');
    let defaultprofile = "./profilepage.png"
    let user = message.mentions.users.first() || message.author
    let profilepage = db.fetch(`profilepagebg_${user.id}`) || defaultprofile
    const  background = await Canvas.loadImage(profilepage);

    let profilepic = db.fetch(`currentpfp_${user.id}`) || 'Default'
    let tolowerpic = profilepic.toLowerCase() 
    let realpic = profilepics.Pfps[tolowerpic].Image
    let cash = db.fetch(`cash_${user.id}`) || 0
    let wins = db.fetch(`wins_${user.id}`) || 0
    let loses = db.fetch(`loses_${user.id}`) || 0
    let noto = db.fetch(`notoriety_${user.id}`) || 0
    let badges = db.fetch(`badges_${user.id}`)|| 0
    let badge100wins = db.fetch(`100racebadge_${user.id}`)
    let badge1mcash = db.fetch(`millionbadge_${user.id}`)
    let badge10cars = db.fetch(`10carsbadge_${user.id}`)
    let badgehow = db.fetch(`badgehow_${user.id}`)
    let badgeask = db.fetch(`badgejustask_${user.id}`)
    let badgedriftking = db.fetch(`driftkingbadge_${user.id}`)
    let badgesquad1 = db.fetch(`squad1beat_${user.id}`)
    let badgesquad2 = db.fetch(`squad2beat_${user.id}`)
    let badgesquad3 = db.fetch(`squad3beat_${user.id}`)
    let badgesquad4 = db.fetch(`squad4beat_${user.id}`)
    let badgesquad5 = db.fetch(`squad5beat_${user.id}`)

    let drifttraining = db.fetch(`drifttraining_${user.id}`)
    let title = db.fetch(`currenttitle_${user.id}`) || 'Noob Racer'
    let realtitle = profilepics.Pfps.Titles[title]
    let name = user.username
    let avatar = await Canvas.loadImage(realpic);
    let badgeflame = await Canvas.loadImage(badgedb["Flamehouse"].Image)
    let badgeskull = await Canvas.loadImage(badgedb["Skullcrunchers"].Image)
    let badgespeed = await Canvas.loadImage(badgedb["Thespeed"].Image)
    let badgescrap = await Canvas.loadImage(badgedb["Scrapheads"].Image)
    let badgecop = await Canvas.loadImage(badgedb["Police"].Image)

    let emptybadge =  await Canvas.loadImage("https://i.ibb.co/s3HkzHZ/Logo-Makr-3ydra-C.png");
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.drawImage(emptybadge, 500, 100, 75, 75);
    context.drawImage(emptybadge, 600, 100, 75, 75);
    context.drawImage(emptybadge, 700, 100, 75, 75);
    context.drawImage(emptybadge, 500, 200, 75, 75);
    context.drawImage(emptybadge, 600, 200, 75, 75);
    context.drawImage(emptybadge, 700, 200, 75, 75);


  
    if(badgesquad1){
      context.drawImage(badgeflame, 500, 100, 75, 75);
    }
    if(badgesquad2){
      context.drawImage(badgeskull, 600, 100, 75, 75);
    }
    if(badgesquad3){
      context.drawImage(badgespeed, 700, 100, 75, 75);
    }
    if(badgesquad4){
      context.drawImage(badgescrap, 500, 200, 75, 75);
    }
    if(badgesquad5){
      context.drawImage(badgecop, 600, 200, 75, 75);
    }
    context.strokeStyle = '#0099ff';
    context.strokeRect(0, 0, canvas.width, canvas.height);
    // Pick up the pen

  const applyText = (canvas, text) => {
    const context = canvas.getContext('2d');
  
    // Declare a base size of the font
    let fontSize = 70;
  
    do {
      // Assign the font to the context and decrement it so it can be measured again
      context.font = `${fontSize -= 10}px sans-serif`;
      // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (context.measureText(text).width > canvas.width - 300);
  
    // Return the result to use in the actual canvas
    return context.font;
  };
  
	// Actually fill the text with a solid color
	// ...
let winint = parseInt(wins)
let loseint = parseInt(loses)

let ratio = 8/6
if(isNaN(ratio)){
  ratio = 0
}
	// Assign the decided font to the canvas
	context.font = applyText(canvas, name);
	context.fillStyle = '#ffffff';
	context.fillText(name, 150, 100);
  context.font = '35px sans-serif';

  context.fillText(`${realtitle}`, 150, 170);

  context.font = '28px sans-serif';
  context.fillText(`Cash: $${abbreviateNumber(cash)}`, 50, 350);
  context.fillText(`Win/Lose: ${wins}:${loses}`, 275, 350);
  context.fillText(`Notoreity: ${abbreviateNumber(noto)}`, 50, 250);
  if(drifttraining >= 1){
    context.fillText(`Drift Level: ${abbreviateNumber(drifttraining)}`, 275, 250);

  }
  context.font = '45px sans-serif';

  context.fillText(`Squads Beat`, 510, 60);
    context.drawImage(avatar, 25, 25, 100, 100);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profilepage.png');

   
    message.reply({ files: [attachment] })
      
  
  },
  permissions: "",
  requiredRoles: [],
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function abbreviateNumber(value) {
  var newValue = value;
  if (value >= 1000) {
      var suffixes = ["", "k", "m", "b","t"];
      var suffixNum = Math.floor( (""+value).length/3 );
      var shortValue = '';
      for (var precision = 2; precision >= 1; precision--) {
          shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
          var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
          if (dotLessShortValue.length <= 2) { break; }
      }
      if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
      newValue = shortValue+suffixes[suffixNum];
  }
  return newValue;
}