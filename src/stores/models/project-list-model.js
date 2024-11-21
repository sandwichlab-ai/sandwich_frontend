// 这是一个示例
import { types } from 'mobx-state-tree';
import ProjectEntity from './project-entity-model';

const ProjectList = types
  .model('Counter', {
    list: types.array(ProjectEntity), // project 列表
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
    addProject(projectData) {
      self.list.push(projectData); // 添加新项目
    },
    removeProject(id) {
      self.list = self.list.filter((project) => project.id !== id); // 删除项目
    },
    updateProject(id, updates) {
      const project = self.list.find((project) => project.id === id);
      if (project) {
        Object.assign(project, updates); // 更新项目属性
      }
    },
  }));

export default ProjectList;
