import { Telegraf } from 'telegraf';
import { logger } from '../utils/logger';
import { BotContext } from '../types';
import { setupCommandHandlers } from '../handlers/command.handler';

let bot: Telegraf<BotContext>;

export async function initBot() {
    const token = process.env.BOT_TOKEN;
    if (!token) {
        throw new Error('BOT_TOKEN must be provided in environment variables');
    }

    try {
        // Initialize bot with token
        bot = new Telegraf<BotContext>(token);

        // Setup command handlers
        setupCommandHandlers(bot);

        // Handle errors
        bot.catch((err: any) => {
            logger.error('Telegram bot error:', err);
        });

        // Start bot
        await bot.launch();
        logger.info('Telegram bot started successfully');

        // Enable graceful stop
        process.once('SIGINT', () => bot.stop('SIGINT'));
        process.once('SIGTERM', () => bot.stop('SIGTERM'));

        return bot;
    } catch (error) {
        logger.error('Failed to initialize bot:', error);
        throw error;
    }
}

export function getBot() {
    if (!bot) {
        throw new Error('Bot not initialized');
    }
    return bot;
}