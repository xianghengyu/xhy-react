---
# 单独设置导航名称
title: SuperTable 表格
nav: 组件API
order: 1
---

# SuperTable

SuperTable 是基于 ant design table 组件开发，结合日常开发过程中的项目场景，将常用的属性、事件回调整合到一起，简化开发流程；
:::info{title=注意}
支持原组件所有 api，且原组件 api 拥有最高优先级，这个设计的目的是保证原组件功能的完全继承，通过 antProps 属性即可覆盖；
:::

## 设计特色

SuperTable 拥有增删改查包含搜索栏功能于一身，另外提供全屏、控表等功能组件数据目前采用可控设计，将数据交给外部处理，所有操作通过回调函数形式完成，后续将开发自控组件，数据处理完全交给组件本身，开发者只需要配置接口、字段属性即可

## 何时使用

组件适用于任何单表页面使用，其自带的增删改查功能极大增加开发效率，同时功能模块为表格赋能

:::info{title=注意}
因每个项目设计风格不统一，目前此组件只针对通用项目设计风格，如有特殊设计风格可钉钉相恒玉定制；
:::

### 简单使用

```jsx
import React, { useState } from 'react';
import { SuperTable } from 'xhy-react';

export default () => {
  const [loading, setLoading] = useState(false);
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
      title: '出生日期',
      align: 'center',
      dataIndex: 'birthDay',
      key: 'birthDay',
      dataType: 'date',
      search: true,
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
        },
      ],
      search: true,
      required: true,
    },
  ];
  //表格数据
  const dataSource = [
    {
      id: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
      birthDay: '1989-09-09',
    },
    {
      id: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      birthDay: '1989-09-09',
    }
  ];

  const searchInfo = (e) => {
    //顶部表单查询回调
    console.log(e);
  };

  const addInfo = (e) => {
    //新增回调
    console.log('新增');
  };

  const deleteInfo = (e) => {
    //删除回调
    console.log(e);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const updateInfo = (e) => {
    //编辑回调
    console.log(e);
  };

  const previewInfo = (e) => {
    //详情回调
    console.log(e);
  };

  const pageInfoChange = (current, pageSize) => {
    //底部 分页回调
    console.log(current);
    console.log(pageSize);
  };

  return (
    <SuperTable
      loading={loading}
      columns={columns}
      totalNum={100}
      dataSource={dataSource}
      onSearchBarFinish={searchInfo}
      onPageChange={pageInfoChange}
      onAdd={addInfo}
      onDelete={deleteInfo}
      onUpdate={updateInfo}
      onPreview={previewInfo}
    />
  );
};
```

### 开启拓展工具

设置 showTools 属性为 true 即可开启表格拓展工具

```jsx
import React, { useState } from 'react';
import { SuperTable } from 'xhy-react';

export default () => {
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
      search: true,
      required: false,
    },
  ];
  //表格数据
  const dataSource = [
    {
      name: '胡彦斌',
      age: 32,
    },
    {
      name: '胡彦祖',
      age: 42,
    },
  ];

  return (
    <SuperTable showTools={true} columns={columns} dataSource={dataSource} />
  );
};
```


### 开启表格选择

设置 openSelect 属性为 true 即可开启表格选中操作

```jsx
import React, { useState } from 'react';
import { SuperTable } from 'xhy-react';

export default () => {
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
      editable:true
    },
    {
      title: '年龄',
      align: 'center',
      dataIndex: 'age',
      key: 'age',
      dataType: 'input',
      search: true,
      required: false,
    },
  ];
  //表格数据
  const dataSource = [
    {
      id: '1',
      name: '胡彦斌',
      age: 32,
    },
    {
      id: '2',
      name: '胡彦祖',
      age: 42,
    },
  ];
  const onSelectChange = (e) => {
    console.log(e);
  }
  return (
    <SuperTable openSelect={true} showTools={true} columns={columns} dataSource={dataSource} onSelectChange={onSelectChange}/>
  );
};
```


### 开启可编辑表格

设置 openEditRow 属性为 true 即可开启表格可编辑行操作，onUpdate事件将会在保存时触发，更新数据请自行调更新接口后重新赋值表格数据；

```jsx
import React, { useState } from 'react';
import { SuperTable } from 'xhy-react';

export default () => {
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
      search: true,
      required: false,
    },
  ];
  //表格数据
  const dataSource = [
    {
      id: '1',
      name: '胡彦斌',
      age: 32,
    },
    {
      id: '2',
      name: '胡彦祖',
      age: 42,
    },
  ];
  const updateInfo = (info, record) => {
    console.log(info);
    console.log(record);
  }
  return (
    <SuperTable openEditRow={true} onUpdate={updateInfo} columns={columns} dataSource={dataSource} />
  );
};
```

### antProps 属性覆盖

设置 antProps 属性可覆盖此组件所有同名的属性，原始属性优先级最高,可以看到虽然我设置了 bordered 为 true，但是 antProps 中的属性会覆盖它；

```jsx
import React, { useState } from 'react';
import { SuperTable } from 'xhy-react';

export default () => {
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
      search: true,
      required: false,
    },
  ];
  //表格数据
  const dataSource = [
    {
      name: '胡彦斌',
      age: 32,
    },
    {
      name: '胡彦祖',
      age: 42,
    },
  ];

  return (
    <SuperTable
      bordered={true}
      antProps={{ bordered: false }}
      columns={columns}
      dataSource={dataSource}
    />
  );
};
```

## API

### 表格

SuperTable 属性
<API id="SuperTable"></API>

### 列

columns 属性
<API id="ColumnsProps"></API>
