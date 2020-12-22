import { FC } from 'react';
import { Item } from './helper/models';

export const Items: FC<{ items: Item[] }> = ({ items }) => (
  <>
    <h1>Items:</h1>
    {items &&
      items.map((item, index) => (
        <div key={index}>
          {item.display_name}
          {item.distance}
        </div>
      ))}
  </>
);
