'use client';

import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { baseSepolia } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { createWagmiConfig } from '@/store/createWagmiConfig';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { UserProvider } from './context/UserContext';

type Props = { children: ReactNode };

const queryClient = new QueryClient();

const rpcUrl = '/api/rpc';

const wagmiConfig = createWagmiConfig(rpcUrl);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const thirdWebClientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!;

function OnchainProviders({ children }: Props) {
  return (
    <ThirdwebProvider clientId={thirdWebClientId}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider chain={baseSepolia}>
            {' '}
            <UserProvider>{children} </UserProvider>
          </OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThirdwebProvider>
  );
}

export default OnchainProviders;
