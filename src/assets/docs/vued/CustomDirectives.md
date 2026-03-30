### 1.初识自定义指令

- 就是一个包含类似组件声明周期钩子的对象

- Vue2中自定义指令执行时机：
  - bind()在指令与元素成功绑定时仅调用一次
  - inserted()在被绑定元素插入父元素时调用（内存中）
  - update()在指令所在组件的VNode更新时调用
  - componentUpdated()在指令所在组件的VNode及其子组件的VNode全部更新后调用
  - unbind()在指令与元素解绑时仅调用一次

```vue
directives: {
    add: {
      bind(element, binding, vnode) {},

      inserted(element, binding, vnode) {},

      update(element, binding, vnode, oldVnode) {},

      componentUpdated(element, binding, vnode, oldVnode) {},

      unbind(element, binding, vnode) {},
    },
  },
```

"成功绑定时、所在模版被重新解析时"

- Vue3中自定义指令的执行时机：
  - created() 在绑定元素的属性前或事件监听器应用前调用
  - beforeMount() 在元素被插入到 DOM 前调用
  - mouted() 在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
  - beforeUpdate() 绑定元素的父组件更新前调用
  - updated() 在绑定元素的父组件及他自己的所有子节点都更新后调用
  - beforeUnmount() 绑定元素的父组件卸载前调用
  - unmounted() 绑定元素的父组件卸载后调用

```js
const myDirective = {
  created(el, binding, vnode) {},

  beforeMount(el, binding, vnode) {},
  
  mounted(el, binding, vnode) {},

  beforeUpdate(el, binding, vnode, prevVnode) {},

  updated(el, binding, vnode, prevVnode) {},
    
  beforeUnmount(el, binding, vnode) {},

  unmounted(el, binding, vnode) {}
}
```

- `el`：指令绑定到的元素。这可以用于直接操作 DOM
- `binding`：一个对象，包含以下属性
  - `value`：传递给指令的值
  - `oldValue`：之前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否更改，它都可用
  - `arg`：传递给指令的参数 
  - `modifiers`：一个包含修饰符的对象 
  - `instance`：使用该指令的组件实例
  - `dir`：指令的定义对象
- `vnode`：代表绑定元素的底层 VNode
- `prevVnode`：代表之前的渲染中指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用