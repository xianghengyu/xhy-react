---
# 单独设置导航名称
title: SuperTable表格
nav: 组件API
order: 1
---

# SuperTable

SuperTable 是基于 ant design table 组件开发，结合日常开发过程中的项目场景，将常用的属性、事件回调整合到一起，简化开发流程。

## 设计特色

SuperTable 拥有增删改查包含搜索栏功能于一身，另外提供导出 excel、全屏等功能组件数据目前采用可控设计，将数据交给外部处理，所有操作通过回调函数形式完成，后续将开发自控组件，数据处理完全交给组件本身，开发者只需要配置接口、字段属性即可

## 何时使用

组件适用于任何单表页面使用，其自带的增删改查功能极大增加开发效率，同时功能模块为表格赋能

<font class="text-color-01" color="#f44336">*注意：因每个项目设计风格不统一，目前此组件只针对通用项目设计风格，其余特殊设计风格可钉钉相恒玉定制；</font>

```jsx
import { SuperTable } from 'xhy-react';
//表头
const columns = [
  {
    title: '姓名',
    align: 'center',
    dataIndex: 'name',
    key: 'name',
    dataType: 'input',
    search: true,
    required: true,
  },
  {
    title: '年龄',
    align: 'center',
    dataIndex: 'age',
    key: 'age',
    dataType: 'input',
    search: false,
    required: false,
  },
  {
    title: '住址',
    align: 'center',
    dataIndex: 'address',
    key: 'address',
    dataType: 'select',
    dataSource: [
      {
        label: '选项一',
        value: 'value1',
      },
      {
        label: '选项二',
        value: 'value2',
      }
    ],
    search: true,
    required: true,
  },
];
//表格数据
const dataSource = [
  {
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const searchInfo = (e) => { //顶部表单查询回调
  console.log(e);
}

const addInfo = (e) => {
  console.log('新增')
}

const deleteInfo = (e) => { //删除回调
  console.log(e)
}
const updateInfo = (e) => { //编辑回调
  console.log(e);
}

const pageInfoChange = (current, pageSize) => { //底部分页回调
  console.log(current);
  console.log(pageSize);
}

export default () => <SuperTable 
  bordered = {true}
  columns = {columns}
  dataSource = {dataSource} 
  onSearchBarFinish = {searchInfo} 
  onPageChange = {pageInfoChange}
  onAdd = {addInfo}
  onDelete = {deleteInfo}
  onUpdate = {updateInfo}
/>
```

## API

### 表格

SuperTable属性
<API src="./interface/tableProps.tsx"></API>
