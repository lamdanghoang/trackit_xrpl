import { Context } from 'telegraf';

export interface BotContext extends Context {
    // Add custom context properties here
}

export interface ChainConfig {
    rpcUrl: string;
    chainId: number;
    name: string;
}