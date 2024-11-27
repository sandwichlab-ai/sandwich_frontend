import React, { useEffect, useState } from 'react';
import { useStore } from '../../../stores/routeStore';
import { Table } from 'antd';
import { observer } from 'mobx-react-lite';

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

function AccountContent(props) {
  const [content, setContent] = useState('');
  const { brandList } = useStore();
  const [addAccount, setAddAccount] = useState({})

  useEffect(() => {

  })

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setAddAccount(selectedRows[0])
    },
    getCheckboxProps: (record) => ({
      // disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

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

      <button onClick={
        () => {
          props.setAccount(addAccount)
        }
      }>OK</button>
    </div>
  );
}

export default AccountContent;