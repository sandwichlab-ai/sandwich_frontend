import React from 'react';
import { Button, Dropdown, Modal } from 'antd';
import './index.scss';

function LexiButton({ handleClick, text }) {
  return (
    <Button key='submit' className='lexi-button' onClick={handleClick}>
      {text || 'unknown'}
    </Button>
  );
}

export default LexiButton;
