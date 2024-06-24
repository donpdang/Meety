import { useCallback } from 'react';
import { Avatar, Name } from '@coinbase/onchainkit/identity';
import { ExitIcon } from '@radix-ui/react-icons';
import { useAccount, useDisconnect } from 'wagmi';
import { Avatar as UIAvatar, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';

export function AccountInfoPanel() {
  const { user, refetchUser } = useUser();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  if (!address) return null;

  return (
    <div className="flex flex-row items-center justify-center">
      <div className=" inline-flex items-center justify-start gap-2">
        {user?.profileUrl && (
          <Link href="/">
            <UIAvatar className="mx-auto h-10 w-10 text-black hover:opacity-50">
              <AvatarImage alt="Doodles Project Gray" src={user.profileUrl} className="cover" />
            </UIAvatar>
          </Link>
        )}
        {!user?.profileUrl && <Avatar address={address} className="h-10 w-10 rounded-full" />}
        <div className="inline-flex flex-col items-start justify-center gap-1">
          <div className="font-inter w-32 text-base font-medium text-black">
            <Name address={address} />
          </div>
          {/* <span className="font-inter w-32 text-sm font-medium text-zinc-400">
            <Name address={address} showAddress />
          </span> */}
        </div>
      </div>

      <button
        type="button"
        aria-label="Disconnect"
        className="inline-flex items-center justify-between self-stretch"
        onClick={handleDisconnectWallet}
      >
        <ExitIcon className="relative h-4 w-4 text-black" />
      </button>
    </div>
  );
}
