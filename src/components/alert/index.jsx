import React from 'react';
import './index.css';

function Alert({ type, children }) {
  return <div className={`alert--${type}`}>{children}</div>;
}

export default Alert;
