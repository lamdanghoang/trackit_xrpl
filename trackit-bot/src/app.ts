import dotenv from 'dotenv';
import { initBot } from './services/telegram.service';
import { setupBlockchainListeners } from './services/blockchain.service';
import { logger } from './utils/logger';
import { startTrackerJobs } from './jobs/tracker.job';

// Load environment variables
dotenv.config();

async function main() {
    try {
        // Initialize Telegram bot
        await initBot();

        // Setup blockchain listeners
        await setupBlockchainListeners();

        // Start tracker jobs
        // startTrackerJobs();

        logger.info('Bot successfully started');
    } catch (error) {
        logger.error('Error starting bot:', error);
        process.exit(1);
    }
}

main();