import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useStore } from '../../../stores/routeStore';
import CardList from '../../../components/lexi-card';
import { observer } from 'mobx-react-lite';
import './index.css';

const Brand = () => {
  const { brandList } = useStore();
  const operationOptions = useMemo(
    () => [
      {
        key: 'rename',
        buttonName: 'Rename',
        icon: <EditOutlined />,
        modalTitle: 'Do you want to rename this Brand?',
        modalContent: `if you delete this brand, you won't be able to recover it later`,
        handleConfirm: (dataItem) => {
          brandList.updateBrand(dataItem.id, {
            ...dataItem,
            name: 'named',
          });
        },
      },
      {
        key: 'delete',
        buttonName: 'Delete',
        icon: <DeleteOutlined />,
        modalTitle: 'Do you want to delete this brand?',
        modalContent: `if you delete this brand..., you won't be able to recover it later`,
        handleConfirm: (dataItem) => {
          brandList.removeProject(dataItem.id);
        },
      },
    ],
    []
  );

  // 初始化projectList
  useEffect(() => {
    brandList.init();
  }, []);

  const handleAddItem = useCallback(() => {}, []);
  // 显示访问list，触发mobx的依赖追踪
  const list = brandList.list.slice(0);
  return (
    <CardList
      list={list}
      handleAddItem={handleAddItem}
      addUrl='add'
      editUrl='edit'
      from='Brand'
      onEdit={(item) => {
        brandList.getCurrentBrand(item.id);
      }}
      operationOptions={operationOptions}
    ></CardList>
  );
};

export default observer(Brand);
