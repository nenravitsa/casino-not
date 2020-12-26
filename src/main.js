require('dotenv').config();
const { Telegraf } = require('telegraf');
const { sleep } = require('./utils/sleep');

if (!process.env.BOT_TOKEN) {
  console.error('Seems like you forgot to pass Telegram Bot Token.');
  process.exit(1);
}

const bot = new Telegraf(process.env.BOT_TOKEN);

const success = [1, 22, 43, 64]; // bars, berries, lemons, 777

bot.on('message', async ({ message, telegram }) => {
  const { dice, chat, message_id } = message;
  if (dice?.emoji === '🎰' && !success.includes(dice?.value)) {
    await sleep(2);
    telegram.deleteMessage(chat.id, message_id);
  }
});
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop());
process.once('SIGTERM', () => bot.stop());
