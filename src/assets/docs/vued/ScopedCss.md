### 1.样式隔离

- 当 `<style>` 有scoped属性时，其中样式声明只影响当前组件的元素，称这种样式为Scoped CSS
- Vue在编译时，将Scope CSS中的**所有选择器转换为CSS属性选择器**，对应元素添上唯一的HTML5 自定义属性(以“data”开头)
- 父组件使用Scoped CSS，其样式默认也不会渗透到子组件中

优点：

- 组件样式互不干扰，避免全局命名冲突，实现样式隔离
- 添加 scoped属性即可使用，无需配置
- 无需 polyfill依赖
- 通过 data-v-属性可直观追溯样式来源，便于调试

### 2.补充：Polyfill

Polyfill是一种兼容处理技术，在运行时向旧浏览器环境注入缺失的API或者其模拟(Featrue)

实现方式：

- 创建新的全局对象
- 扩展内置对象原型，比如方法
- 添加静态方法到全局对象

<img src="https://img.bloomm.dpdns.org/polyfill-stream.png" alt="polyfill-stream" style="zoom:50%;" />

### 3.深度选择器

使用`:deep()`(伪类)包装Scoped CSS中的选择器，可以影响到子组件对应样式
