import React from 'react';
import { Button } from 'antd';
import './index.scss';

function LexiButton({ handleClick, text, children, type }) {
  return (
    <Button
      key='submit'
      className='lexi-button'
      onClick={handleClick}
      htmlType={type || 'button'}
    >
      {children || text || 'unknown'}
    </Button>
  );
}

export default LexiButton;
