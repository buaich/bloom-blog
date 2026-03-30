### 1.子→父，自定义事件

①在子组件中注册自定义事件

```ts
const emit = defineEmits(["self-define-event"]);
```



②在父组件模版中，监听子组件实例的自定义事件

```ts
<ChildComponent @self-define-event="handler" />
```

注意，这个`handler`是父组件中定义的回调函数。



③子组件发送事件

```ts
emit("self-define-event", payload); 
```

注意，`payload`（负载）是我们传递的数据



### 2.任意，mitt

下载`mitt`：

```powershell
npm i mitt
```



在`src`目录下创建`utils/emitter.ts`：

```ts
import mitt from "mitt";

const emitter = mitt();

export default emitter;
```



在`main.ts`中导入`emitter`：

```ts
import emitter from "./utils/emitter";
```

加载上面的模块，调用`mitt()`会创建`mitt`实例`emitter`，组件文件（需要先导入）可以使用同一个`emitter`来实现类似Vue2中全局事件总线的作用。



> Global Event Bus：一个所有组件都可以握住，并收发消息的Vue实例。



`Header.vue`：

```vue
<script setup lang="ts" name="Header">
    import emitter from "@/utils/emitter";
    import { ref } from "vue";

    let username = ref("");
</script>

<template>
<div>
    <input
           type="text"
           v-model="username"
           placeholder="please input your name"
           @keyup="emitter.emit('userCome', username)"
           />
    </div>
</template>
```



`Footer.vue`：

```vue
<script setup lang="ts" name="Footer">
    import emitter from "@/utils/emitter";
    import { ref } from "vue";

    let username = ref("");
    emitter.on("userCome", (data) => {
        username.value = <string>data;
    });
</script>

<template>
<div>
    <hr />
    <p>username:{{ username }}</p>
    </div>
</template>
```



### *3.父↔子，v-model

①父组件模版中，在子组件实例上使用`v-model`

```vue
<ChildComponent v-model="data1">
```

等价于：

```vue
<ChildComponent :modelValue="data1" @update:modelValue="($event)=>{}">
```

注意，监听自定义事件，内联占位符$event代表emit()中payload的第一个参数。



②在子组件中声明接受的props（此时实现父->子）、自定义事件

```ts
defineProps(["modelValue"])
const emit = defineEmits(["update:modelValue"])
```



③子组件发送事件（此时实现子->父）

```ts
emit("update:modelValue",data2)
```



**自定义名称**

```vue
<ChildComponent v-model:data1="data1">
```

等价于：

```vue
<ChildComponent :data1="data1" @update:data1="($event)=>{}">
```



```ts
defineProps(["data1"])
const emit = defineEmits(["update:data1"])
```

注意，这里的自定义事件名必须有`update:`前缀！



```ts
emit("update:data1",data2)
```



### 4.祖↔孙，$attrs

①在爷爷组件模版中，传递props给父组件实例或者监听事件。

```vue
<ParentComponent data="hello world" @send-data="getData">
```



②在父组件模版中，将`$attrs`给子组件实例。

```vue
<ChildComponent v-bind="$attrs">
```



③在子组件中声明接收props（实现祖->孙）、自定义事件。

```ts
const emit = defineEmits(['send-data'])
defineProps(["data"])
```



④子组件中发送事件

```ts
emit("send-data",payload)
```



### 5.*父↔子，$refs和\$parent

注意，`$refs`和`$parent`是Vue组件实例属性。

- `$refs`：组件模版中，带有模版引用`ref="xxx"`的元素或者子组件实例的**集合**；需要`$refs.refName`拿到某一个
- `$parent`：当前组件的直接父组件实例



```vue
<button @click="handler1($parent)">拿到$parent组件实例属性</button>
<button @click="handler2($refs)">拿到$refs组件实例属性</button>
```



在挂载组件实例后也可以使用组合式API访问

```ts
onMounted(() => {
  const currentInstance = getCurrentInstance();
  const $refs = currentInstance?.proxy?.$refs as Record<
    string,
    ComponentPublicInstance
  >;
    
  const countRef = $refs.count as InstanceType<typeof Count>;
});
```



### 6.有血缘关系，provide()和inject()

- 提供数据，`provide(key, value)`。
- 收到数据，`inject(key[,defaultValue])`。



### 7.一个小问题

下面到底是以行内样式，还是以有`scoped`的style为主呢？



```ts
let color = ref("gray");

function change(newColor: string) {
  color.value = newColor;
}
```



下面的`backgroundColor` CSS属性是动态的。

```vue
<div :style="{ backgroundColor: color }">
<button @click="change('white')">change color</button>
```



```vue
<style scoped>
div {
   background-color: gray;
}
</style>
```



本身行内样式对应选择器的特异度为（1,0,0,0），而有`scoped`的\<style\>对应选择器的特异度为（0,0,2,0）；但是**后者始终要后插入到样式表**

