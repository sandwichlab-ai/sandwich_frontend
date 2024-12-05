import React, { useState, useRef } from 'react';
import LexiButton from '../lexi-button';
import LexiModal from '../lexi-modal';
import AccountList from './account-list';
import http from '../../utils/axiosInstance';
import { ReactComponent as MetaIcon } from '../../assets/images/meta.svg';

export default function AccountContention({ brand, setSelectedRow }) {
  const [showModal, setShowModal] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [selectRecord, setSelectRecord] = useState({
    id: brand?.ad_account_id,
    name: brand?.account_name,
    account_status: brand?.account_status,
    time_zone: brand?.time_zone,
    page_id: brand?.page_id,
  });
  const timer = useRef(null);
  // const

  const getFbAccount = async () => {
    const { data } = await http.get(
      `https://api-dev.sandwichlab.ai/meta/fb/account`
    );
    if (data?.data) {
      setAccountList(data.data);
      setShowModal(true);
    } else if (data?.oauthURL) {
      const newWindow = window.open(data.oauthURL, '_blank');
      timer.current = setInterval(async () => {
        if (newWindow.closed) {
          clearInterval(timer.current);
          return;
        }
        const { data } = await http.get(
          `https://api-dev.sandwichlab.ai/meta/fb/account`
        );
        if (data?.data) {
          newWindow.close();
          setAccountList(data.data);
          clearInterval(timer.current);
        }
      }, 1000);
    }
  };

  return (
    <div className='lexi-form-item'>
      <span className='text-[20px]'>Ad Account Connection</span>
      <div className='border-[#c4c4c4] border-[1px] rounded-[12px] p-[13px] mt-[12px] flex justify-between items-center'>
        <div className='flex items-center'>
          <MetaIcon></MetaIcon>
          <input type='text' value='Meta Ads' className='ml-2' />
        </div>
        <span className='account__connection--edit'>{selectRecord?.name}</span>
        <LexiButton
          width='245px'
          height='40px'
          text={selectRecord?.id ? 'Edit' : '+ Ad Account Connect'}
          handleClick={(e) => {
            if (e) e.preventDefault(); // 阻止默认行为，eg project中使用动态表单时，点击按钮切换steps会渲染出另一个表单，同时会触发该位置上的另一个表单的按钮
            getFbAccount();
          }}
        />
      </div>
      <LexiModal
        className='!max-w-[80%] !w-[80%]'
        open={showModal}
        handleConfirm={() => {
          setShowModal(false);
        }}
        handleCancel={() => setShowModal(false)}
        title={<div className='text-left text-[28px]'>Selected Ad Account</div>}
        footer={
          <LexiButton
            width={196}
            height={56}
            text={<span className='text-[20px]'>OK</span>}
            handleClick={async (e) => {
              if (e) e.preventDefault(); // 阻止默认行为，eg project中使用动态表单时，点击按钮切换steps会渲染出另一个表单，同时会触发该位置上的另一个表单的按钮
              setSelectedRow(selectRecord);
              setShowModal(false);
            }}
          />
        }
        content={
          <AccountList
            selectRecord={selectRecord}
            setSelectRecord={setSelectRecord}
            brand={brand}
            accountData={accountList}
          />
        }
      ></LexiModal>
    </div>
  );
}
