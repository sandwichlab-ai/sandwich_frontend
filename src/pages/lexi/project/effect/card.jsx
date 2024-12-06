import { useState } from 'react';
import './card.scss';

function Card({ item, value }) {
  return (
    <div className='effect-card'>
      <div className='name'>{item.name}</div>
      <div className='status'>{value || '-'}</div>
    </div>
  );
}

export default Card;
