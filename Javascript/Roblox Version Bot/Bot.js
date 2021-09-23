const Discord = require("discord.js")
const Client = new Discord.Client()
const Http = require("axios");

const {Token, Prefix} = require("./config.json")


Client.on("message", (message) => {

    let CommandIdentifier = message.content

    function BuildEmbed(title, Description) {
        const BuiltEmbed = new Discord.MessageEmbed()
            .setTitle(title)
            .setDescription(Description)
            .setColor('#C45959')
            .setTimestamp(Date.now())
        return BuiltEmbed
    }

    if (CommandIdentifier.startsWith(Prefix + "getversion") || CommandIdentifier.startsWith(Prefix + "gv")) {
        Http.get('https://clientsettingscdn.roblox.com/v1/client-version/WindowsPlayer').then(response => {
            if (response.status == 200) {
                let ClientVersion = response["data"]["clientVersionUpload"]
                message.channel.send(BuildEmbed("Response", "**Current Roblox Version: ** `" + ClientVersion + "`"))
            } else message.channel.send("Response Status: " + response.status)
        });
    }

})

Client.on("ready", () => {
    console.log("Bot Online")
})

Client.login(Token)
