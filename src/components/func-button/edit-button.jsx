import React, { useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { ReactComponent as EditIcon } from '../../assets/images/edit.svg';

export default function EditButton({ handleConfirm, handleCancel, className }) {
  const [edit, setEdit] = useState(false);
  return (
    <div className={className}>
      {edit ? (
        [
          <span
            key='1'
            className='cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              setEdit(false);
            }}
          >
            <CheckOutlined />
          </span>,
          <span
            key='2'
            className='cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              handleCancel?.();
              setEdit(false);
            }}
          >
            <CloseOutlined />
          </span>,
        ]
      ) : (
        <span
          className='cursor-pointer'
          onClick={(e) => {
            e.stopPropagation();
            handleConfirm?.();
            setEdit(true);
          }}
        >
          <EditIcon />
        </span>
      )}
    </div>
  );
}
