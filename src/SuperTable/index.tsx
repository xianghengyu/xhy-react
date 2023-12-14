import React from 'react';
import { ConfigProvider, Popconfirm, Table, Form, Button, Switch, InputNumber, DatePicker, TimePicker, Select, Cascader, TreeSelect } from 'antd';
import 'antd/dist/antd.css';
import './index.less'
import zhCN from 'antd/lib/locale/zh_CN';
import Input from 'antd/lib/input/Input';
import { tableProps } from './interface/tableProps';

/**
 * 根据columns内的dataType获取类型
 * @param data 
 * @returns 
 */
 const formTypeItem = (data: any) => {
    switch (data.dataType) {
        case 'input':
            return <Input style={{ width: data.width || 180 }} placeholder={`请输入${data.title}`} />;
        case 'boolean':
            return <Switch />;
        case 'number':
            return <InputNumber />;
        case 'date':
            return <DatePicker style={{ width: data.width || 180 }} placeholder={`请选择${data.title}`} />;
        case 'datetime':
            return <DatePicker style={{ width: data.width || 180 }} placeholder={`请选择${data.title}`} showTime />;
        case 'time':
            return <TimePicker style={{ width: data.width || 80 }} showNow />;
        case 'select':
            return <Select style={{ width: data.width || 180 }} placeholder={`请选择${data.title}`} allowClear options={data.dataSource || []}></Select>;
        case 'cascader':
            return <Cascader style={{ width: data.width || 180 }} options={data.dataSource || []} placeholder={`请选择${data.title}`} allowClear />;
        case 'tree':
            return (
                <TreeSelect
                    showSearch
                    dropdownStyle={{ width: data.width || 180, maxHeight: 400, overflow: 'auto' }}
                    placeholder={`请选择${data.title}`}
                    allowClear
                    treeDefaultExpandAll
                    treeData={data.dataSource || []}
                />
            );
        default:
            return <Input style={{ width: data.width || 180 }} placeholder={`请输入${data.title}`} />;
    }
}

/**
 * 根据表头columns获取搜索表单item
 * @param itemInfo 
 * @returns 
 */
const getFormItem = (itemInfo: any) => {
    return itemInfo.filter((item: any) => item.search).map((item: any) =>
        <Form.Item
            key={item.dataIndex}
            name={item.dataIndex}
            label={item.title}
            valuePropName={item.dataType === 'boolean' ? 'checked' : 'value'}
            rules={[{ required: item.required, message: `请输入${item.title}!` }]}
        >
            {formTypeItem(item)}
        </Form.Item>
    )
}

/**
 * 根据参数配置columns信息，是否有操作项
 * @param props 
 * @returns 
 */
const getColumns = (props: any) => {
    let baseColumns = [...props.columns];
    if (props.onDelete || props.onUpdate) {
        baseColumns.push({
            title: '操作',
            align: 'center',
            key: 'edit',
            readOnly: true,
            fixed: 'right',
            width: 180,
            render: (row: any) => {
                return (
                    <div className='table-operation-btn'>
                        {props.onUpdate && <Button
                            type='link'
                            onClick={() => {
                                props.onUpdate(row)
                            }}
                        >
                            编辑
                        </Button>}
                        {props.onDelete && <Popconfirm
                            title='确认删除这条数据吗?'
                            onConfirm={() => {
                                props.onDelete(row)
                            }}
                            onCancel={() => { }}
                            okText='确认'
                            cancelText='取消'
                        >
                            <Button type='link' danger>
                                删除
                            </Button>
                        </Popconfirm>}
                    </div>
                );
            }
        })
    }
    return baseColumns;
}

/**
 * 核心组件
 * @param props 
 * @returns 
 */
const SuperTable = (props: tableProps) => {
    const [SearchForm]: any = Form.useForm();
    const pagination = { //分页回调
        showSizeChanger: true,
        onChange: (page: any, pageSize: any) => {
            props.onPageChange && props.onPageChange(page, pageSize)
        }
    }
    return <>
        <ConfigProvider locale={zhCN}>
            {/* 表单提交 */}
            {!props.purTable && <div className='form-search'>
                <Form
                    form={SearchForm}
                    onFinish={e => {
                        props.onSearchBarFinish && props.onSearchBarFinish(e);
                    }}
                >
                    <div className='form-item-list'>
                        {getFormItem(props.columns)}
                        <div className='submit-btn'>
                            <Button style={{ backgroundColor: '#524bff' }} type='primary' htmlType='submit'>
                                查询
                            </Button>
                            <Button
                                onClick={() => {
                                    SearchForm.resetFields();
                                }}
                            >
                                重置
                            </Button>
                        </div>
                    </div>

                </Form>
            </div>}
            {/* 表格信息 */}
            <div className='active-info'>
                {props.onAdd && <Button style={{ backgroundColor: '#524bff' }} type='primary' onClick={props.onAdd}>
                    新增数据
                </Button>}
            </div>
            <Table
                bordered={props.bordered}
                columns={getColumns(props)}
                dataSource={props.dataSource.map((item, index) => { return { ...item, key: index } })}
                pagination={pagination}
            />
        </ConfigProvider>
    </>
};

export default SuperTable;