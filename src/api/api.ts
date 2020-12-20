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

const post = async (url: string, body: any): Promise<any> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: typeof body === 'string' ? body : JSON.stringify(body)
  });
  console.log('response: ', response);

  if (response.status < 200 || response.status >= 300) {
    console.error(
      `Post ${url} failed with status ${response.status} ${response.statusText}`
    );
    return;
  }

  return await response.json();
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

  if (fakeLogin) {
    console.warn('login: \n\n Fake Response!\n\n\n');
    return JSON.parse(process.env.REACT_APP_LOGIN_RESPONSE || '');
  }

  const response = await post(LOGIN_ENDPOINT, {
    device_type: 'UNKNOWN',
    email,
    password
  });

  if (!response) {
    return;
  }

  return {
    access_token: response.access_token,
    email,
    name: response.startup_data.user.name,
    refresh_token: response.refresh_token,
    refresh_time: new Date(),
    user_id: response.startup_data.user.user_id
  };
};

export const refresh = async (
  refresh_token: string
): Promise<Token | undefined> => {
  let response;
  if (fakeRefresh) {
    response = JSON.parse(process.env.REACT_APP_LOGIN_RESPONSE || '');
    console.warn('refresh: \n\n Fake Response!\n\n\n');
  } else {
    response = await post(REFRESH_ENDPOINT, {
      refresh_token
    });
  }

  if (!response) {
    return;
  }

  return { ...response, refresh_time: new Date() };
};
