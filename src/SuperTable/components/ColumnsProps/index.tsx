import React from 'react';
interface CascaderProps {
    value: string | number;
    label: string;
    children?: CascaderProps[];
}
interface TreeProps {
    value: string | number;
    title: string;
    children?: TreeProps[];
  }
interface SelectProps {
    value: string | number;
    label: string;
  }  
interface columnsProps {
    /**
     * @description       单元格列标题
     */
     title: string;

    /**
     * @description       单元格列标题
     * @default           left
     */
     align?: 'left'|'center'|'right';

    /**
     * @description       后台接口返回字段名称
     */
     dataIndex: string;

    /**
     * @description       后台接口返回字段名称
     */
     key: string;

    /**
     * @description       单元格类型（决定表单类型）
     * @default           input
     */
     dataType?: 'date'|'datetime'|'time'|'rangPicker'|'rangTimePicker'|'select'|'cascader'|'tree'|'input'|'boolean'|'number';

     /**
     * @description       如果配置dataType为select、tree则必填
     * @default           input
     */
      dataSource?: 'Array<{label:string,value:string}> select'|'Array<{label:boolean,value:string,children:[]}> cascader'|'Array<{title:boolean,value:string,children:[]}> tree'

    /**
     * @description       配置字段是否开启搜索
     * @default           true
     */
    search?: boolean;

    /**
     * @description       如果开启搜索是否必填
     * @default           true
     */
     required?: boolean;

}

const ColumnsProps = (props: columnsProps) =>{
    return <></>
}
export default ColumnsProps;