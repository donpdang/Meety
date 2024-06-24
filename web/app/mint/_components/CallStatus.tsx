import { Loader } from '@/components/ui/loader';
import { useEffect, useState } from 'react';
import { useCallsStatus, UseCallsStatusReturnType } from 'wagmi/experimental';

type CallStatusData = {
  state: {
    data?: {
      status?: string;
    };
  };
};

type CallStatusProps = {
  id: string;
};

/**
 * CallStatus uses the call id to fetch and display the status of a writeContracts call.
 *
 * @returns {JSX.Element} A div element displaying the current status of the call or "loading" if the status is not yet available.
 */
export function CallStatus({ id }: CallStatusProps): JSX.Element {
  const [tokenId, setTokenId] = useState<number | undefined>();

  const { data: callsStatus } = useCallsStatus({
    id,
    query: {
      refetchInterval: (data: CallStatusData) =>
        data.state.data?.status === 'CONFIRMED' ? false : 1000,
    },
  }) as UseCallsStatusReturnType;

  useEffect(() => {
    function run() {
      if (callsStatus?.receipts?.length) {
        for (const receipt of callsStatus.receipts) {
          const logs = receipt.logs;
          if (logs.length > 2) {
            const theLog = logs[2];
            // Convert hex number of decimal
            const hexValue = theLog.data;
            const mintedTokenId = parseInt(hexValue, 16);
            setTokenId(mintedTokenId);
          }
        }
      }
    }
    run();
  }, [callsStatus]);

  return (
    <div className="mt-4 flex items-center justify-center">
      {callsStatus?.status === 'CONFIRMED' && tokenId ? (
        <div>
          NFTs Minted 🎉🎉. Check it out{' '}
          <a
            href={`https://testnets.opensea.io/assets/base-sepolia/0x7a2cccd7abfdde2dc8c8e78b32507ad21f933036/${tokenId}`}
            target="_blank"
            rel="noreferrer"
          >
            here!
          </a>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
