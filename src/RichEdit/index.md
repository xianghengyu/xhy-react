---
# 单独设置导航名称
title: RichEdit 富文本
nav: 组件API
order: 10
---

# RichEdit 富文本
该富文本插件是基于wangeditor编辑器做的封装，简化了调用流程，用户只需要关注数据即可。

## 简单使用
可以看到RichEdit组件的宽高默认是跟随父容器的宽高，也可以通过设置width和height来设置宽高。
```jsx
import React, { useState } from 'react';
import { RichEdit } from 'xhy-react';

export default () => {
    const [html, setHtml] = useState('');
    const htmlValueChange = (e) => {
        console.log(e);
    }
    return <div style={{width: '100%', height: '400px'}}>
        <RichEdit html={html} onChange={htmlValueChange}/>
    </div>
}
```

## API

RichEdit 属性
<API></API>