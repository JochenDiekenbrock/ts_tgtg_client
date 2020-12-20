import { useLocalStorage } from './useLocalStorage';
import { Dispatch } from 'react';

export interface Token {
  access_token: string;
  refresh_token: string;
  refresh_time: Date;
}

export interface Session extends Token {
  name: string;
  user_id: string;
  email: string;
}

export const useSession = (): [
  Session | undefined,
  Dispatch<Session | undefined>
] => {
  return useLocalStorage<Session>('session');
};
