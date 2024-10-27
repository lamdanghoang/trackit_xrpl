import { ChainConfig } from "@/types";
export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
    ethereum: {
        rpcUrl: process.env.XRP_EVM_RPC_URL || 'https://rpc-evm-sidechain.xrpl.org',
        chainId: 1440002,
        name: 'EVM XRP Sidechain'
    },
    bsc: {
        rpcUrl: process.env.XRP_RPC_URL || '',
        chainId: 56,
        name: 'Ripple L1'
    }
    // Add more chains as needed
};