import { useEffect, useState } from 'react';
import { EMAIL, PASSWORD } from './config';
import { login, LoginData } from './api/api';

export const Main = (): JSX.Element => {
  const [loginData, setLoginData] = useState<LoginData | undefined>();
  useEffect(() => {
    (async () => {
      const loginData = await login(EMAIL, PASSWORD);
      setLoginData(loginData);
    })();
  }, []);
  return loginData ? <h1>Hallo {loginData?.name}</h1> : <h1>Loading...</h1>;
};
