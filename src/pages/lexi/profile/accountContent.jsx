import React, { useState } from 'react';
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      // disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
function AccountContent(props) {
  const [content, setContent] = useState('');
  return (
    <div className="profile__account--content">
      <Table
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={props.accountData}
      />

      <button>OK</button>
    </div>
  );
}

export default AccountContent;