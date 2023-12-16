---
# 单独设置导航名称
title: Introduce 引导
nav: 组件API
order: 4
---

# Introduce 引导

用于分步引导用户了解产品功能的气泡组件,常用于引导用户了解产品功能。

## 简单使用

```jsx
import React, { useRef, useState } from 'react';
import { Introduce } from 'xhy-react';
import { Button, Divider, Space, Tour } from 'antd';

export default () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [open, setOpen] = useState < boolean > false;
  const steps = [
    {
      title: '步骤一',
      description: '步骤一说明',
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
    {
      title: '步骤二',
      description: '步骤二说明',
      target: () => ref2.current,
    },
    {
      title: '步骤三',
      description: '步骤三说明',
      target: () => ref3.current,
    },
  ];
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        开始引导
      </Button>

      <Divider />

      <Space>
        <Button ref={ref1}> 引导一</Button>
        <Button ref={ref2} type="primary">
          引导二
        </Button>
        <Button ref={ref3}>引导二</Button>
      </Space>
      <Introduce
        open={open}
        steps={steps}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
```

## API

Introduce 属性
<API></API>
