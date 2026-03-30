### 1.Vue3声明周期图

<img src="https://img.bloomm.dpdns.org/vue3%E5%A3%B0%E6%98%8E%E5%91%A8%E6%9C%9F.png" alt="vue3声明周期" style="zoom:50%;" />

### 2.组合式声明周期钩子

定义：在组件特定声明周期阶段被调用的函数。（常用的有6个）

注意，setup 本身不是声明周期钩子，而是组件入口函数，执行时机早于任何声明周期钩子的调用

| 阶段               | Vue2 选项式                                     | Vue3 组合式钩子       |
| ------------------ | ----------------------------------------------- | --------------------- |
| 创建前             | `beforeCreate`（函数作为属性值，ES6字面量写法） | setup 本身替代        |
| 创建后             | `created`                                       | setup 本身替代        |
| 挂载前             | `beforeMount`                                   | `onBeforeMount()`     |
| 挂载后             | `mounted`                                       | `onMounted()`         |
| 更新前             | `beforeUpdate`                                  | `onBeforeUpdate()`    |
| 更新后             | `updated`                                       | `onUpdated()`         |
| 卸载前             | `beforeDestroy`                                 | `onBeforeUnmount()`   |
| 卸载后             | `destroyed`                                     | `onUnmounted()`       |
| 捕获子孙错误       | `errorCaptured`                                 | `onErrorCaptured()`   |
| 渲染追踪           | —                                               | `onRenderTracked()`   |
| 渲染触发           | —                                               | `onRenderTriggered()` |
| 激活（keep-alive） | `activated`                                     | `onActivated()`       |
| 停用（keep-alive） | `deactivated`                                   | `onDeactivated()`     |

### 3.自定义组合式API

与React中自定义Hook异曲同工！

- **需要将紧密联系的响应式状态和函数封装**
- 在项目目录下，创建一个`hooks`子目录
- `hooks`目录下，创建TypeScript文件；在React世界中，我们约定俗成将其命名为`useXxx.ts`
- 在`useXxx.ts`中，我们将hook定义成一个函数并使用默认导出

`useTask.ts`：

```ts
import { onMounted, reactive, ref } from "vue";
import type { Task, TaskList } from "../types";

export default function () {
  let tasks = reactive<TaskList>([]);
  let taskId = ref<number>(0); //任务（自增）id
  let taskName = ref<string>("please input task name then enter!");

  function addTask() {
    if (taskName.value !== "") {
      // 创建一条新的任务
      let task = ref<Task>({
        id: ++taskId.value,
        name: taskName.value,
        date: new Date().toLocaleString(),
        isFinish: false,
      });

      tasks.push(task.value);
      taskName.value = "";
      console.log("<log>:function addTask success!");
    }
  }

  onMounted(() => {
    addTask();
  });

  return { tasks, taskName, addTask };
}
```

`TaskList.vue`：

```vue
<script lang="ts" setup name="TaskList">
import useTask from "../hooks/useTask";

let { tasks, taskName, addTask } = useTask();
</script>

<template>
  <div>
    <input type="text" @keyup.enter="addTask()" v-model="taskName" />
    <button @click="addTask">create</button>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.name }}:{{ task.date }}:{{ task.id }}
      </li>
    </ul>
  </div>
</template>
```

**为什么`taskId`可以自增呢？**

> ​ 定义`useTask()`时，内部变量登记到词法环境记录中；JavaScript引擎执行组件中"`let {tasks, taskName, addTask} = useTask();`"时，创建运行时词法环境（一个对象），将`useTask()`内部ref/reactive放入其中；当调用`addTask()`时，需要的变量值由运行时词法环境->外层环境 ->...->全局中寻找；而`taskId`是真真切切地存在于内存中的！

`taskId` 以 `ref` 形式存在于`addTask()`所依赖的闭包词法环境对应的内存中，因此每次 `addTask()` 都能拿到同一份数据并自增。

**闭包 = 内部函数+ 内部函数对外部函数运行时词法环境对象的引用。**
