import { useLocalStorage } from './useLocalStorage';
import { Dispatch } from 'react';

export interface Session {
  name: string;
  user_id: string;
  email: string;
  access_token: string;
  refresh_token: string;
}

export const useSession = (): [
  Session | undefined,
  Dispatch<Session | undefined>
] => {
  return useLocalStorage<Session>('session');
};
