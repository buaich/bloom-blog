### 1.父->子组件通信

- 父组件模版中的子组件实例上添加属性，属性值为我们想要传递的数据，该属性称为prop
- 子组件中使用defineProps(propNameStringList)声明接受多个prop

`ParentComponent.vue`：

```vue
<script setup lang="ts" name="ParentComponent">
import ChildComponent from "./components/ChildComponent.vue";

let list = [];
let v = 1;
</script>

<template>
  <div>
    < ChildComponent :list="list" :v="v" />
  </div>
</template>
```



`ChildComponent.vue`：

```vue
<script setup lang="ts" name="ChildComponent">
    const props = defineProps(["list","v"])
</script>
```



### 2.子->父组件通信

**实际上用了闭包！**



- 父组件模版中的子组件实例上添加动态prop，属性值为有参函数
- 子组件中使用`defineProps()`声明接受这个prop
- 子组件可以调用该函数并传递数据



`ParentComponent.vue`：

```vue
 < ChildComponent :sendData="getData" />
```



`ChildComponent.vue`：

```vue
<script setup lang="ts" name="ChildComponent">
    const props = defineProps(["getData"])
</script>
```



### 3.Prop校验

运行时：JavaScript代码已经在浏览器或Node.js里开始执行的阶段



#### 3.1 要求类型

**（1）运行时**

```ts
defineProps({
    list:Array,
    v:Number,
})
```

`Array、Number`是运行时可访问的构造函数，还有`String`、`Boolean`、`Object`、`Date`、`Function`、`Symbol`、`Error`；还可以是自定义的类或构造函数，Vue通过`instanceof`检查类型是否匹配



若有多种类型：

```ts
defineProps({
    list:[Array, String],
    v:[Number, Boolean],
})
```



**（2）编译时**

```typescript
defineProps<{personList:PersonList; v:number}>()
```

`PersonList`是自定义TypeScript类型，`number`是TypeScript类型关键字。



若有多种类型：

```ts
defineProps<{ personList?: PersonList | string; v: number | boolean }>(),
```



#### 3.2 是否必须

**（1）运行时**

```ts
defineProps({
    list:{type:Array, required:true},
    v:{type:Number},
})
```

没有写`required`则非必须，有写`required`，由其值决定。



#### 2.3 validator自定义

```ts
defineProps({
    v: {
        type: Number,
        required: true,
        default: 0,
        validator(value, props): boolean {
            if (typeof value === "number" && value > 10) {
                return true;
            } else {
                return false;
            }
        },
    },
})
```



**（2）编译时**

```vue
defineProps<{personList:PersonList; v:？number}>()
```

没有写`?`则必须，有写`?`为非必须。



### 4.Prop默认值

Vue在**运行时**， 发现需要的prop没有值（特指undefined，即父组件没有声明该属性），会使用default设置的默认值；若没有设置，还是undefined



#### 3.1 对象声明中

- 原始类型的默认值，直接给字面量
- 对象类型的默认值，必须由一个接收原始prop作为参数的工厂函数返回

```ts
defineProps({
    personList: {
        type: Array,
        default(rawProps: PersonList) {
            return [];
        },
    },
    v: { type: Number, default: 0 },
});
```

注意，上面的`PersonList`只在编译时检查。



#### 3.2 泛型声明中

使用组合式API：`withDefaults()`

```ts
const props = withDefaults(
    defineProps<{ personList?: PersonList; v: Number }>(),
    {
        personList: () => [{ name: "default", age: 0 }],
        v: () => 0,
    }
);
```

注意，`props`仍然是一个Proxy响应式对象。



### 5.注意事项

- prop名称应当使用camelCase形式。
- 一个组件中只能写一次`defineProps()`，否则编译时报错。
- 调用`defineProps()`，返回值为Proxy响应式对象`props`；与`reactive`类似**，直接解构会失去响应性**！
- 解构`props`，若想保留响应性，需要使用响应式API`toRefs()/toRef()`。
- **所有的props都遵循单向绑定原则**