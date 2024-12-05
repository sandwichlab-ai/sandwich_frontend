import { types } from 'mobx-state-tree';
import moment from 'moment';

const BrandEntity = types
  .model('BrandEntity', {
    // id: types.string, // types.identifierNumber, // brand ID          need be recovered after debug
    // name: types.string, // brand 名称
    // status: types.string, // types.enumeration('Status', ['isRunning', 'draft', 'editing']), // 0 表示
    // updateTime: types.string, // 更新时间（ISO 日期格式）
    ad_account_id: types.string,
    account_name: types.string,
    time_zone: types.maybeNull(types.string),
    page_id: types.maybeNull(types.string),
    account_status: types.string,
    created: types.number,
    deleted: types.number,
    description: types.string,
    goal: types.string,
    id: types.number,
    name: types.string,
    updated: types.number,
  })
  .actions((self) => ({
    updateBrand: (updates) => {
      Object.assign(self, updates);
    },
  }))
  .views((self) => ({
    formatUpdateTime: () => {
      // 创建日期对象
      const date = moment(self.updateTime);
      return date.format('MMM, DD, YYYY');
    },
  }));

export default BrandEntity;
