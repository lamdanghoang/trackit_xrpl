import { Telegraf } from 'telegraf';
import { BotContext } from '../types';
import { logger } from '../utils/logger';
import blockchainService from '../services/blockchain.service';
import { SUPPORTED_CHAINS } from '../config/chain.config';

export function setupCommandHandlers(bot: Telegraf<BotContext>) {
    // Start command
    bot.command('start', async (ctx) => {
        try {
            await ctx.reply(
                'Welcome to the Blockchain Tracker Bot!\n' +
                'Use /status to check current chain status\n' +
                'Use /help to see all available commands'
            );
        } catch (error) {
            logger.error('Error in start command:', error);
        }
    });

    // Help command
    bot.command('help', async (ctx) => {
        try {
            await ctx.reply(
                'Available commands:\n' +
                '/start - Start the bot\n' +
                '/status - Check chain status\n' +
                '/help - Show this help message'
            );
        } catch (error) {
            logger.error('Error in help command:', error);
        }
    });

    // Status command
    bot.command('status', async (ctx) => {
        try {
            let statusMessage = 'Chain Status:\n\n';
            
            for (const [chainName, config] of Object.entries(SUPPORTED_CHAINS)) {
                try {
                    const provider = blockchainService.getProvider(chainName);
                    const blockNumber = await provider.getBlockNumber();
                    statusMessage += `${config.name}:\n`;
                    statusMessage += `Current Block: ${blockNumber}\n\n`;
                } catch (error) {
                    statusMessage += `${config.name}: Error fetching status\n\n`;
                }
            }
            
            await ctx.reply(statusMessage);
        } catch (error) {
            logger.error('Error in status command:', error);
            await ctx.reply('Error fetching chain status. Please try again later.');
        }
    });
}