import { useEffect, useState } from 'react';
import { EMAIL, PASSWORD } from './config';
import { login } from './api/api';
import { useSession } from './helper/useSession';

export const Main = (): JSX.Element => {
  const [loginData, setLoginData] = useSession();
  const [loadFailed, setLoadFailed] = useState(false);

  console.log('main.tsx:8: loginData: ', loginData);
  useEffect(() => {
    const doLogin = async () => {
      const loginData = await login(EMAIL, PASSWORD);
      if (loginData) {
        console.log('main.tsx:15: loginData: ', loginData);
        setLoginData(loginData);
      } else {
        setLoadFailed(true);
      }
    };

    if (!loginData) {
      doLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let component = <h1>Loading...</h1>;
  if (loadFailed) {
    component = <h1>Sorry, could not load data</h1>;
  } else if (loginData) {
    component = <h1>Hello {loginData?.name}</h1>;
  }

  return component;
};
