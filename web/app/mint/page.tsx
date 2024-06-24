'use client';

import { useUser } from '@/context/UserContext';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';
import Footer from '@/components/layout/footer/Footer';
import { Loader } from '@/components/ui/loader';
import { useWriteContracts } from 'wagmi/experimental';
import { CallStatus } from './_components/CallStatus';
import { usePaymasterBundlerContract } from './_contracts/usePaymasterBundlerContract';
import isLocal from '@/utils/isLocal';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { shortenAddress } from '@/utils/common';

// Target the Paymaster directly without a proxy if running on localhost.
// Use the Paymaster Proxy when deployed.
const isLocalEnv = isLocal();
const defaultUrl = isLocalEnv
  ? process.env.NEXT_PUBLIC_PAYMASTER_URL
  : `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}/api/paymaster-proxy`;

function MintPage() {
  const { user } = useUser();
  const { data: callID, writeContracts } = useWriteContracts();
  const contract = usePaymasterBundlerContract();
  const searchParams = useSearchParams();
  const meetAddress = searchParams.get('meet');
  const meetName = searchParams.get('name');

  if (contract.status !== 'ready') {
    console.error('Contract is not ready');
    return null;
  }

  const handleMint = () => {
    if (meetAddress) {
      writeContracts({
        contracts: [
          {
            address: contract.address,
            abi: contract.abi,
            functionName: 'safeMint',
            args: [meetAddress, 'https://arweave.net/Exset1ULmMQaER6whe9JEH3BHRfZJ_jk36XxkGITB4A'],
          },
        ],
        capabilities: {
          paymasterService: {
            url: defaultUrl,
          },
        },
      });
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col px-4 py-4 text-black">
        {!!user && (
          <div className="mt-4 flex flex-col items-center gap-4">
            <div className="text-sm">
              You met{' '}
              <a
                href={`https://etherscan.io/address/${meetAddress}`}
                target="_blank"
                rel="noreferrer"
              >
                {meetName || shortenAddress(meetAddress || '')}
              </a>{' '}
              🎉 Mint an NFT to commemorate the occasion!
            </div>
            {!callID && (
              <Button
                variant="secondary"
                onClick={() => handleMint()}
                className="transform transition-transform active:scale-75"
              >
                Mint!
              </Button>
            )}
          </div>
        )}
        {!user && (
          <div className="flex flex-col items-center">Connect wallet above to get started!</div>
        )}
        {callID && <CallStatus id={callID} />}
      </main>
      <Footer />
    </>
  );
}

export default MintPage;
