import { types, flow } from 'mobx-state-tree';
import BrandEntity from './brand-entity-model';
import http from '../../utils/axiosInstance';

const BrandListModel = types
  .model('BrandListModel', {
    list: types.array(BrandEntity), // brand 列表
    currentBrand: types.frozen(), // 选中的 brand
  })
  .actions((self) => ({
    init: flow(function* () {
      const { data } = yield http.get(
        'https://api-dev.sandwichlab.ai/api/brand/all'
      );
      self.list = data;
    }),
    addBrand(brandData) {
      // self.list.push(brandData); // 添加新brand
    },
    removeBrand(id) {
      console.log('delete id is: ', id);
      debugger;
      // self.list = self.list.filter((brand) => brand.id !== id); // 删除项目
    },
    updateBrand(id, updates) {
      console.log('id is: ', id, 'input', updates);
      console.log('brand is: ', updates);
      self.currentBrand = updates;
    },

    updateBrands(updates) {
      self.list = updates;
    },

    getBrand(id) {
      console.log('id is: ', id);
      http
        .get(`https://api-dev.sandwichlab.ai/api/brand/id?brand_id=${id}`)
        .then((res) => {
          console.log('115 get brand by id: ', res);

          this.updateBrand(res.data.id, res.data);

          // setAccount(res.data)
          // setBrandName(res.data.name)
          // form.setFieldsValue({ "": res.data.name });
        })
        .catch((err) => {
          console.log('92 err is: ', err);
        });
    },
  }));

export default BrandListModel;
