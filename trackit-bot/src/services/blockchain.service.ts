import { ethers } from 'ethers';
import { logger } from '../utils/logger';
import { getBot } from './telegram.service';
import { SUPPORTED_CHAINS } from '../config/chain.config';

class BlockchainService {
    private providers: Map<string, ethers.Provider> = new Map();
    private listeners: Map<string, Function> = new Map();

    constructor() {
        this.initializeProviders();
    }

    private initializeProviders() {
        Object.entries(SUPPORTED_CHAINS).forEach(([chainName, config]) => {
            try {
                const provider = new ethers.JsonRpcProvider(config.rpcUrl);
                this.providers.set(chainName, provider);
                logger.info(`Initialized provider for ${chainName}`);
            } catch (error) {
                logger.error(`Failed to initialize provider for ${chainName}:`, error);
            }
        });
    }

    private async setupBlockListener(chainName: string, provider: ethers.Provider) {
        provider.on('block', async (blockNumber: number) => {
            try {
                const block = await provider.getBlock(blockNumber);
                if (block) {
                    logger.info(`New block on ${chainName}: ${blockNumber}`);
                    // You can add custom logic here to track specific events/transactions
                }
            } catch (error) {
                logger.error(`Error processing block on ${chainName}:`, error);
            }
        });
    }

    public async setupBlockchainListeners() {
        for (const [chainName, provider] of this.providers.entries()) {
            try {
                await this.setupBlockListener(chainName, provider);
                logger.info(`Setup blockchain listener for ${chainName}`);
            } catch (error) {
                logger.error(`Failed to setup listener for ${chainName}:`, error);
            }
        }
    }

    public getProvider(chainName: string): ethers.Provider {
        const provider = this.providers.get(chainName);
        if (!provider) {
            throw new Error(`Provider not found for chain: ${chainName}`);
        }
        return provider;
    }
}

const blockchainService = new BlockchainService();
export const setupBlockchainListeners = () => blockchainService.setupBlockchainListeners();
export default blockchainService;