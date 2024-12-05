import React from 'react';
import { Carousel } from 'antd';
import './index.scss';

function Examples({ examples = [] }) {
  return (
    <div className='lexi-examples mt-[30px]'>
      <header className='text-center h-[27px]'>
        <span className='lexi-examples__header'>Examples</span>
      </header>
      <Carousel
        rootClassName='lexi-examples__carousel'
        dots
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
