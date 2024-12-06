import React, { useEffect, useCallback } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useStore } from '../../../stores/routeStore';
import CardList from '../../../components/lexi-card';
import { observer } from 'mobx-react-lite';
import './index.css';
import { Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Brand = () => {
  const { brandList } = useStore();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const operationOptions = [
    {
      key: 'delete',
      buttonName: 'Delete',
      icon: <DeleteOutlined />,
      modalTitle: 'Do you want to delete this brand?',
      modalContent: `if you delete this brand..., you won't be able to recover it later`,
      handleConfirm: (dataItem) => {
        brandList.deleteBrand(dataItem.id);
      },
    },
  ];

  // 初始化projectList
  useEffect(() => {
    fetchBrandList();
  }, []);

  const fetchBrandList = async () => {
    messageApi.open({
      type: 'loading',
      content: 'Brand list in loading..',
      duration: 0,
    });
    await brandList.init();
    messageApi.destroy();
  };

  const handleAddItem = useCallback(() => {}, []);
  // 显示访问list，触发mobx的依赖追踪
  const list = brandList.list.slice(0);
  return (
    <>
      <CardList
        list={list}
        handleAddItem={handleAddItem}
        addUrl='add'
        editUrl='edit'
        from='Brand'
        onEdit={(item) => {
          brandList.getCurrentBrand(item.id);
          navigate(`edit/${item.id}`);
        }}
        operationOptions={operationOptions}
      ></CardList>
      {contextHolder}
    </>
  );
};

export default observer(Brand);
