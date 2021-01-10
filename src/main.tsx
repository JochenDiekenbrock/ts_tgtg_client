import { FC, useContext, useEffect } from 'react';
import { EMAIL, PASSWORD } from './config';
import { login, refresh } from './api/api';
import { ItemsContainer } from './items-container';
import { SessionContext } from './session';
import { TransientSessionContext } from './transient-session';

export const Main: FC = () => {
  const { session, setSession } = useContext(SessionContext);
  const { transientSession, setTransientSession } = useContext(
    TransientSessionContext
  );

  useEffect(() => {
    const doLogin = async () => {
      const loginData = await login(EMAIL, PASSWORD);
      if (loginData && setSession) {
        setSession(loginData);
      } else {
        setTransientSession({ ...transientSession, loadFailed: true });
      }
    };
    const doRefresh = async (refresh_token: string) => {
      const token = await refresh(refresh_token);
      if (!token) {
        return false;
      }

      setTransientSession({ ...transientSession, loginRefreshed: true });

      if (session && setSession) {
        setSession({
          ...session,
          ...token
        });
      }
      return true;
    };

    if (session) {
      doRefresh(session.refresh_token);
    } else {
      doLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (transientSession.loadFailed) {
    return <h1>Sorry, could not load data</h1>;
  }

  if (session) {
    return (
      <>
        <h1>Hello {session.startup_data.user.name}</h1>
        <ItemsContainer />
      </>
    );
  }

  return <h1>Loading...</h1>;
};
