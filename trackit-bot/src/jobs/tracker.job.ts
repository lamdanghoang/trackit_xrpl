import cron from 'node-cron';
import { logger } from '../utils/logger';
import blockchainService from '../services/blockchain.service';
import { getBot } from '../services/telegram.service';
import { SUPPORTED_CHAINS } from '../config/chain.config'

async function checkChainStatus(chainName: string) {
    try {
        const provider = blockchainService.getProvider(chainName);
        const blockNumber = await provider.getBlockNumber();
        const bot = getBot();
        
        // You can customize this message and send to specific chats
        const adminChatId = process.env.ADMIN_CHAT_ID;
        if (adminChatId) {
            await bot.telegram.sendMessage(
                adminChatId,
                `Chain Status Update - ${chainName}:\nCurrent Block: ${blockNumber}`
            );
        }
    } catch (error) {
        logger.error(`Error checking ${chainName} status:`, error);
    }
}

export function startTrackerJobs() {
    // Run status check every 5 minutes
    cron.schedule('*/5 * * * *', async () => {
        logger.info('Running chain status check job');
        for (const chainName of Object.keys(SUPPORTED_CHAINS)) {
            await checkChainStatus(chainName);
        }
    });

    logger.info('Tracker jobs started');
}