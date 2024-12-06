import { types, flow } from 'mobx-state-tree';
import http from '../../utils/axiosInstance';
import { update } from 'lodash';

const EffectEntity = types
  .model('EffectEntity', {
    project_name: types.maybeNull(types.string),
    duration: types.maybeNull(types.string),
    daily_budget: types.maybeNull(types.number),
    start_date: types.maybeNull(types.frozen()),
    end_date: types.maybeNull(types.frozen()),
    amount_spent: types.maybeNull(types.string),
    days_left: types.maybeNull(types.string),
    link_clicks: types.maybeNull(types.string),
    impressions: types.maybeNull(types.string),
    cpc: types.maybeNull(types.string),
    cpm: types.maybeNull(types.string),
    ctr: types.maybeNull(types.string),
    frequency: types.maybeNull(types.string),
    disable: types.maybeNull(types.boolean),
  })
  .actions((self) => ({
    init: flow(function* (start_date, end_date, project_id) {
      const { data } = yield http.get(
        `/api/insights/list?start_date=${start_date}&end_date=${end_date}&project_id=${project_id}`
      );
      Object.assign(self, data?.data || {});
    }),
    switchDisable: flow(function* (id) {
      const { data } = yield http.post(`/api/insights/disable`, {
        disable: !self.disable,
        project_id: id,
      });
      self.disable = !self.disable;
    }),
    update: flow(function* (id, updates) {
      console.log('.....update,,,,,,', updates);
      const { data } = yield http.post(`/api/insights/edit`, {
        project_id: id,
        ...updates,
      });
      Object.assign(self, updates);
    }),
  }))
  .views((self) => ({}));

export default EffectEntity;
