// 这是一个示例
import { types, flow } from 'mobx-state-tree';
import dayjs from 'dayjs';
import ProjectEntity from './project-entity-model';
import http from '../../utils/axiosInstance';
import _ from 'lodash';

const ProjectList = types
  .model('Counter', {
    list: types.array(ProjectEntity), // project 列表
    currentProject: types.maybeNull(ProjectEntity), // 当前选中的 project
  })
  .actions((self) => ({
    init: flow(function* () {
      // const response = yield axios.get('/api/projects');
      const response = yield http.get('/api/projects');
      const updateList = response.data.map((item) => {
        const { start_date, end_date } = item.settings || {};
        start_date && (item.settings.start_date = dayjs(start_date, 'X'));
        end_date && (item.settings.end_date = dayjs(end_date, 'X'));
        return item;
      });
      // self.updateList(updateList);
      self.list = updateList;
    }),
    getCurrentProject: flow(function* (id) {
      if (self.list.length === 0) {
        yield self.init();
      }
      const project = self.list.find((project) => project.project_id === id);
      self.currentProject = project
        ? _.cloneDeep(project)
        : {
            project_id: '0',
            status: 'UNSUBMITTED',
            update_at: '',
          };
    }),
    // 还没到提交的时候，静态更新
    updateCurrentProject: (updated) => {
      console.log('updateProject....', updated);
      self.currentProject = { ...self.currentProject, ...updated };
    },
    addProject: flow(function* (projectData) {
      // 调用addProject API，然后获取到projectID
      const { introduction, settings, project_name, project_goal } =
        projectData;
      const reqData = {
        project_name,
        project_goal,
        ...introduction,
        ...settings,
        start_date: +dayjs(settings.start_date).format('X'),
        end_date: +dayjs(settings.end_date).format('X'),
      };
      const {
        data: { project_id },
      } = yield http.post('/api/project', reqData);
      projectData.project_id = project_id;
      projectData.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
      self.currentProject = projectData;
    }),
    removeProject: flow(function* (id) {
      const {
        data: { message, error },
      } = yield http.delete(`http://47.129.43.201:8080/api/project/${id}`);
      if (message) {
        self.list = self.list.filter((project) => project.project_id !== id); // 删除项目
      }
    }),
    updateProject: flow(function* (id, updates) {
      console.log('updateProject....', updates);
      // yield axios.post(`/api/project/${id}`);
      yield http.post(`/api/project/${id}`, updates);
      const project = self.list.find((project) => project.id === id);
      if (project) {
        Object.assign(project, updates); // 更新项目属性
      }
    }),
  }));

export default ProjectList;
