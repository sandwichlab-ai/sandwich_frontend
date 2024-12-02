import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

const columns = [
  // {
  //     title: 'Select',
  //     dataIndex: 'selectedIndex',
  // },
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Account Id',
    dataIndex: 'accountId',
  },
  {
    title: 'Account Status',
    dataIndex: 'accountStatus',
  },
];

export default function AccountList(props) {
  const [addAccount, setAddAccount] = useState({});

  useEffect(() => {});

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
      setAddAccount(selectedRows[0]);
    },
    getCheckboxProps: (record) => ({
      // disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div className='profile__account--content'>
      <Table
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={props.accountData}
      />

      <div className='btn-wrapper'>
        <button
          onClick={() => {
            props.setAccount(addAccount);
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
