---
# 单独设置导航名称
title: DebounceX 防抖
nav: 组件API
order: 3
---

# DebounceX 防抖

在实际项目开发过程中，很多场景需要使用到防抖，如用户疯狂点击抢购，会多次调用接口。该组件实现了如果点击时间间隔小于 wait 毫秒，则判定为非法操作，操作销毁，从前端层面
实现了防抖；

## 防抖痛点

👨‍💻：传统防抖函数调用较为复杂，需要传入函数，且总是执行最后一次，不符合实际使用场景。

```javascript=
function debounce(func, wait) {
    let timer;
    return function() {
      let context = this; // 注意 this 指向
      let args = arguments; // arguments中存着e

      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    }
}
```

现在需要给系统各个地方加防抖，只执行第一次，限定时间内的所有非法操作作废。如果用传统的防抖方法，调用太麻烦了。通过封装成组件可以简单调用。

## 简单使用

可以看到在该例子中，如果操作频率在 600 毫秒内则只执行第一次；

```jsx
import React, { useState } from 'react';
import { DebounceX } from 'xhy-react';
import { Button } from 'antd';

export default () => {
  const clickBtn = () => {
    console.log('触发');
  };
  return (
    <DebounceX wait={600} onDebounceClick={clickBtn}>
      <Button type="primary">抢购</Button>
    </DebounceX>
  );
};
```

## API

DebounceX 属性
<API></API>
