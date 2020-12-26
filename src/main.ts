require('dotenv').config();
import { Telegraf } from 'telegraf';

if (!process.env.BOT_TOKEN) {
  console.error('Seems like you forgot to pass Telegram Bot Token.');
  process.exit(1);
}

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('oldschool', (ctx) => ctx.reply('Hello'));
bot.command('modern', ({ reply }) => reply('Yo'));
bot.command('hipster', Telegraf.reply('λ'));
bot.on('message', (ctx) => ctx.telegram.sendCopy(ctx.chat.id, ctx.message));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop());
process.once('SIGTERM', () => bot.stop());