import React from 'react';
interface DownloadExcelProps {
    /**
     * @description       属性
     * @default           ""
     */
    title?: string;
  }
const Foo = (props:DownloadExcelProps) => <h4>{props.title}</h4>;

export default Foo;
