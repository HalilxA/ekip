const {MessageButton, MessageActionRow} = require("discord.js");
const ayarlar = require('../../Ayarlar.json')
const modsData = require('../Models/Mods.js');
const {Cevap, Register} = require('../helpers/functions.js');
module.exports.run = async(client, message, args, embed) => {
if(!message.member.permissions.has('ADMINISTRATOR')) return Cevap.yetki(message);
let data = await modsData.findOne({guildID: message.guild.id});
let buton1 = new MessageButton().setCustomId('ac').setLabel('Aç!').setStyle('PRIMARY');
let buton2 = new MessageButton().setCustomId('kapat').setLabel('Kapat!').setStyle('SECONDARY');
let buton3 = new MessageButton().setCustomId('iptal').setLabel('İptal!').setStyle('DANGER');
let row1 = new MessageActionRow().addComponents(buton1).addComponents(buton2).addComponents(buton3)
Cevap.tagsec(message, row1)
    let filter = x => x.user.id == message.member.id
    let collector = message.channel.createMessageComponentCollector({filter, time: 10000})
    collector.on('collect', async button => {
    switch(button.customId) {
    case 'ac':
    return await Register.tagac(message, button, row1) 
    break;
    case 'kapat':
   return await Register.tagkapat(message, button,row1) 
     break;
    case 'iptal':
  return  await button.message.delete().catch(e => {}) && await message.delete().catch(e => {})
    break;

    }
    })
   
    
};
exports.config = {
    name: "taglıalım",
    usage: `${ayarlar.BotPrefix}taglıalım`,
    guildOnly: true,
    aliases: ['tagmode','tagmod'],
    cooldown: 3000
};