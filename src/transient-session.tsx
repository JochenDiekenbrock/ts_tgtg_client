import React, { Dispatch, FC, useState } from 'react';
import { TransientSession } from './helper/models';

const initialSession = { loginRefreshed: false, loadFailed: false };
export const TransientSessionContext = React.createContext<{
  transientSession: TransientSession;
  setTransientSession: Dispatch<TransientSession>;
}>({
  transientSession: { ...initialSession },
  setTransientSession: (session) => {
    console.log('transient-session.tsx:13: session: ', session);
  }
});

export const TransientSessionProvider: FC = ({ children }) => {
  const [transientSession, setTransientSession] = useState({
    ...initialSession
  });

  return (
    <TransientSessionContext.Provider
      value={{
        transientSession,
        setTransientSession
      }}
    >
      {children}
    </TransientSessionContext.Provider>
  );
};
