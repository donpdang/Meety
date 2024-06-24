'use client';

import { User } from '@/lib/localDB';
import isLocal from '@/utils/isLocal';
import QRCode from 'react-qr-code';

function HomePage({ user }: { user: User }) {
  const baseURL = process.env.NEXT_PUBLIC_URL;
  return (
    <>
      <div className="mt-4 flex flex-col items-center justify-center gap-12">
        <div className="text-center">Scan QR code to meet {user.name}!</div>

        <div style={{ height: 'auto', margin: '0 auto', maxWidth: 200, width: '100%' }}>
          <QRCode
            size={512}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={`${baseURL}/mint?meet=${user.walletAddresses[0]}${
              user.name ? `&name=${user.name}` : ''
            }`}
            viewBox={`0 0 512 512`}
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;
