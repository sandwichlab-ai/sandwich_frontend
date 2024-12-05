import { types, flow } from 'mobx-state-tree';
import BrandEntity from './brand-entity-model';
import http from '../../utils/axiosInstance';

const BrandListModel = types
  .model('BrandListModel', {
    list: types.array(BrandEntity), // brand 列表
    currentBrand: types.maybeNull(BrandEntity), // 当前选中的 brand()
  })
  .actions((self) => ({
    init: flow(function* () {
      const { data } = yield http.get(
        'https://api-dev.sandwichlab.ai/api/brand/all'
      );
      self.list = data;
    }),
    getCurrentBrand: flow(function* (id) {
      if (self.list.length === 0) {
        yield self.init();
      }
      const brand = self.list.find((brand) => brand.id === +id);
      self.currentBrand = { ...brand };
    }),
    addBrand: flow(function* (brandData) {
      const { data } = yield http.post(
        `https://api-dev.sandwichlab.ai/api/brand`,
        brandData
      );
      self.list.push(data); // 添加新brand
    }),
    renameBrand: flow(function* (id, name) {
      yield http.put(`https://api-dev.sandwichlab.ai/api/brand/${id}`, {
        name: 'test',
      });
      console.log('delete id is: ', id);
      // self.list = self.list.filter((brand) => brand.id !== id); // 删除项目
    }),

    updateBrand: flow(function* (id, updates) {
      const { data } = yield http.put(
        `https://api-dev.sandwichlab.ai/api/brand/${id}`,
        updates
      );
      self.list = self.list.map((brand) => {
        if (brand.id === id) {
          return { ...brand, ...data };
        }
        return brand;
      });
    }),

    getBrand: flow(function* (id) {
      console.log('id is: ', id);
      yield http
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
    }),

    deleteBrand: flow(function* (id) {
      yield http.delete(`https://api-dev.sandwichlab.ai/api/brand/${id}`);
      self.list = self.list.filter((brand) => brand.id !== id); // 删除项目
    }),
  }));

export default BrandListModel;
