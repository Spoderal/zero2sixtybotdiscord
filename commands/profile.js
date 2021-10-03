const cars = require("../cardb.json");
const Discord = require("discord.js");
const db = require("quick.db")
const moment = require("moment")
const Canvas = require("canvas")
const profilepics = require("../pfpsdb.json")
module.exports = {
  commands: ["profile"],
  description: "Shows your stats!",
  permissionError: "",
  expectedArgs: "<car>",

  callback: async (message, arguments, text)  => {
    const canvas = Canvas.createCanvas(820, 400)
    const context = canvas.getContext('2d');
    const  background = await Canvas.loadImage('./profilepage.png');
    const badge1 = await Canvas.loadImage('./10wins.png')
    const profilepic = db.fetch(`currentpfp_${message.author.id}`) || 'Default'
    const cash = db.fetch(`cash_${message.author.id}`)
    const races = db.fetch(`pvpwon_${message.author.id}`) || 0
    const noto = db.fetch(`notoriety_${message.author.id}`) || 0
    const badges = db.fetch(`badges_${message.author.id}`)|| 0
    const title = db.fetch(`currenttitle_${message.author.id}`)|| 'Noob Racer'
    const name = message.author.username
    const avatar = await Canvas.loadImage(profilepics.Pfps[profilepic].Image);
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
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


	// Assign the decided font to the canvas
	context.font = applyText(canvas, name);
	context.fillStyle = '#ffffff';
	context.fillText(name, 150, 100);
  context.font = '35px sans-serif';

  context.fillText(`${title}`, 150, 170);

  context.font = '28px sans-serif';
  context.fillText(`Cash: $${numberWithCommas(cash)}`, 50, 350);
  context.fillText(`Races Won: ${races}`, 50, 300);
  context.fillText(`Notoreity: ${noto}`, 50, 250);
  context.fillText(`Badges: ${badges}`, 500, 100);

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