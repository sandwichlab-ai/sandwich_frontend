import { types } from 'mobx-state-tree';
import BrandEntity from './brand-entity-model';

const BrandListModel = types
  .model('Counter', {
    list: types.array(BrandEntity), // project 列表
  })
  .actions((self) => ({
    init() {
      self.list = [
        {
          id: 1, // project id
          brand_id: 1,
          status: 'isRunning',
          name: 'New Song Promotion', // 品牌名
          updateTime: '2024-10-14', // 更新时间，设计稿上看有这个
        },
        {
          id: 2, // 品牌 id
          brand_id: 2,
          name: 'Rapper John', // 品牌名
          status: 'editing',
          updateTime: '2024-10-14', // 更新时间，设计稿上看有这个
        },
      ];
    },
    addBrand(brandData) {
      self.list.push(brandData); // 添加新项目
    },
    removeBrand(id) {
      self.list = self.list.filter((brand) => brand.id !== id); // 删除项目
    },
    updateBrand(id, updates) {
      const brand = self.list.find((brand) => brand.id === id);
      if (brand) {
        Object.assign(brand, updates); // 更新项目属性
      }
    },
  }));

export default BrandListModel;
