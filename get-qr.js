//https://github.com/RAVANA-SL/slRavana

const chalk = require('chalk');
const {WAConnection, MessageOptions, MessageType} = require('@adiwajshing/baileys');
const {StringSession} = require('./DataBase/');
const fs = require('fs');

async function Ravana () {
    const conn = new WAConnection();
    const Session = new StringSession();  
    conn.version = [3, 3234, 9]
    conn.logger.level = 'warn';
    conn.regenerateQRIntervalMs = 50000;
    
    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Ravana')}${chalk.blue.bold('Whatsapp-Bot')}
${chalk.white.italic('Ravana Bailyes-Api')}

${chalk.blue.italic('📶 Connecting to Whatsapp Web... Please Wait ❗')}`);
    });
    

    conn.on('open', async () => {
        var st = Session.createStringSession(conn.base64EncodedAuthInfo());
        console.log(
            chalk.green.bold('Ravana Bailyes-Api: '), Session.createStringSession(conn.base64EncodedAuthInfo())
        );
        
        if (!fs.existsSync('./config.env')) {
            fs.writeFileSync('./config.env', `RAVANA_SESSION="${st}"`);
        }
        if (conn.user.jid.startsWith('94')) {
            await conn.sendMessage(conn.user.jid,st, MessageType.text)
            await conn.sendMessage(conn.user.jid,'*Do Not Share This Code With Anyone ❗*\n*මෙය කිසිවෙකු සමඟ බෙදා නොගන්න ❗*', MessageType.text)
            console.log(
                chalk.blue.bold('If you are installing locale type npm start to bot, now you can start the bot.\nRavana Bot')
            );
        }
        else {
            await conn.sendMessage(conn.user.jid,st, MessageType.text)
            await conn.sendMessage(conn.user.jid,'*Do Not Share This Code With Anyone ❗*', MessageType.text)
            console.log(
                chalk.blue.bold('If you are installing locale, now you can start the bot.\nRavana Bot')
            );
        }
        
        process.exit(0);
    });

    await conn.connect();
}

Ravana()
