import { useState } from 'react';
import editImg from '../../../../assets/images/edit.svg';
import './addCard.scss';

function AddCard(props) {
  return (
    <div className='add-card'>
      <div className='text-[16px]'>{props.first}</div>
      <div className='text-[20px]'>
        <span className='ml-2'>{`${props.second}`}</span>
        <img src={editImg} alt='Logo' width='20' height='20' />
      </div>
    </div>
  );
}

export default AddCard;
