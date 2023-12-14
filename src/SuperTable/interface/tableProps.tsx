/** @format */

export interface tableProps {
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
     * @description       新增回调，返回当前行信息
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

}
