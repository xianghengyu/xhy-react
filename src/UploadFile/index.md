---
# 单独设置导航名称
title: UploadFile
nav: 组件API
order: 9
---

<!-- @format -->

## UploadFile

> 基于 antd-upload 的上传文件拓展组件，支持大文件断点续传（开发中。。。。。）;

## Demo

- 图片列表式文件上传

```tsx
import React, { useState } from 'react';
import { UploadFile } from 'xhy-react';
export default () => {
  const [fileList, setFileList] = useState([]);
  const fileChange = (info: any) => {
    console.log(info);
  };
  return (
    <>
      <UploadFile
        onChange={fileChange}
        accept=""
        fileList={fileList}
        listType="picture"
        maxCount={2}
        multiple={true}
        disabled={false}
      />
    </>
  );
};
```

- 链接列表式文件上传

```tsx
import React, { useState } from 'react';
import { UploadFile } from 'xhy-react';
export default () => {
  const [fileList, setFileList] = useState([]);
  const fileChange = (info: any) => {
    console.log(info);
  };
  return (
    <>
      <UploadFile
        onChange={fileChange}
        fileList={fileList}
        listType="text"
        maxCount={2}
        multiple={true}
        disabled={false}
      />
    </>
  );
};
```

- 图片卡片式文件上传

```tsx
import React, { useState } from 'react';
import { UploadFile } from 'xhy-react';
export default () => {
  const [fileList, setFileList] = useState([]);
  const fileChange = (info: any) => {
    console.log(info);
  };
  return (
    <>
      <UploadFile
        onChange={fileChange}
        accept=".png"
        fileList={fileList}
        listType="picture-card"
        maxCount={2}
        multiple={true}
        disabled={false}
      />
    </>
  );
};
```

- 拖拽式文件上传

```tsx
import React, { useState } from 'react';
import { UploadFile } from 'xhy-react';
export default () => {
  const [fileList, setFileList] = useState([]);
  const fileChange = (info: any) => {
    console.log(info);
  };
  return (
    <>
      <UploadFile
        type="dragger"
        listType="picture"
        onChange={fileChange}
        accept=".png"
        fileList={fileList}
        maxCount={2}
        multiple={true}
        disabled={false}
      />
    </>
  );
};
```

<API ></API>
