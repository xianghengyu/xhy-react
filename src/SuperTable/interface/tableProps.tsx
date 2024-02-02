/** @format */

export interface tableProps {
     /**
     * @description       是否展示加载中
     * @default           false
     */
    loading?: boolean;

     /**
     * @description       是否展示表格拓展工具
     * @default           false
     */
      showTools?: boolean;

    /**
     * @description       是否展示表格边框
     * @default           true
     */
    bordered?: boolean;

    /**
     * @description       是否展示纯表格（无表单）
     * @default           false
     */
     purTable?: boolean;

    /**
    * @description       表格列的配置描述，具体项见下表
    * @default           []
    */
    columns: Array<any>;

    /**
    * @description       数据数组
    * @default           []
    */
    dataSource: Array<any>;

    /**
     * @description       是否开启表格select
     * @default           false
     */
    openSelect?: boolean;

    /**
     * @description       是否开启表格内行编辑功能
     * @default           false
     */
    openEditRow?: boolean;

    /**
     * @description       搜索回调，返回搜索数据
     * @default           无
     */
    onSearchBarFinish?: (props: any) => void;

    /**
     * @description       分页信息修改回调，返回current、pageSize
     * @default           无
     */
    onPageChange?: (current: number, pageSize: number) => void;

    /**
     * @description       新增回调
     * @default           无
     */
    onAdd?: (e:any) => void;

    /**
     * @description       删除回调，返回当前行信息
     * @default           无
     */
    onDelete?: (e:any) => void;

    /**
     * @description       修改回调，返回当前行信息
     * @default           无
     */
    onUpdate?: (e:any) => void;

    /**
     * @description       点击详情回调，返回当前行信息
     * @default           无
     */
    onPreview?: (e:any) => void;

    /**
     * @description       表格Select事件回调
     * @default           无
     */
    onSelectChange?: (e:any) => void;

    /**
     * @description       antd Table组件原生属性（优先级最高）
     * @default           无
     */
     antProps?: object;
    
}
