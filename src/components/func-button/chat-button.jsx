import React, { useState } from 'react';
import { Form, Input, Popconfirm } from 'antd';
import { ReactComponent as ChatIcon } from '../../assets/images/chat.svg';

export default function ChatButton({ handleConfirm, className }) {
  const [value, setValue] = useState('');
  return (
    <div className={className}>
      <Popconfirm
        className='lexi-popconfirm'
        title={
          <Input.TextArea
            rows={4}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        }
        icon=''
        onConfirm={() => {
          handleConfirm(value);
        }}
        okText='OK'
      >
        <span
          className='absolute right-[16px] cursor-pointer'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ChatIcon />
        </span>
      </Popconfirm>
    </div>
  );
}
