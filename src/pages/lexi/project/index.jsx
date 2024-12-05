import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useStore } from '../../../stores/routeStore';

import './index.scss';
import CardList from '../../../components/lexi-card';

const Project = observer(() => {
  const { projectList } = useStore();
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
    projectList.init();
  }, []);

  // 显示访问list，触发mobx的依赖追踪
  const list = projectList.list.slice(0);
  return (
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
      }}
    ></CardList>
  );
});

export default Project;
