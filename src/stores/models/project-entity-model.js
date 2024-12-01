// 这是一个示例
import { types, flow, getParent, getSnapshot } from 'mobx-state-tree';
import moment from 'moment';
import dayjs from 'dayjs';
import axios from 'axios';

const ProjectIntroduction = types
  .model('ProjectIntroduction', {
    project_name: types.string, // project 名称
    project_introduction: types.string,
    project_goal_description: types.string,
    brand_id: types.identifierNumber,
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
    link: types.string,
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
    adset_id: types.string, // project ID
    adset_title: types.string, // project 名称
    audience_description: types.string,
    audience_explanation: types.string,
    age_range: types.optional(NumberType, { min: 0, max: 1 }),
    gender: types.array(types.string),
    geo_locations: types.array(types.string),
    audience_tags: types.array(types.string),
    audience_size_range: types.optional(NumberType, { min: 0, max: 1 }),
    daily_reach_size_range: types.optional(NumberType, { min: 0, max: 1 }),
    daily_clicks_range: types.optional(NumberType, { min: 0, max: 1 }),
    ad_copywriting_title: types.string,
    ad_copywriting_body: types.string,
    ad_creative_image_square_url: types.string,
    ad_creative_image_9x16_url: types.string,
    status: types.number, // 0 表示
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
  max_num_of_adsets: types.number,
});

const ProjectEntity = types
  .model('ProjectEntity', {
    id: types.string, // project ID
    status: types.enumeration('Status', ['isRunning', 'draft', 'editing']), // 0 表示
    updateTime: types.string, // 更新时间（ISO 日期格式）
    introduction: types.maybeNull(ProjectIntroduction),
    settings: types.maybeNull(ProjectAdSettings),
    proposal: types.maybeNull(types.array(ProjectAdProposal)),
    campaign: types.maybeNull(ProjectAdCampaign),
  })
  .actions((self) => ({
    getADProposal: flow(function* (id) {
      const { data } = yield axios.get(`/api/project/project_id`);
      self.campaign = data?.campaign_proposal;
      self.proposal = data?.adset_proposals || [];
    }),
    updateAdProposal: flow(function* (postData) {
      const { data } = yield axios.post(`/api/project/project_id`, postData);
      self.campaign = data?.campaign_proposal;
      self.proposal = data?.adset_proposals || [];
    }),
    lauchDraft: flow(function* () {
      const select_ad_sets = self.proposal
        .filter((item) => item.selected)
        .map((item) => item.adset_id);
      console.log('...select_ad_sets........', select_ad_sets);
      const { data } = yield axios.post(`/api/project/project_id/submit`, {
        select_ad_sets,
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
