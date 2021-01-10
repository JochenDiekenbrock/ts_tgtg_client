import { FC, useState } from 'react';
import { useGetItems } from './helper/use-get-items';
import { Items } from './items';
import { Item } from './helper/models';

export const ItemsContainer: FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useGetItems().then((items) => {
    setItems(items);
  });

  return <Items items={items} />;
};
