// src/stores/RootStore.js
import React from 'react';
import { types } from 'mobx-state-tree';
import { ProjectListModel } from './models'; // 示例模型
import BrandListModel from './models/brand-list-model'; // 示例模型
import EffectEntity from './models/effect-entity-model';

const rootStore = types
  .model('RootStore', {
    projectList: ProjectListModel, // project 列表
    brandList: BrandListModel, // brand 列表
    currentEffect: types.maybeNull(EffectEntity),
  })
  .create({
    projectList: { list: [] }, // 初始化状态
    brandList: { list: [] }, // 初始化状态
    currentEffect: {},
  });

const StoreContext = React.createContext(rootStore);

export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
);

export const useStore = () => React.useContext(StoreContext);
