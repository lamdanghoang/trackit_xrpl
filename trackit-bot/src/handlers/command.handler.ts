import { Telegraf } from 'telegraf';
import { BotContext } from '../types';
import { logger } from '../utils/logger';
import blockchainService from '../services/blockchain.service';
import { SUPPORTED_CHAINS } from '../config/chain.config';
import { createCompletion, loadModel } from 'gpt4all';

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
                '/assistant - Chat with AI assistant'
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

    // Status command
    bot.command('assistant', async (ctx) => {
        const model = await loadModel('mistral-7b-openorca.gguf2.Q4_0.gguf', {
            verbose: true,
            device: 'gpu',
            modelConfigFile: "models3.json"
        });   

        const prompt = "Please analyse Ripple Chain"

        const response = await createCompletion(model, prompt, { verbose: true })
        await ctx.reply(JSON.stringify(response))
    //     try {
    //         let statusMessage = 'Chain Status:\n\n';
            
    //         for (const [chainName, config] of Object.entries(SUPPORTED_CHAINS)) {
    //             try {
    //                 const provider = blockchainService.getProvider(chainName);
    //                 const blockNumber = await provider.getBlockNumber();
    //                 statusMessage += `${config.name}:\n`;
    //                 statusMessage += `Current Block: ${blockNumber}\n\n`;
    //             } catch (error) {
    //                 statusMessage += `${config.name}: Error fetching status\n\n`;
    //             }
    //         }
            
    //         await ctx.reply(statusMessage);
    //     } catch (error) {
    //         logger.error('Error in status command:', error);
    //         await ctx.reply('Error fetching chain status. Please try again later.');
    //     }
    // });
    })
}