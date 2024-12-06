import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useStore } from '../../../stores/routeStore';

import './index.scss';
import CardList from '../../../components/lexi-card';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const Project = observer(() => {
  const { projectList } = useStore();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const operationOptions = useMemo(
    () => [
      {
        key: 'rename',
        buttonName: 'Rename',
        icon: <EditOutlined />,
        modalTitle: 'Do you want to rename this project?',
        modalContent: `if you delete this project, you won't be able to recover it later`,
        handleConfirm: (dataItem) => {
          projectList.renameProject(dataItem.id);
        },
      },
      {
        key: 'delete',
        buttonName: 'Delete',
        icon: <DeleteOutlined />,
        modalTitle: 'Do you want to delete this project?',
        modalContent: `if you delete this project, you won't be able to recover it later`,
        handleConfirm: (dataItem) => {
          projectList.removeProject(dataItem.project_id);
        },
      },
    ],
    []
  );
  const handleAddItem = useCallback(() => {}, []);

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
    await projectList.init();
    messageApi.destroy();
  };

  // 显示访问list，触发mobx的依赖追踪
  const list = projectList.list.slice(0);
  return (
    <>
      <CardList
        list={list}
        map={{ name: 'introduction.project_name', id: 'project_id' }}
        handleAddItem={handleAddItem}
        addUrl='add'
        editUrl='edit'
        from='Project'
        operationOptions={operationOptions}
        onEdit={(item) => {
          projectList.getCurrentProject(item.project_id);
          if (item.status === 'SUBMITTED') {
            navigate(`edit/${item.project_id}/effect`);
          } else {
            navigate(`edit/${item.project_id}`);
          }
        }}
      ></CardList>
      {contextHolder}
    </>
  );
});

export default Project;
