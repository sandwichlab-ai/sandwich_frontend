import React, { useState } from 'react';
import { Flex, Input, Select, Form, Button, Row, Col, Carousel } from 'antd';
import meta from '../../../assets/images/meta.png';
import './index.css';

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function Content() {
  const { TextArea } = Input;

  const [accountCnt, setAccountCnt] = useState(1);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const onChange = (e) => {
    console.log('changed', e.target.value);
  };

  const onExampleChange = (e) => {
    console.log("example change", e.target);
  }

  const renderCount = ({ count, maxLength }) => (
    <div style={{ position: 'absolute', bottom: '-2000px', left: '0', color: 'blue' }}>
      {count} / {maxLength}
    </div>
  );

  const handleChange = () => {}

  return (
    <div className='content'>
      <div className='addtional__information'>
        <div className="brand__container">

      <Form.Item
        label="Brand Name" 
        name="brandname"
        rules={[{ required: true, message: 'Please input brand name!' }]}
        labelCol={{ span: 24 }} 
        wrapperCol={{ span: 24 }} 
      >
        <Select
      defaultValue="lucy"
      style={{ width: 680, height: 50 }}
      onChange={handleChange}
      options={[
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Yiminghe', label: 'yiminghe' },
        { value: 'disabled', label: 'Disabled', disabled: true },
      ]}
    />
      </Form.Item>
    

        </div>
      </div>

      <div className='content__bussiness'>
      
    
        <Row>
          <Col
           span={12}
          >
      <Form.Item
        label="Brand Introduction" 
        name="bussiness"
        rules={[{ required: true, message: 'Please describe your bussiness!' }]}
        labelCol={{ span: 24 }} 
        wrapperCol={{ span: 24 }} 
      >
          <TextArea
              showCount={renderCount}
              maxLength={5000}
              width={'60%'}
              onChange={onChange}
              placeholder='Examples: Sandwichlab is a lead AI company in social media marketing'
              style={{ height: 301, resize: 'none' }}
            />
      </Form.Item>
      </Col>

      <Col
           span={8}
          >
     <span>Examples</span>
<Carousel autoplay>
    <div>
    <TextArea
              disabled
              value='I am a divorce lawyer1 based in ....'
              maxLength={5000}
              width={'40%'}
              style={{
                height: 251,
                resize: 'none',
                backgroundColor: '#FAF8FF',
              }}
            />
    </div>
    <div>
    <TextArea
              disabled
              value='I am a divorce lawyer2 based in ....'
              maxLength={5000}
              width={'40%'}
              style={{
                height: 251,
                resize: 'none',
                backgroundColor: '#FAF8FF',
              }}
            />
    </div>
    <div>
    <TextArea
              disabled
              value='I am a divorce lawyer3 based in ....'
              maxLength={5000}
              width={'40%'}
              style={{
                height: 251,
                resize: 'none',
                backgroundColor: '#FAF8FF',
              }}
            />
    </div>
    <div>
    <TextArea
              disabled
              value='I am a divorce lawyer4 based in ....'
              maxLength={5000}
              width={'40%'}
              style={{
                height: 251,
                resize: 'none',
                backgroundColor: '#FAF8FF',
              }}
            />
    </div>
  </Carousel>

      </Col>
      </Row>


        
      </div>

      <div className='account__connection'>
        <span className='account__connection--title'>
          Ad Account Connection
        </span>
        <div className='account__connection--wrapper'>
          <img
            src={meta}
            alt='icon'
            className='meta__icon'
          />
          <input type='text' value='Meta Ads' />

          <button><span>+</span> {'Ad Account Connect`'}</button>
        </div>
      </div>

      <div className='content__profile--footer'>
        <div className='content__btn--group'>
          {/* <button className='content__btn'>cancel</button> */}
          {/* <button className='content__btn'>save</button> */}
          <Button disabled={submitDisabled} width="412" height="56">
             Save and create ads now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Content;
