// 这是一个示例
import { types, getParent, getSnapshot } from 'mobx-state-tree';
import moment from 'moment';

const ProjectIntroduction = types
  .model('ProjectIntroduction', {
    project_name: types.string,
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
    start_date: types.string,
    end_date: types.maybeNull(types.string),
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

const ProjectAdProposal = types
  .model('ProjectAdProposal', {
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

const ProjectEntity = types
  .model('ProjectEntity', {
    id: types.number, // project ID
    name: types.string, // project 名称
    status: types.enumeration('Status', ['isRunning', 'draft', 'editing']), // 0 表示
    updateTime: types.string, // 更新时间（ISO 日期格式）
    introduction: types.maybeNull(ProjectIntroduction),
    settings: types.maybeNull(ProjectAdSettings),
    proposal: types.maybeNull(ProjectAdProposal),
  })
  .actions((self) => ({
    // 提交广告目标描述
    updateProjectIntroduction(introduction) {
      // POST /api/project/goal
      self.introduction = introduction;
    },
    updateProjectSettings(settings) {
      // POST /api/project
      self.settings = {
        ...settings,
        start_date: settings.start_date.format('YYYY-MM-DD'),
        end_date: settings.end_date?.format('YYYY-MM-DD'),
      };
      // 根据响应
      self.id = Math.floor(Math.random() * 100000);
      const projectList = getParent(self, 1);
      if (projectList) {
        const newProject = getSnapshot(self);
        projectList.addProject(newProject);
      }
    },
    updateProjectProposal(proposal) {
      self.proposal = proposal;
    },
  }))
  .views((self) => ({
    formatUpdateTime: () => {
      // 创建日期对象
      const date = moment(self.updateTime);
      return date.format('MMM, DD, YYYY');
    },
  }));

export default ProjectEntity;
