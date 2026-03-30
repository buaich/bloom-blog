Vue Directives，当响应式依赖变化时，声明式引起DOM变化的语法糖。

### 1.v-bind

简写形式为 “`:`”。



#### 1.1 绑定样式class

```html
:class=""
```

`""`中的值为：

- 普通/响应式对象，其属性名为style class名，属性值为boolean值。
- 数组，最终元素都为字符串。



在组件元素上使用，“`<MyComponent :class=''>`”时：

- 单根元素，可以直接接收class。
- 多根元素，`<template>`中使用`$attrs`来指定。



#### 1.2 绑定内联样式

```html
:style=""
```

`""`中的值为：

- 对象，`camelCase`或者`kebab-cased`形式的key。
- 一个响应式对象。
- 一个数组。



当`:style`中使用了浏览器不支持的CSS属性时，Vue会自动加上相应的属性值前缀；也可以为一个CSS属性以数组的形式提供多个属性值，以便适应不同浏览器的兼容性。



### 2.v-if和v-show

通常用于**条件渲染**。



#### 2.1 v-if、v-else-if、v-else

```html
<div v-if="type === 1"></div>
<div v-else-if="type === 2"></div>
<div v-else></div>
```

- `""`为JavaScript表达式，当为`true`时，元素才会被创建并插入DOM。
- 使用`v-else-if`和`v-else`的前提：保证同一父级下先声明的兄弟元素中有使用`v-if`。
- **可以**在`<template>`上使用。



#### 2.2 v-show

```html
<div v-if=""></div>
```

- 该`<div>`存在于DOM中，不因`v-if`中JavaScript表达式的真假而创建或销毁；`v-if`改变是CSS属性：`display:"none";`。
- **不可以**在`<template>`上使用，不能和`v-else`搭配。



##### 与v-if比较

- `v-if`是惰性的，若初始条件值为`false`，不会进行任何操作；`v-show`，无论初始条件值是什么，DOM元素都会渲染
- 频繁切换，使用`v-show`；条件很少改变，使用`v-if`



### 3.v-for

通常用于**列表渲染**。

在组件元素上使用`v-for`，不会自动将迭代项注入（即组件中无法直接使用），通常需要使用props。



#### 3.1 简单遍历

##### （1）遍历一个数组

```vue
<ul>
    <li v-for="el in arr">
        <p>{{el}}</p>
    </li>
</ul>

<ul>
    <li v-for="el of arr">
        <p>{{el}}</p>
    </li>
</ul>

<ul>
    <li v-for="(item, index) in arr">
        <p>{{item.key1}}</p>
    </li>
</ul>

<ul>
    <li v-for="({name}, index) in arr">
        <p>{{name}}</p>
    </li>
</ul>
```

- Vue中，`in`和`of`都可以用来迭代。
- 可以解构（当前）迭代项。



##### （2） 遍历一个对象

```vue
<ul>
    <li v-for="value in obj">
        <p>{{value}}</p>
    </li>
</ul>

<ul>
    <li v-for="value of obj">
        <p>{{value}}</p>
    </li>
</ul>

<ul>
    <li v-for="(value, key) in obj">
        <p>{{key}}:{{value}}</p>
    </li>
</ul>

<ul>
    <li v-for="({name}, key) in obj">
        <p>{{key}}:{{value}}</p>
    </li>
</ul>


<ul>
    <li v-for="(value, key, index) in obj">
        <p>{{key}}:{{value}}</p>
    </li>
</ul>
```



##### （3）遍历一个整数值

注意，**n的起始值为1！**

```vue
<ul>
    <li v-for="n in 10">
        <p>{{n}}</p>
    </li>
</ul>
```



#### 3.2 与v-if比较

在同一个DOM元素中使用时，`v-if`比`v-for`的优先级高！

`v-for`可以访问到`v-if`中的变量，但是`v-if`不能访问到`v-for`中的变量......

外包装`<template>`上使用`v-for`解决：

```vue
<template v-for="el in source">
<li v-if="el.isCapital">
    {{el.name}}
    </li>
</template>
```



#### 3.3 通过key管理状态

没有`key`时，Vue按照index顺序，比较新旧虚拟DOM节点，若不同则直接更新（就地更新）。

有`key`时，根据key的变化后顺序进行重排DOM节点；key不存在的DOM被销毁，新key对应DOM节点新建并插入。

通常使用`v-bind`，保持key的唯一性。

```vue
<template v-for="el in source" :key="el.id">
<li v-if="el.isCapital">
    {{el.name}}
    </li>
</template>
```



#### 3.4 侦测响应式数组变化

Vue能够侦听响应式数组的变更方法，并在他们被调用时触发更新。

- `push()`
- `pop()`
- `shift()`
- `splice()`
- `sort()`
- `reverse()`



`filter()`、`concat()`、`slice()`返回的是新数组，不会更改原数组；我们可以使用计算属性。

上面变更原数组的方法需要使用计算属性，通常先创建副本“`[...arr]`”。



### 4.v-on

简写形式为“`@`”，通常用于**事件处理**，监听DOM事件，并在事件触发式执行对应的处理器handler。

可以所有绑定原生DOM事件，也可以绑定组件自定义事件！



#### 4.1 常见DOM事件

```vue
<div @click="handler"></div>
```

`handler`可以是：

- 内联事件处理器，即直接将JavaScript写入。
- 方法事件处理器，自动接收原生DOM事件`event`，可以通过`event.target`访问到该DOM节点。



#### 4.2 事件修饰符 

event modifier，声明式，控制事件行为的语法糖。



| 事件修饰符 | 描述                                                   |
| ---------- | ------------------------------------------------------ |
| `.stop`    | 阻止冒泡                                               |
| `.prevent` | 阻止默认行为                                           |
| `.self`    | 仅所在元素触发                                         |
| `.capture` | 捕获阶段触发                                           |
| `.once`    | 单次触发                                               |
| `.passive` | 提前告诉浏览器此事件监听器里不会调用`preventDefault()` |

- 注意声明顺序。`@click.prevent.self`阻止元素及其子元素所有点击事件的默认行为，`@click.self.prevent`只阻止该元素本身的点击事件的默认行为。
- `.passive`和`.prevent`不同时使用。



**按键修饰符**

用于键盘事件监听。



**鼠标按键修饰符**

用于特定鼠标按键触发事件监听。



### 5.v-model

声明式，响应式状态双向绑定的语法糖。



#### 5.1 用于文本输入

使用`v-bind`和`v-on`绑定`input`事件，实现将表单输入内容同步给JavaScript变量‘😂：

```vue
<input
       type="text"
       :value="v"
       @input="(event) => (v = event.target.value)"
       />

<textarea 
          :value="v"
          :input="(event) => (v = event.target.value)"
          ></textarea>
```

等效于下面'🤣'：

```vue
<input v-model="v" />
<textarea v-model="v"></textarea>
```



#### 5.2 用于复选框

##### （1）单复选框

```vue
<input type="checkbox" v-model="checked" />
```



##### （2）多复选框

```ts
let hobbies = ref(["sing"]);
const options = ref(["sing", "dance", "code"]);
```



```vue
<label v-for="(option, index) of options" :key="index">
    <input
           type="checkbox"
           :value="option"
           :checked="hobbies.includes(option)"
           @change="
                    (event) => {
                    if (event.target.checked) {
                    hobbies.push(option);
                    } else {
                    hobbies.splice(hobbies.indexOf(option), 1);	//将该项从数组中删除
                    }
                    }
                    "
           />
    {{ option }}
</label>
```

等价于：

```vue
<label v-for="(option, index) of options" :key="index">
    <input type="checkbox" :value="option" v-model="hobbies" />
    {{ option }}
</label>
```



#### 5.3 单选按钮

```vue
<label>
    <input
           type="radio"
           value="male"
           :checked="sex === 'male'"
           @change="
                    (event) => {
                    sex = event.target.value;
                    }
                    "
           />
    male
</label>
<label>
    <input
           type="radio"
           value="female"
           :checked="sex === 'female'"
           @change="
                    (event) => {
                    sex = $event.target.value;
                    }
                    "
           />
    female
</label>
```



```vue
<label>
    <input type="radio" value="male" v-model="sex" />
    male
</label>
<label>
    <input type="radio" value="female" v-model="sex" />
    female
</label>
```



#### 5.4 选择器

##### （1）单选

```ts
let v = ref("");
```



```vue
<select :value="v" @change="(event) => (v = event.target.value)">
    <option>1</option>
    <option>2</option>
    <option>3</option>
</select>
```

`<option>`中没有显式声明value属性，那么其文本内容作为其value值。

等价于：

```vue
<select v-model="v">
    <option>1</option>
    <option>2</option>
    <option>3</option>
</select>
```



##### （2）多选

```ts
let arr = ref([]);
```



```vue
<select
        :value="nums"
        @change="
                 (event) =>
                 (nums = Array.from(
                 event.target.selectedOptions,
                 (option) => option.value
                 ))
                 "
        multiple
        >
    <option disabled value="">select next</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
</select>
```



```vue
<select v-model="arr" multiple>
    <option>1</option>
    <option>2</option>
    <option>3</option>
</select>
```

