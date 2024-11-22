import { types } from 'mobx-state-tree';
import moment from 'moment';

const BrandEntity = types
  .model('ProjectEntity', {
    id: types.identifierNumber, // project ID
    name: types.string, // project 名称
    status: types.enumeration('Status', ['isRunning', 'draft', 'editing']), // 0 表示
    updateTime: types.string, // 更新时间（ISO 日期格式）
  })
  .actions((self) => ({}))
  .views((self) => ({
    formatUpdateTime: () => {
      // 创建日期对象
      const date = moment(self.updateTime);
      return date.format('MMM, DD, YYYY');
    },
  }));

export default BrandEntity;
