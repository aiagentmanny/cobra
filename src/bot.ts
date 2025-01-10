import { Client, GatewayIntentBits } from 'discord.js';
import { getTopCryptos } from './services/cryptoService';

// Set up the Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Set up the bot token (make sure it's in your .env file)
const BOT_TOKEN = process.env.BOT_TOKEN || 'your-bot-token';

// When the bot is ready, log in and listen for messages
client.once('ready', () => {
  console.log('Bot is online!');
});

// Listen for messages and respond with crypto data
client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!crypto')) {
    try {
      console.log('Fetching top 10 cryptocurrencies for Discord...');
      const cryptoData = await getTopCryptos();
      let response = 'Top 10 Cryptocurrencies:\n';
      cryptoData.forEach((crypto: any) => {
        response += `${crypto.name}: $${crypto.quote.USD.price.toFixed(2)}\n`;
      });
      message.reply(response);
    } catch (error: unknown) {
      console.error('Error occurred while fetching crypto data for Discord');
      message.reply('There was an error while fetching crypto data.');
    }
  }
});

// Log in with your bot token
client.login(BOT_TOKEN);
