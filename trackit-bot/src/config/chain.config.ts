import { ChainConfig } from "@/types";
export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
    ethereum: {
        rpcUrl: process.env.ETHEREUM_RPC_URL || '',
        chainId: 1,
        name: 'Ethereum Mainnet'
    },
    bsc: {
        rpcUrl: process.env.BSC_RPC_URL || '',
        chainId: 56,
        name: 'Binance Smart Chain'
    }
    // Add more chains as needed
};