import { LOGIN_ENDPOINT, REFRESH_ENDPOINT, USER_AGENT } from '../config';
import { Session, Token } from '../helper/useSession';

const fakeLogin = true;
const fakeRefresh = true;

const getHeaders = (access_token?: string): Headers => {
  const headers = new Headers([
    ['Accept', 'application/json'],
    ['Accept-Language', 'de-DE'],
    ['Content-Type', 'application/json'],
    ['User-Agent', USER_AGENT]
  ]);
  if (access_token) {
    console.log('api.ts:13: using access_token: ', access_token);
    headers.set('Authorization', `Bearer ${access_token}`);
  }
  return headers;
};

export const login = async (
  email: string | undefined,
  password: string | undefined
): Promise<Session | undefined> => {
  if (!email || !password) {
    console.error(
      'You must fill email and password or access_token and user_id'
    );
    return;
  }

  try {
    let response;
    if (fakeLogin) {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(undefined);
        }, 3000);
      });
      response = {
        status: 200,
        statusText: 'Fake',
        json: () => JSON.parse(process.env.REACT_APP_LOGIN_RESPONSE || '')
      };
      console.warn('login: \n\n Fake Response!\n\n\n');
    } else {
      response = await fetch(LOGIN_ENDPOINT, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          device_type: 'UNKNOWN',
          email,
          password
        })
      });
      console.log('login: response: ', response);
    }

    if (response.status !== 200) {
      throw new Error(
        `Login failed with status ${response.status} ${response.statusText}`
      );
    }

    const json = await response.json();
    return {
      email,
      name: json.startup_data.user.name,
      user_id: json.startup_data.user.user_id,
      access_token: json.access_token,
      refresh_token: json.refresh_token
    };
  } catch (e) {
    console.error('error in login: ', e);
  }
  return undefined;
};

export const refresh = async (
  refresh_token: string
): Promise<Token | undefined> => {
  try {
    let response;
    if (fakeRefresh) {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(undefined);
        }, 3000);
      });
      response = response = {
        status: 200,
        statusText: 'Fake',
        json: () => JSON.parse(process.env.REACT_APP_LOGIN_RESPONSE || '')
      };
      console.warn('refresh: \n\n Fake Response!\n\n\n');
    } else {
      response = await fetch(REFRESH_ENDPOINT, {
        method: 'POST',
        headers: getHeaders(undefined),
        body: JSON.stringify({
          refresh_token
        })
      });
      console.log('refresh: response: ', response);
    }

    if (response.status !== 200) {
      throw new Error(
        `Refresh failed with status ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (e) {
    console.error('error in refresh: ', e);
  }
  return undefined;
};
