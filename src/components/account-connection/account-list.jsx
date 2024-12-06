import React, { useEffect, useState } from 'react';
import { Table, Radio } from 'antd';

const AccountList = ({ accountData, brand, setSelectRecord, selectRecord }) => {
  const columns = [
    {
      title: 'Select',
      dataIndex: 'select',
      align: 'center',
      render: (_, record) => (
        <Radio
          checked={record.id === (selectRecord.id || brand?.ad_account_id)}
          onChange={() => setSelectRecord(record)}
        />
      ),
    },
    {
      title: 'Name',
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: 'Account Id',
      align: 'center',
      dataIndex: 'id',
    },
    {
      title: 'Account Status',
      align: 'center',
      dataIndex: 'account_status',
      render: (_, record) => (
        <span>{record.account_status === 'ACTIVE' ? 'Active' : 'Passive'}</span>
      ),
    },
  ];

  useEffect(() => {});

  return (
    <div className='profile__account--content'>
      <Table
        className='lexi-table'
        columns={columns}
        dataSource={accountData}
        pagination={false}
      />
    </div>
  );
};
export default AccountList;
