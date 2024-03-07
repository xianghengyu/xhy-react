---
# 单独设置导航名称
title: SCPoint 埋点
nav: 组件API
order: 11
---

# SCPoint 埋点
日常开发过程中可能遇到埋点的需求，通过SCPoint组件可以轻松实现，开发人员只需要传入埋点ID、内容、监听事件即可，无需关心监听逻辑。该组件融合了点击、曝光事件回调，可以满足开发需求，具体使用请查看API文档

## 设计特色

SCPoint组件是基于[IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver) API实现，可以实现对页面元素的监听，当元素进入/离开页面时，触发对应事件，有关该API的详细使用可查看MDN文档。
* 曝光原理使用的是intersectionRatio参数，当元素与页面视窗有重叠就算未完全展示也判断为曝光；
* 该组件支持同时监听多个元素；
* 埋点内状态独立，互不影响；


## 简单使用
定义一个简单的曝光埋点，并在曝光埋点事件内打印埋点内容和事件参数，打开控制台查看效果。

```jsx
import React, { useState } from 'react';
import { SCPoint } from 'xhy-react';
import { Button } from 'antd';

export default () => {
    const pointShow = (value) => {
        console.log('曝光事件1');
        console.log(value);
    }
  return (
    <SCPoint id='point1' reportContent="埋点内容1" onPointShow={pointShow} >
      <Button type="primary">曝光埋点测试</Button>
    </SCPoint>
  );
};
```


## 曝光点击混合埋点
如果需要同时监听曝光和点击事件，可以使用onPointShow和onPointClick属性，打开控制台查看效果。

```jsx
import React, { useState } from 'react';
import { SCPoint } from 'xhy-react';
import { Button } from 'antd';

export default () => {
    const pointShow = (value) => {
        console.log('曝光事件2');
        console.log(value);
    }
    const pointClick = (value) => {
        console.log('点击事件2');
        console.log(value);
    }
  return (
    <SCPoint id='point2' reportContent="埋点内容2" onPointShow={pointShow} onPointClick={pointClick}>
      <Button type="primary">曝光点击混合测试</Button>
    </SCPoint>
  );
};
```

## 单次页面访问重复触发曝光事件
埋点内容出现在视窗内会触发曝光事件，如果设置reportAllways为true，当埋点消失后再次出现也会触发曝光事件，打开控制台查看效果。

```jsx
import React, { useState } from 'react';
import { SCPoint } from 'xhy-react';
import { Button } from 'antd';

export default () => {
    const pointShow = (value) => {
        console.log('重复曝光事件3');
        console.log(value);
    }
  return (
    <SCPoint id='point3' reportContent="埋点内容3" reportAllways={true} onPointShow={pointShow} >
      <Button type="primary">重复曝光埋点测试</Button>
    </SCPoint>
  );
};
```
## API
<API></API>