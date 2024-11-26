import React from 'react';
import { Button } from 'antd';
import './index.scss';

function LexiButton({ handleClick, text, type }) {
  return (
    <Button
      key='submit'
      className='lexi-button'
      onClick={handleClick}
      htmlType={type || 'button'}
    >
      {text || 'unknown'}
    </Button>
  );
}

export default LexiButton;
