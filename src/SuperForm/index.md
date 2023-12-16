---
# 单独设置导航名称
title: SuperForm 表单
nav: 组件API
order: 2
---

# SuperForm

SuperForm 是基于 ant design Form 组件开发，结合日常开发过程中的项目场景，将常用的属性、事件回调整合到一起，简化开发流程；
:::info{title=注意}
支持原组件所有 api，且原组件 api 拥有最高优先级，这个设计的目的是保证原组件功能的完全继承，通过 antProps 属性即可覆盖；
:::

## 设计特色

SuperForm 数据处理完全交给组件本身，开发者只需要配置字段属性即可

## 何时使用

组件适用于任何单表页面使用，其自带的增删改查功能极大增加开发效率，同时功能模块为表格赋能

:::info{title=注意}
因每个项目设计风格不统一，目前此组件只针对通用项目设计风格，如有特殊设计风格可钉钉相恒玉定制；
:::

### 简单使用（纵向）

```jsx
import React, { useState } from 'react';
import { SuperForm } from 'xhy-react';

export default () => {
  //表头
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      dataType: 'input',
      required: true,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      dataType: 'input',
      required: false,
    },
    {
      title: '时间',
      dataIndex: 'date',
      dataType: 'datetime',
      required: false,
      antItemProps: {},
    },
  ];
  const searchInfo = (e) => {
    console.log(e);
  };
  const resetInfo = () => {
    console.log('重置');
  };
  return (
    <SuperForm
      antProps={{}}
      columns={columns}
      onSearchBarFinish={searchInfo}
      onReset={resetInfo}
    ></SuperForm>
  );
};
```

### 简单使用（横向）

```jsx
import React, { useState } from 'react';
import { SuperForm } from 'xhy-react';

export default () => {
  //表头
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      dataType: 'input',
      required: true,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      dataType: 'input',
      required: false,
    },
    {
      title: '时间',
      dataIndex: 'date',
      dataType: 'datetime',
      required: false,
    },
  ];
  const searchInfo = (e) => {
    console.log(e);
  };
  return (
    <SuperForm
      type="line"
      columns={columns}
      onSearchBarFinish={searchInfo}
    ></SuperForm>
  );
};
```

## API

<API id="SuperForm"></API>
