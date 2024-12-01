import React from 'react';
import './loading.scss';

const Loading = ({ className, type }) => (
  <span
    className={`spinner w-[16px] h-[16px] ${className} ${
      type === 'primary' ? 'spinner-primary' : ''
    }`}
  >
    {new Array(12).fill(Math.random()).map((v, index) => (
      <i
        key={index}
        style={{
          transform: `rotate(${30 * (index + 1)}deg)`,
          opacity: 1 - index / 16,
        }}
      ></i>
    ))}
  </span>
);

export default Loading;
