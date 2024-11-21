// 这是一个示例
import { types } from 'mobx-state-tree';

const CounterModel = types
  .model('Counter', {
    count: types.number, // 定义状态
  })
  .actions((self) => ({
    increment() {
      self.count += 1; // 定义状态变更的动作
    },
    decrement() {
      self.count -= 1;
    },
  }))
  .views((self) => ({
    double() {
      return self.count * 2; // 计算派生状态
    },
  }));

export default CounterModel;
