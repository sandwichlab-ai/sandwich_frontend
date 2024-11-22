import React from'react';
import { Carousel, Input } from 'antd'

function Examples(props) {
  const { TextArea } = Input;
  return (
    <Carousel autoplay>
       {
        props.examples.map(el => {
            return (
                <div>
    <TextArea
              disabled
              value={el}
              maxLength={5000}
              width={'40%'}
              style={{
                height: 251,
                resize: 'none',
                backgroundColor: '#FAF8FF',
              }}
            />
    </div> 
            )
        })
       }
    </Carousel>
  );
}

export default Examples;