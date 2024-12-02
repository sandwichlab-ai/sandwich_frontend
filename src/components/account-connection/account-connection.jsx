import React, { useState } from 'react';
import LexiButton from '../lexi-button';
import LexiModal from '../lexi-modal';
import AccountList from './account-list';
import { ReactComponent as MetaIcon } from '../../assets/images/meta.svg';

export default function AccountContention({ brand }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className='lexi-form-item'>
      <span className='text-[20px]'>Ad Account Connection</span>
      <div className='border-[#c4c4c4] border-[1px] rounded-[12px] p-[20px] flex justify-between'>
        <div className='flex'>
          <MetaIcon></MetaIcon>
          <input type='text' value='Meta Ads' />
        </div>
        <span className='account__connection--edit'>
          {brand?.ad_account_name}
        </span>
        <LexiButton
          text='+ Ad Account Connect'
          handleClick={(e) => {
            if (e) e.preventDefault(); // 阻止默认行为，eg project中使用动态表单时，点击按钮切换steps会渲染出另一个表单，同时会触发该位置上的另一个表单的按钮
            setShowModal(true);
          }}
        />
        <LexiButton
          text='Edit'
          handleClick={(e) => {
            if (e) e.preventDefault(); // 阻止默认行为，eg project中使用动态表单时，点击按钮切换steps会渲染出另一个表单，同时会触发该位置上的另一个表单的按钮
            setShowModal(true);
          }}
        />
      </div>
      <LexiModal
        open={showModal}
        handleConfirm={() => {
          setShowModal(false);
        }}
        handleCancel={() => setShowModal(false)}
        title='Selected Ad Account'
        content={<AccountList accountData={[]} />}
      ></LexiModal>
    </div>
  );
}
