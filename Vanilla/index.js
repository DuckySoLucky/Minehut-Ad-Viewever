const mineflayer = require('mineflayer');
const config = require('./config.json');
const { Client, Intents } = require("discord.js");
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

const bot = mineflayer.createBot({
  host: config.server.host,
  port: config.server.port,
  username: config.minecraft.username,
  password: config.minecraft.password,
  auth: config.minecraft.auth,
  version: false
})

bot.on('messagestr', (message, messagePosition, jsonMsg) => {
    if (message.startsWith("[AD]") && message.toLowerCase().includes("/join "+config.minecraft.server_name)) {
        console.log('Minecraft > ' + message)
        var msg = message.split("] ").pop().split(": /join")[0]
        client.channels.cache.get(config.discord.channel).send(msg)
    }
})

client.on("ready", () => {console.log('Discord > Client ready, logged in as ' + client.user.tag);});
bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn))
bot.on('spawn', () => console.log('Minecraft > Client ready, logged in as ' + bot.username))

client.login(config.discord.token);