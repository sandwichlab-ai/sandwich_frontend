// src/stores/RootStore.js
import React from 'react';
import { types } from 'mobx-state-tree';
import { ProjectListModel } from './models'; // 示例模型

const rootStore = types
  .model('RootStore', {
    projectList: ProjectListModel, // project 列表
  })
  .create({
    projectList: { list: [] }, // 初始化状态
  });

const StoreContext = React.createContext(rootStore);

export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
);

export const useStore = () => React.useContext(StoreContext);