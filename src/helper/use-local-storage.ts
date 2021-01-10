import { Dispatch, useEffect, useState } from 'react';

export const useLocalStorage = <T = string>(
  localStorageKey: string
): [T | undefined, Dispatch<T | undefined>] => {
  const item = localStorage.getItem(localStorageKey);
  const [value, setValue] = useState<T | undefined>(
    item && item.length > 0 ? JSON.parse(item) : undefined
  );

  useEffect(() => {
    if (value === undefined || value === null) {
      localStorage.removeItem(localStorageKey);
    } else {
      localStorage.setItem(localStorageKey, JSON.stringify(value));
    }
  }, [localStorageKey, value]);

  return [value, setValue];
};
