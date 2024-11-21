import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useStore } from '../../../stores/routeStore';

import './index.scss';
import CardList from '../../../components/card';

const Project = observer(() => {
  const { projectList } = useStore();

  const handleAddItem = useCallback(() => {}, []);
  // 初始化projectList
  useEffect(() => {
    projectList.init();
  }, []);
  // 显示访问list，触发mobx的依赖追踪
  const list = projectList.list.slice(0);
  return (
    <CardList list={list} handleAddItem={handleAddItem} addUrl='add'></CardList>
  );
});

export default Project;
