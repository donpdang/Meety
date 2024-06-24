import { ConnectAccount } from '@coinbase/onchainkit/wallet';
import { baseSepolia } from 'viem/chains';
import { useAccount, useChainId, useConnect, useDisconnect } from 'wagmi';
import { AccountInfoPanel } from './AccountInfoPanel';
import { useUser } from '@/context/UserContext';

/**
 * AccountConnect
 *  - Connects to the wallet
 *  - Disconnects from the wallet
 *  - Displays the wallet network
 */
function AccountConnect() {
  const { refetchUser } = useUser();
  const account = useAccount();
  const { status } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

  return (
    <div
      className="flex flex-grow text-black"
      {...(status === 'pending' && {
        'aria-hidden': true,
        style: {
          opacity: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        },
      })}
    >
      {(() => {
        if (account.status === 'disconnected') {
          return <ConnectAccount />;
        }

        if (account.status === 'connected' && chainId !== baseSepolia.id) {
          return (
            <button
              onClick={() => {
                disconnect();
                refetchUser();
              }}
              type="button"
            >
              Wrong network
            </button>
          );
        }

        return (
          <>
            <div className="flex flex-grow flex-col">
              <AccountInfoPanel />
            </div>
            {/* <div className="flex hidden md:block">
              <AccountDropdown />
            </div> */}
          </>
        );
      })()}
    </div>
  );
}

export default AccountConnect;
