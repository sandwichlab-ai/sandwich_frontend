import { types } from 'mobx-state-tree';
import BrandEntity from './brand-entity-model';
import axiosInstance from '../../utils/axiosInstance';

function setToken() {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('idToken');
      console.log("token is: ", token, "header is: ", localStorage.getItem("idToken"))
      if (token) {
        config.headers['Authorization'] = `${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

const BrandListModel = types
  .model('BrandListModel', {
    list: types.array(BrandEntity), // brand 列表
    currentBrand: types.frozen() // 选中的 brand
  })
  .actions((self) => ({
    init() {
      setToken()


      axiosInstance.get("https://api-dev.sandwichlab.ai/api/brand/all").then((response) => {
        console.log("response is: ", response)
        // self.list = response.data;
        let result = response.data.map((item) => {
          return {
            ad_account_id: item.ad_account_id,
            created: item.created,
            deleted: item.deleted,
            description: item.description,
            goal: item.goal,
            id: item.id,
            name: item.name,
            updated: item.updated,
            user_id: item.user_id
          }
        })
        console.log("result is: ", result)

        this.updateBrands(result)
      }).catch((error) => {
        console.log("error is: ", error)
      })


      // self.list = [
      //   {
      //     id: "1", // brand id
      //     brand_id: "1",
      //     status: 'isRunning',
      //     name: 'New Song Promotion 111', // 品牌名
      //     updateTime: '2024-10-14', // 更新时间，设计稿上看有这个
      //   },
      //   {
      //     id: "2", // 品牌 id
      //     brand_id: "2",
      //     name: 'Rapper John  111', // 品牌名
      //     status: 'editing',
      //     updateTime: '2024-10-14', // 更新时间，设计稿上看有这个
      //   },
      // ];
    },
    addBrand(brandData) {
      // self.list.push(brandData); // 添加新brand
    },
    removeBrand(id) {
      console.log("delete id is: ", id)
      // self.list = self.list.filter((brand) => brand.id !== id); // 删除项目
    },
    updateBrand(id, updates) {
      console.log("id is: ", id, "input", updates)
      console.log("brand is: ", updates)
      self.currentBrand = updates
    },

    updateBrands(updates) {
      console.log("updates is: ", updates)
      self.list = updates;
    },

    getBrand(id) {
      // const brand = self.list.find((brand) => brand.id == id);
      console.log("id is: ", id)
      // return brand;
      setToken();

      axiosInstance.get(`https://api-dev.sandwichlab.ai/api/brand/${id}`).then(
        res => {
          console.log("115 get brand by id: ", res)

          this.updateBrand(res.data.id, res.data)

          // setAccount(res.data)
          // setBrandName(res.data.name)
          // form.setFieldsValue({ "": res.data.name });
        }
      ).catch(
        err => {
          console.log("92 err is: ", err)
        }
      )



    }

  }));

export default BrandListModel;
