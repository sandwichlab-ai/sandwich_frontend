import React, { useEffect, useState } from 'react';
import { useStore } from '../../../stores/routeStore';
import { Table } from 'antd';
import { observer } from 'mobx-react-lite';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Account Id',
    dataIndex: 'id',
  },
  {
    title: 'Account Status',
    dataIndex: 'account_status',
    render: (status) => (status === 0 ? 'in_active' : 'active'),
  },
];

function AccountContent(props) {
  const [content, setContent] = useState('');
  const { brandList } = useStore();
  const [addAccount, setAddAccount] = useState({})

  useEffect(() => {

  })

  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 保存选中行的 keys

  const rowSelection = {
    type: "radio", // 单选
    selectedRowKeys, // 当前选中的行
    onChange: (selectedRowKeys, selectedRows) => {
      // 更新选中的行
      setSelectedRowKeys(selectedRowKeys);
      console.log("Selected Row Keys: ", selectedRowKeys, selectedRows, selectedRows[0]);
      setAddAccount(selectedRows[0])
    },
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
        rowKey={(record) => record.id}
      />

      <div className="btn-wrapper"><button onClick={
        () => {
          props.setAccount(addAccount)
        }
      }>OK</button></div>
    </div>
  );
}

export default AccountContent;