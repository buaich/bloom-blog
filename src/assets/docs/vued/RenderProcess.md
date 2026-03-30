### 1.虚拟DOM

#### 1.1 相关概念

- 一种编程概念，将目标所需的UI通过数据结构 “虚拟”地表示出来，并保存在内存中，然后将真实的DOM与之保持同步
- 包含创建HTML元素所需的所有信息的JavaScript对象，称为虚拟结点
- 一个虚拟结点包含很多虚拟子结点 而构成一棵虚拟DOM树时，被称为该虚拟DOM树的根(虚拟)结点
- 运行时渲染器会遍历整个虚拟DOM树，来构建真实DOM树（**mount**）
- 如果有两份虚拟DOM树，运行时渲染器将遍历它们、比较并运用(即改变真实DOM)变化（**diffing**）

### 2.渲染管线

<img src="https://img.bloomm.dpdns.org/render-pipeline.png" alt="render-pipeline" style="zoom:50%;" />

- 编译：Vue模版会被编译成渲染函数(返回虚拟DOM树的根结点)
- 挂载：运行时渲染器调用渲染函数，得到并遍历虚拟DOM树，并创建真实DOM
- 更新：依赖变化后，组件的渲染函数重新执行，生成新的虚拟DOM树；然后运行时渲染器将新旧虚拟DOM树进行比较，并将必要的更新应用到真实DOM上

### 3.Diff

#### 3.1 根节点比较

- 当组件的渲染函数重新执行，产生新的虚拟 DOM 树后，首先会比较新旧两棵树的根节点
- 判断是否为相同节点：比较节点的tag、key等属性，以及当元素为\<input\> 时，额外检查 type 属性
  - **若不相同**：直接销毁旧节点及其子树，然后根据新根节点递归创建真实DOM，并替换掉旧的DOM 元素
  - **若相同**：进入更新流程，复用旧节点对应的真实 DOM 元素

#### 3.2 更新相同根节点

- 属性更新：如果新节点有属性，调用对应方法，比较新旧属性并更新到真实 DOM 上
- 处理子节点，分类讨论：
  - 文本节点，且与旧文本不同，则直接更新 DOM 的textContent属性
  - 有子节点（即 children数组）而旧节点没有，则清空旧 DOM 的内容，然后遍历新子节点依次创建并插入
  - 如果新节点没有子节点而旧节点有，则直接移除旧 DOM 的所有子节点
  - **如果都有子节点**，进行核心的子节点 Diff 比较

#### 3.3 子节点双端比较

- 这是 Vue 2 Diff 最经典的部分，使用四个指针分别指向新旧子节点列表的头尾，不断向中间靠拢

- 初始化：
  - `oldStartIdx = 0`, `oldEndIdx = oldChildren.length - 1`
  - `newStartIdx = 0`, `newEndIdx = newChildren.length - 1`
  - 同时缓存对应的虚拟节点：`oldStartVnode`, `oldEndVnode`, `newStartVnode`, `newEndVnode`
- **循环开始**：`oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx`
  - **旧头 vs 新头**
    如果 `oldStartVnode` 和 `newStartVnode` 是相同节点（通过 `sameVnode` 判断），则调用 `patchVnode` 更新这两个节点（递归处理它们的子节点），然后将两个头指针分别后移一位（`++oldStartIdx`, `++newStartIdx`）
  - **旧尾 vs 新尾**
    如果 `oldEndVnode` 和 `newEndVnode` 是相同节点，则调用 `patchVnode` 更新，然后将两个尾指针分别前移一位（`--oldEndIdx`, `--newEndIdx`）
  - **旧头 vs 新尾**
    如果 `oldStartVnode` 和 `newEndVnode` 是相同节点，说明 `oldStartVnode` 对应的真实 DOM 需要移动到尾部。先调用 `patchVnode` 更新内容，然后将旧头节点对应的 DOM 插入到旧尾节点对应的 DOM 之后（即当前 `oldEndVnode.el` 的后面），最后 `oldStartIdx++`, `newEndIdx--`
  - **旧尾 vs 新头**
    如果 `oldEndVnode` 和 `newStartVnode` 是相同节点，说明 `oldEndVnode` 对应的真实 DOM 需要移动到头部。先调用 `patchVnode` 更新，然后将旧尾节点对应的 DOM 插入到旧头节点对应的 DOM 之前（即当前 `oldStartVnode.el` 的前面），最后 `oldEndIdx--`, `newStartIdx++`
  - **如果以上四种情况都不满足**，说明需要借助 `key` 来查找可复用的节点：
    - 以新头节点 `newStartVnode` 的 `key` 为索引，在旧子节点列表中查找具有相同 `key` 的节点（Vue 2 会事先为旧子节点列表创建一个 `key` 到索引的映射表，或者每次遍历查找）
    - **如果找到且 `sameVnode` 成立**：将该节点对应的真实 DOM 移动到当前旧头节点之前，并调用 `patchVnode` 更新内容。同时，在旧列表中将该位置置为 `undefined`（表示已处理），然后 `newStartIdx++`
    - **如果没有找到或 key 不匹配**：则根据 `newStartVnode` 创建一个新的 DOM 节点，插入到旧头节点之前，然后 `newStartIdx++`

- **循环结束后**，还需要处理剩余节点：
  - 如果 `oldStartIdx > oldEndIdx`，说明旧子节点已经全部处理完，但新子节点还有剩余（`newStartIdx <= newEndIdx`）。此时需要遍历新子节点剩余部分，依次创建新 DOM 并插入到合适位置（通常是插入到 `oldEndVnode.el` 之后或父容器的末尾）

  - 如果 `newStartIdx > newEndIdx`，说明新子节点已经全部处理完，但旧子节点还有剩余（`oldStartIdx <= oldEndIdx`）。此时需要遍历旧子节点剩余部分，依次从 DOM 中移除

<img src="https://img.bloomm.dpdns.org/diff-1.png" alt="diff-1" style="zoom: 33%;" />

<img src="https://img.bloomm.dpdns.org/diff-2.png" alt="diff-2" style="zoom:33%;" />

<img src="https://img.bloomm.dpdns.org/diff-3.png" alt="diff-3" style="zoom:33%;" />

<img src="https://img.bloomm.dpdns.org/diff-4.png" alt="diff-4" style="zoom:33%;" />

<img src="https://img.bloomm.dpdns.org/diff-5.png" alt="diff-5" style="zoom:33%;" />

<img src="https://img.bloomm.dpdns.org/diff-6.png" alt="diff-6" style="zoom:33%;" />

<img src="https://img.bloomm.dpdns.org/diff-7.png" alt="diff-7" style="zoom:33%;" />

<img src="https://img.bloomm.dpdns.org/diff-8.png" alt="diff-8" style="zoom:33%;" />
