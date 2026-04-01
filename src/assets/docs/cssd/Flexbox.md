## 1.基本概念

一种高效的方式，来布局、对齐和分配容器中项目之间的空间，即使它们的大小未知或动态变化

Flexbox 布局与方向无关，这与常规布局（块级布局基于垂直方向，行内布局基于水平方向）不同，可以说是一维布局

容器会扩张项目以填充可用空间，或缩小项目以防止溢出

<img src="https://img.bloomm.dpdns.org/flexbox-1.png" alt="flexbox-1" style="zoom:50%;" />

- 将元素的display设置为flex，该元素称为flex容器，其子元素称为flex项目
- 主轴（main axis）：弹性元素布局的主要轴线，可以是水平也可以是垂直
- 主轴起始位置（main start）、主轴结束位置（main end）
- 交叉轴（cross axis）：垂直于主轴的轴，方向取决于主轴的方向
- 交叉轴起始位置（cross start）、交叉轴结束位置（cross end）



## 2.容器属性

### 2.1 开启弹性

flex容器可以是行内容器或块级容器

```css
display: flex; /* or inline-flex */
```



### 2.2 主轴方向

```css
flex-direction: row | row-reverse | column | column-reverse;
```



| value          | description |
| -------------- | ----------- |
| row            | 从左到右    |
| row-reverse    | 从右到左    |
| column         | 从上到下    |
| column-reverse | 从下到上    |



### 2.3 控制子项换行

```css
 flex-wrap: nowrap | wrap | wrap-reverse;
```



| value        | description                                                  |
| ------------ | ------------------------------------------------------------ |
| nowrap       | **默认值**，所有项目显示在同行；即使宽度总和超过容器宽度，也不会换行 |
| wrap         | 当一行无法容纳所有子项时，允许换行（交叉轴方向）             |
| wrap-reverse | 与 wrap类似，但换行时排列顺序相反                            |



> flex-flow为flex-direction和fiex-wrap的符合属性
>
> 比如，flex-flow: row nowrap;



### 2.4 主轴对齐

```css
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
```



Flexbox专用，仅参考主轴（推荐）

| value         | description                                                  |
| ------------- | ------------------------------------------------------------ |
| flex-start    | **默认值**，主轴起始位置对齐                                 |
| flex-end      | 主轴结束位置开始对齐                                         |
| center        | 居中                                                         |
| space-between | 项目均匀包裹在主轴方向上，第一个项目位于起点，最后一个项目位于终点 |
| space-around  | 项目均匀分布在一行中，与周围间距相等                         |
| space-evenly  | 任意项目间、项目与边缘的间距都相等                           |



逻辑关键字，参考书写模式（direction、writing-mode以及HTML元素属性dir）

| value | description        |
| ----- | ------------------ |
| start | 书写模式的起始位置 |
| end   | 书写模式的结束位置 |



物理关键字，参考物理左右边缘

仅在主轴为水平方向时有效；若主轴方向为垂直，浏览器会忽略该值或回退到flex-start

| value | description |
| ----- | ----------- |
| left  | 物理左      |
| right | 物理右      |



关于safe与unsafe关键字，用于处理对齐方式导致的溢出；详情请见：

[justify-content]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/



### 2.5 项目/交叉轴对齐

```css
align-items: stretch | flex-start | flex-end | center | baseline | first baseline | last baseline | start | end | self-start | self-end + ... safe | unsafe;
```



| value      | description                                                  |
| ---------- | ------------------------------------------------------------ |
| stretch    | **默认值**，若交叉轴方向没有设置元素的宽或高，则拉伸以填充容器 |
| flex-start | 交叉点开始位置对齐                                           |
| flex-end   | 交叉点结束位置对齐                                           |
| center     | 项目在交叉轴方向居中                                         |
| baseline   | 各个项目的基线对齐                                           |



### 2.6 内容/多行对齐

当交叉轴方向有额外空间时，类似于justify-content

但是作用于交叉轴，控制多行/多列在交叉轴上的空间分配

```css
align-content: flex-start | flex-end | center | space-between | space-around | space-evenly | stretch | start | end | baseline | first baseline | last baseline + ... safe | unsafe;
```



| value         | description                                  |
| ------------- | -------------------------------------------- |
| flex-start    | 交叉轴起始位置对齐                           |
| flex-end      | 交叉轴结束位置对齐                           |
| center        | 居中                                         |
| stretch       | 延伸以占据剩余空间                           |
| space-between | 第一行位于容器的开头，最后一行位于容器的结尾 |
| space-around  | 每行周围间距相等                             |
| space-evenly  | 任意行间、行与边缘的间距都相等               |



### 2.7 项目最小间距

项目间的距离大于gap属性值时，会显示较大值

```css
row-gap: 10px;
column-gap: 20px;
```





## 3.项目属性

> 主要针对主轴方向



### 3.1 显示顺序

默认情况下，弹性项目按照源顺序显示，order的默认值为0

order属性的**值可以为负数，越小，越先显示**

```css
order: 0;
```



### 3.2 弹性扩张

flex容器有剩余空间remains时，按比例分配给flex项目

```css
flex-grow: 0;
```



| value | description                 |
| ----- | --------------------------- |
| 0     | **默认值**，不分配剩余空间  |
| 正数  | 对应分配 (only/sum)*remains |

> only代表弹性子项的flex-flow属性值
>
> sum代表所有弹性子项的flex-flow属性值之和



### 3.3 弹性收缩

**与flex-grow相对**，flex容器空间不足，按比例压缩flex项目

```css
flex-shrink: 1;
```



| value | description                                          |
| ----- | ---------------------------------------------------- |
| 0     | 项目不缩小，即使超出容器宽度也不压缩，可能会导致溢出 |
| 正数  | **1为默认值**， 按比例压缩                           |



### 3.4 初始尺寸

lex-grow 和 flex-shrink 的计算都基于 flex-basis 确定的初始尺寸

| value   | description                                                  |
| ------- | ------------------------------------------------------------ |
| auto    | **默认值**，弹性项目的主轴尺寸由自身的宽或高、（＞）内容决定 |
| content | 弹性项目的主轴尺寸根据其内容大小来决定                       |
| 长度值  | 明确指定一个固定的弹性项目的主轴尺寸                         |
| 0       | 弹性项目初始不占据空间，由flex-grow决定                      |



### 3.5 独立交叉轴对齐

```css
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```



## 4.优秀思路

### 4.1 自适应照片布局

[]: https://css-tricks.com/adaptive-photo-layout-with-flexbox/



### 4.2 Flexbox中省略号失效解决

> 元素设置white-space: nowrap、overflow: hidden、text-overflow: ellipsis，强制文本在一行内显示，超出容器宽度的部分被隐藏，并在末尾显示省略号



原因：

​	省略号生效要求元素固定宽度或者受限宽度（即宽度不能由内容撑开）

​	flex项目的min-width默认值为auto（项目的实际宽度>=其内容最小宽度），导致宽度由内容撑开，无法溢出



方法1：

```css
.item {
  flex-grow: 1;
  width: 0;
}
```



方法2：

```css
.item {
  overflow: auto;
}
```

> 隐含地将min-width重置为 0



方法3：

```css
.item {
  overflow: auto;
  min-width: 0;
}
```

