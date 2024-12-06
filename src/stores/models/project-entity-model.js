// 这是一个示例
import { types, flow, getParent, getSnapshot } from 'mobx-state-tree';
import moment from 'moment';
import http from '../../utils/axiosInstance';

const ProjectIntroduction = types
  .model('ProjectIntroduction', {
    project_name: types.string, // project 名称
    project_introduction: types.string,
    project_goal_description: types.string,
    brand_id: types.string,
  })
  .actions((self) => ({}))
  .views((self) => ({
    formatUpdateTime: () => {
      // 创建日期对象
      const date = moment(self.updateTime);
      return date.format('MMM, DD, YYYY');
    },
  }));

const ProjectAdSettings = types
  .model('ProjectAdSettings', {
    website_url: types.maybeNull(types.string),
    daily_budget: types.number,
    start_date: types.frozen(),
    end_date: types.maybeNull(types.frozen()),
    target_countries: types.array(types.string),
  })
  .actions((self) => ({}))
  .views((self) => ({
    formatUpdateTime: () => {
      // 创建日期对象
      const date = moment(self.updateTime);
      return date.format('MMM, DD, YYYY');
    },
  }));

const NumberType = types.model('NumberType', {
  min: types.number,
  max: types.number,
});

const ProjectAdProposal = types
  .model('ProjectAdProposal', {
    ad_set_id: types.string, // project ID
    ad_set_title: types.string, // project 名称
    audience_description: types.string,
    audience_explanation: types.string,
    age_range: types.optional(NumberType, { min: 0, max: 1 }),
    genders: types.maybeNull(types.array(types.string)),
    geo_locations: types.maybeNull(types.array(types.string)),
    audience_tags: types.maybeNull(types.array(types.string)),
    audience_size_range: types.optional(NumberType, { min: 0, max: 1 }),
    daily_reach_size_range: types.optional(NumberType, { min: 0, max: 1 }),
    daily_clicks_range: types.optional(NumberType, { min: 0, max: 1 }),
    ad_copywriting_title: types.string,
    ad_copywriting_body: types.string,
    creative_meta_data_1x1: types.maybeNull(types.frozen()),
    creative_meta_data_9x16: types.maybeNull(types.frozen()),
    status: types.maybeNull(types.string), // 0 表示
    // types.string, // 0 表示
    selected: types.optional(types.boolean, false),
    // updateTime: types.string, // 更新时间（ISO 日期格式）
  })
  .actions((self) => ({
    setSelectedProposal: (selected) => {
      self.selected = selected;
    },
    updateCurrentAdProposal: (name, value) => {
      self[name] = value;
    },
  }));

const ProjectAdCampaign = types.model('ProjectAdCampaign', {
  daily_budget: types.number, // project ID
  start_date: types.frozen(),
  end_date: types.maybeNull(types.frozen()),
  project_goal: types.string,
  max_num_of_ad_sets: types.number,
  website_url: types.maybeNull(types.string),
});

const ProjectEntity = types
  .model('ProjectEntity', {
    project_id: types.string, // project ID
    status: types.enumeration('Status', [
      'UNSUBMITTED',
      'RUNNING',
      'PENDING',
      'SUBMITTED',
      'DELETE',
    ]), // 0 表示
    updated_at: types.maybeNull(types.frozen()), // 更新时间（ISO 日期格式）
    introduction: types.maybeNull(ProjectIntroduction),
    settings: types.maybeNull(ProjectAdSettings),
    proposal: types.maybeNull(types.array(ProjectAdProposal)),
    campaign: types.maybeNull(ProjectAdCampaign),
  })
  .actions((self) => ({
    getADProposal: flow(function* (id) {
      const { data } = yield http.get(`/api/project/${self.project_id}`);
      self.campaign = data?.campaign_proposal;
      self.proposal = data?.ad_set_proposals || [];
      return data.status;
    }),
    // 还没到提交的时候，静态更新
    updateProject: (updated) => {
      console.log('updateProject....', updated);
      self = { ...self, ...updated };
    },
    updateAdProposal: flow(function* (postData) {
      const { data } = yield http.post(
        `/api/project/${self.project_id}`,
        postData
      );
      self.campaign = data?.campaign_proposal;
      self.proposal = data?.ad_set_proposals || [];
    }),
    lauchDraft: flow(function* () {
      const select_ad_sets = (self.proposal || [])
        .filter((item) => item.selected)
        .map((item) => item.ad_set_id);
      yield http.post(`/meta/submit`, {
        select_ad_sets,
        brand_id: self.introduction.brand_id, // TODO 数据跟湛洋对一下，这里一个是数字，一个是字符串
        project_id: self.project_id,
      });
    }),
  }))
  .views((self) => ({
    formatUpdateTime: () => {
      // 创建日期对象
      const date = moment(self.updateTime);
      return date.format('MMM, DD, YYYY');
    },
  }));

export default ProjectEntity;
