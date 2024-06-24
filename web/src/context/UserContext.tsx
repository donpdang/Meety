import * as React from 'react';
import { createContext, useContext } from 'react';
import { User as UserDB } from '@/lib/localDB';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export interface User {
  user?: UserDB;
  refetchUser: () => void;
}

const userContext = createContext({
  user: undefined as UserDB | undefined,
  refetchUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const account = useAccount();
  const [user, setUser] = useState<UserDB | undefined>();

  useEffect(() => {
    const addresses = account?.addresses;

    if (!!addresses?.length && addresses.some((a) => !user?.walletAddresses.includes(a))) {
      const newUser = new UserDB(addresses);
      setUser(newUser);
    }
  }, [account]);

  function refetchUser() {
    const addresses = account?.addresses;
    if (!!addresses?.length) {
      const newUser = new UserDB(addresses);
      setUser(newUser);
    }
  }

  return (
    <userContext.Provider
      value={{
        user,
        refetchUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export const useUser = () => useContext(userContext);
