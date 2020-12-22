import React, { Dispatch, FC } from 'react';
import { Session } from './helper/models';
import { useLocalStorage } from './helper/useLocalStorage';

export const SessionContext = React.createContext<{
  session?: Session | undefined;
  setSession?: Dispatch<Session | undefined>;
}>({});

export const SessionProvider: FC = ({ children }) => {
  const [session, setSession] = useLocalStorage<Session>('session');
  return (
    <SessionContext.Provider
      value={{
        session,
        setSession
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
