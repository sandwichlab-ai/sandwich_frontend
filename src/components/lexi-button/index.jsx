import React from 'react';
import { Button } from 'antd';
import './index.scss';

function LexiButton({ handleClick, text, children, type, className, height }) {
  return (
    <Button
      key='submit'
      className={`lexi-button ${className}`}
      style={{ height: height || '40px' }}
      onClick={handleClick}
      htmlType={type || 'button'}
    >
      {children || text || 'unknown'}
    </Button>
  );
}

export default LexiButton;
