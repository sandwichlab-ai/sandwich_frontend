import React, { useState } from 'react';
import { Flex, Input } from 'antd';
import meta from '../../../assets/images/meta.png';
import './index.css';

function Content() {
  const { TextArea } = Input;

  const [accountCnt, setAccountCnt] = useState(1);

  const onChange = (e) => {
    console.log('changed', e.target.value);
  };

  return (
    <div className='content'>
      <div className='content__bussiness'>
        <div className='bussiness__title'>You and your Bussiness</div>
        <div className='bussiness__content'>
          <div className='textarea__wrapper'>
            <TextArea
              showCount
              maxLength={5000}
              width={'60%'}
              onChange={onChange}
              placeholder='Examples: Sandwichlab is a lead AI company in social media marketing'
              style={{ height: 301, resize: 'none' }}
            />
            <button className='bussiness__inspire--btn'>Inspire by Lexi</button>
          </div>
          <div className='textarea__display'>
            <TextArea
              disabled
              value='I am a divorce lawyer based in ....'
              maxLength={5000}
              width={'40%'}
              style={{
                height: 301,
                resize: 'none',
                backgroundColor: '#FAF8FF',
              }}
            />

            <div className='bussiness__btn--group'>
              <button className='bussiness__btn--close'>Close</button>
              <button className='bussiness__btn--accept'>Accept</button>
              <button className='bussiness__btn--regenerate'>Regenerate</button>
            </div>
          </div>
        </div>
      </div>

      <div className='addtional__information'>
        <span className='addtional__information--title'>
          Additional information
        </span>
        <label>Link to your website</label>
        <input type='text' />
      </div>

      <div className='account__connection'>
        <span className='account__connection--title'>
          add account connection
        </span>
        <div className='account__connection--wrapper'>
          <img
            src={meta}
            alt='icon'
            className='meta__icon'
            // style={{
            //     position: 'absolute',
            //     left: '2%', // 左侧距离 input 2%
            //     top: '50%', // 垂直居中
            //     transform: 'translateY(-50%)', // 垂直居中调整
            //     width: '20px', // 根据需要调整图片宽度
            //     height: '20px', // 根据需要调整图片高度
            // }}
          />
          <input type='text' value='Meta Ads' />

          <button>{`+    ${accountCnt} Add Account Connected`}</button>
        </div>
      </div>

      <div className='content__profile--footer'>
        <div className='content__btn--group'>
          <button className='content__btn'>cancel</button>
          <button className='content__btn'>save</button>
        </div>
      </div>
    </div>
  );
}

export default Content;
