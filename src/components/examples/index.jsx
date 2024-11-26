import React from 'react';
import { Carousel } from 'antd';
import './index.scss';

function Examples({ examples = [] }) {
  return (
    <div className='lexi-examples'>
      <header>
        <span className='lexi-examples__header'>Examples</span>
      </header>
      <Carousel
        className='lexi-examples__carousel'
        dotPosition='bottom'
        autoplay
      >
        {examples.map((example, index) => (
          <div className='lexi-examples__carousel__item' key={index}>
            <div
              className='lexi-examples__carousel__item__html'
              dangerouslySetInnerHTML={{ __html: example.text }}
            ></div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Examples;
