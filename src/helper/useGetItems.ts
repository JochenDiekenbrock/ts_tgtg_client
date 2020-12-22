import { getItems } from '../api/api';
import { useContext, useMemo } from 'react';
import { Item, ItemSearchCriteria } from './models';
import { SessionContext } from '../session';

const DEFAULT_SEARCH_CRITERIA: ItemSearchCriteria = {
  favorites_only: false,
  origin: { latitude: 50, longitude: 9 },
  radius: 5
};

export const useGetItems = async (): Promise<Item[]> => {
  const { session } = useContext(SessionContext);

  const searchCriteria = DEFAULT_SEARCH_CRITERIA;

  return useMemo(async () => {
    if (!session) {
      return [];
    }

    const response = await getItems(
      session.startup_data.user.user_id,
      session.access_token,
      searchCriteria
    );
    return response || [];
  }, [session, searchCriteria]);
};
