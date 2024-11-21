// src/stores/RootStore.js
import React from 'react';
import { types } from 'mobx-state-tree';
import CounterModel from './models/counterModel'; // 示例模型

const rootStore = types
  .model('RootStore', {
    counter: CounterModel, // 嵌套 Counter 模型
  })
  .create({
    counter: { count: 0 }, // 初始化状态
  });

const StoreContext = React.createContext(rootStore);

export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
);

export const useStore = () => React.useContext(StoreContext);
