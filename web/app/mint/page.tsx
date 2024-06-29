'use client';

import { useUser } from '@/context/UserContext';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import { useWriteContracts } from 'wagmi/experimental';
import { CallStatus } from './_components/CallStatus';
import { usePaymasterBundlerContract } from './_contracts/usePaymasterBundlerContract';
import isLocal from '@/utils/isLocal';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { shortenAddress } from '@/utils/common';
import { Suspense, useEffect, useState } from 'react';
import { formatDate } from '@/utils/common';
import { Loader } from '@/components/ui/loader';
import ProfileSetUp from '@/components/Pages/ProfileSetUp';

// Target the Paymaster directly without a proxy if running on localhost.
// Use the Paymaster Proxy when deployed.
const isLocalEnv = isLocal();
const defaultUrl = isLocalEnv
  ? process.env.NEXT_PUBLIC_PAYMASTER_URL
  : `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}/api/paymaster-proxy`;

function MintPage() {
  const { user } = useUser();
  const [metadataUrl, setMetadataUrl] = useState('');

  const { data: callID, writeContracts } = useWriteContracts();
  const contract = usePaymasterBundlerContract();
  const searchParams = useSearchParams();
  const meetAddress = searchParams.get('meet');
  const meetName = searchParams.get('name');
  const pfp = searchParams.get('pfp');

  useEffect(() => {
    // upload metadata to ipfs
    if (!metadataUrl.length && user?.name) {
      async function success(position: GeolocationPosition) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Upload image media to ipfs
        const responseMedia = await fetch('/api/metadata/media', {
          method: 'POST',
          body: JSON.stringify({
            url: `${
              process.env.NEXT_PUBLIC_URL
            }/api/image?lat=${latitude}&long=${longitude}&name1=${
              meetName || shortenAddress(user?.walletAddresses[0] || '')
            }&name2=${user?.name}&pfp1=${encodeURIComponent(pfp || '')}&pfp2=${encodeURIComponent(
              user?.profileUrl || '',
            )}&date=${formatDate(new Date())}&time=${formatDate(new Date(), false, true)}`,
          }),
        });
        const responseMediaData = await responseMedia.json();
        const imageUrl = responseMediaData.url;

        const response = await fetch('/api/metadata', {
          method: 'POST',
          body: JSON.stringify({
            name: `${meetName || shortenAddress(meetAddress || '')} met ${
              user?.name || shortenAddress(user?.walletAddresses[0])
            } 🎉`,
            description: `A commemorative meetup between ${
              meetName || shortenAddress(user?.walletAddresses[0])
            } and ${user?.name || shortenAddress(user?.walletAddresses[0])}!`,
            lat: latitude || 'unknown',
            long: longitude || 'unknown',
            date: new Date().toISOString(),
            image: imageUrl,
          }),
        });
        const data = await response.json();
        setMetadataUrl(data.metadata);
        console.log('the metadata url', data.metadata);
      }

      function error() {
        console.log('Unable to retrieve your location');
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log('Geolocation not supported');
      }
    }
  }, [user]);

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
            args: [meetAddress, metadataUrl],
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
      <Suspense>
        <Header />
        {user && !user.name && <ProfileSetUp user={user} />}
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
                  {meetName || shortenAddress(meetAddress ?? '')}
                </a>{' '}
                🎉 Mint an NFT to commemorate the occasion!
              </div>
              {!callID && metadataUrl && (
                <Button
                  variant="secondary"
                  onClick={() => handleMint()}
                  className="transform transition-transform active:scale-75"
                >
                  Mint!
                </Button>
              )}
              {!metadataUrl && user.name && <Loader />}
            </div>
          )}
          {!user && (
            <div className="flex flex-col items-center">Connect wallet above to get started!</div>
          )}
          {callID && <CallStatus id={callID} />}
        </main>
        <Footer />
      </Suspense>
    </>
  );
}

export default MintPage;
