// 这是一个示例
import { types, flow } from 'mobx-state-tree';
import dayjs from 'dayjs';
import ProjectEntity from './project-entity-model';
import axios from 'axios';

const ProjectList = types
  .model('Counter', {
    list: types.array(ProjectEntity), // project 列表
    currentProject: types.optional(ProjectEntity, {
      id: '0',
      status: 'editing',
      updateTime: '',
    }), // 当前选中的 project
  })
  .actions((self) => ({
    init: flow(function* () {
      const response = yield axios.get('/api/projects');
      const updateList = response.data.map((item) => {
        const { start_date, end_date } = item.settings || {};
        start_date && (item.settings.start_date = dayjs(start_date));
        end_date && (item.settings.end_date = dayjs(end_date));
        return item;
      });
      // self.updateList(updateList);
      self.list = updateList;
    }),

    setCurrent(id) {
      self.currentProject =
        self.list.find((project) => project.id === id) || null;
    },
    updateCurrentProject(project) {
      if (self.currentProject) {
        Object.assign(self.currentProject, project);
      } else {
        self.currentProject = project;
      }
    },
    addProject: flow(function* (projectData) {
      // 调用addProject API，然后获取到projectID
      console.log(33333, projectData);
      const {
        data: { project_id },
      } = yield axios.post('/api/project', projectData);
      projectData.id = project_id;
      self.list.push(projectData); // 添加新项目
    }),
    removeProject(id) {
      self.list = self.list.filter((project) => project.id !== id); // 删除项目
    },
    updateProject: flow(function* (id, updates) {
      // yield axios.post(`/api/project/${id}`);
      yield axios.post(`/api/project/project_id`);
      const project = self.list.find((project) => project.id === id);
      if (project) {
        Object.assign(project, updates); // 更新项目属性
      }
    }),
  }));

export default ProjectList;
