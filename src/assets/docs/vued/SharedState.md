### 1.hello,Pinia！

一个拥有组合式API的Vue状态管理库，可以实现跨组件或页面共享状态。

直接用响应式API也可以定义全局状态供组件共享，但会显得“简陋”并发生一些安全问题。

#### 1.1 与Vuex（<=4）的区别

- Pinia弃用mutation，mutation本来是用于集成devtools的。
- 不需要自定义复杂包装器来支持TypeScript。
- Pinia不再有嵌套结构以及可命名的模块（Vuex），采用扁平化设计，更加容易管理和维护状态。

#### 1.2 安装

```powershell
npm i pinia
```

### 2.定义Store

我们需要一个保存全局状态及其业务逻辑的实体，因此需要先定义其构造函数。

比如，在`store/user.ts`中定义一个Store（构造函数）：

```ts
import { defineStore } from "pinia";

export const useIdStore = defineStore("id", {});
```

- Pinia官方推荐将`defineStore()`返回的函数命名成`useIdStore`。（有点像hooks）
- 第一个参数是唯一名字，第二个参数定义该Store的状态和行为（state、getter、action），通常是Option对象或者Setup函数。

​

#### 2.1 Option Store和Setup Store

```ts
export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
  }),
  getters: {
    nameLowerCase: (state) => state.name.toLowerCase(),
  },
  actions: {
    printName() {
      console.log(this.name);
    },
  },
});
```

```ts
export const useUserStore = defineStore("user", () => {
  const name = ref("");
  const nameLowerCase = computed(() => name.value.toLowerCase());
  function printName() {
    console.log(name.value);
  }

  return { name, nameLowerCase, printName };
});
```

**Store定义函数中不能有私有属性，并且必须返回所有状态和行为。**

在Setup Store中：

- ref→state
- computed→getters
- function→action

#### 2.2 组件中获取store

store就是Store实例，其实是**一个reactive**，因此我们不能直接解构store。🤣

```ts
import { useUserStore } from "./store/user";

const store = useUserStore();
```

但是我们需要使用`store.$state.name`才能拿到。

#### 2.3 解构store

响应式状态需要使用`storeToRefs()`为响应式属性创建引用，action可以直接解构出来（闭包）。

```ts
const { name, nameLowerCase } = storeToRefs(store);
const { printName } = store;
```

### 3.三个核心

<img src="https://img.bloomm.dpdns.org/pinia-state-flow.png" alt="pinia-state-flow" style="zoom:50%;" />

#### 3.1 state

在Pinia中，state是一个返回初始状态的函数。

##### （1）基本操作

- 使用store直接访问和更新单个状态。
- 可以定义并暴露一个`$reset()`，用于将state重置为初始值。
- `store.$patch()`，参数可以是补丁对象，也可以是接受state的函数（更灵活）。
- 通常不能直接赋值来替换state，但也使用使用`store.$patch()`实现。

##### （2）订阅state变更与取消

直接使用Vue中的`watch()`在每次state变化后会立即触发，而下面的`store.$subscribe()`在`$patch()`调用后只触发一次，但实际上也是用到了`watch()`。

```ts
let unsubscribe: any = null;
onMounted(() => {
    unsubscribe = store.$subscribe((mutation, state) => {});
```

mutation参数（对象）的属性：

- type：状态变化的类型，direct表示直接通过store修改、action表示使用action（方法）修改。
- storeId：当前状态所属的store的ID。

#### 3.2 getter

getter完全等同于store的state的计算值，大多数仅仅依赖state，有时也会用到其他getter。

- 可以通过`this`访问到整个Store实例。

#### 3.3 action

action相当于组件的method，用于定义业务逻辑。

##### （1）基本操作

- 可以通过`this`访问到整个Store实例。
- 通常会用到`async`，`await`进行异步操作，比如HTTP请求。
- 可以访问其他store的action。

##### （2）订阅action并取消

```ts
const unsubscribe = store.$onAction(({ name, store, args, after, onError }) => {} [,true]);

unsubscribe();
```

### 4.Pinia插件

我们希望扩展Pinia的功能：

- 将全局对象添加到所有store上。
- 本地存储。
- ......

#### 4.1 定义Pinia插件

一个接收可选参数context的函数，返回值**将**会被添加到store的属性。

```ts
function myPiniaPlugin(context) {}
```

#### 4.2 使用Pinia插件

```ts
pinia.use(myPiniaPlugin);
```
