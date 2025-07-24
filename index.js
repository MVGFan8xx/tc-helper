const discord = require("discord.js");
const client = new discord.Client({ intents: ["GuildMessages", "GuildMembers", "Guilds", "MessageContent"] });
const config = require("./config.json");
const token = process.env.TOKEN;
const prefix = config.prefix;

client.login(token)


client.on("ready", async readyclient => {
    console.log(`${readyclient.user.tag} is ready`)
})

function isCommand(command, message) {
    let msg = message.content.toLowerCase();
    let cmd = command.toLowerCase()
    return msg.startsWith(prefix + cmd)
}



function sendError(err, msg) {
    let embed = createErrorEmbed(err);
    msg.reply({ embeds: [embed] });
}

function sendWrongSyntax(err, syntax, msg) {
    let embed = new discord.EmbedBuilder();
    embed.setTitle("WRONG/MISSING SYNTAX")
    embed.addFields(
        {
            name: 'Error',
            value: err.toString(),
            inline: false
        },
        {
            name: "Format",
            value: `\`${syntax}\``,
            inline: false
        }
    );

    embed.setColor("Red");
    msg.reply({ embeds: [embed] });
}

function sendInsufficientPermission(current, msg) {
    let embed = new discord.EmbedBuilder();
    embed.setTitle("Insufficient Permission")
        .setDescription("You are not permitted to run this command.")
    embed.addFields(
        {
            name: 'Required Rank',
            value: current.toString(),
            inline: true
        }
    );

    embed.setColor("Red");
    msg.reply({ embeds: [embed] });
}

const express = require('express')
const app = express()
const port = process.env.PORT || 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    const args = message.content.split(' ');

    if (isCommand("test", message)) {
        message.reply("Test successful")
    }
    if(isCommand("exit",message)) {
        if(message.member.id == "424895323660484610"){
            process.exit(1);
        }
    }
});

client.on("guildMemberAdd",async member => {
    member.roles.add(await member.guild.roles.fetch("997185740276510720"));
})

process.on('exit', async (code) => {
    await client.destroy();
  });