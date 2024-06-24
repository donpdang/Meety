import { baseSepolia } from 'viem/chains';
import { generateContractHook } from '@/hooks/contracts';
import { abi } from './PaymasterBundlerABI';

export const usePaymasterBundlerContract = generateContractHook({
  abi: abi,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0x7A2CCcd7abfDde2Dc8c8e78B32507ad21f933036',
  },
});
