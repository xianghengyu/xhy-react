import React, { useState, useEffect } from 'react';
import { ConfigProvider, Input, Form, Button, Switch, InputNumber, DatePicker, TimePicker, Select, Cascader, TreeSelect } from 'antd';
const { RangePicker } = DatePicker;
import zhCN from 'antd/lib/locale/zh_CN';
import './index.less';
interface SuperFormProps {
    /**
   * @description       表单排列方式
   * @default           line
   */
    type?: 'line' | 'vertical';

    /**
    * @description       SuperTable columns列的配置描述，具体项见案例
    * @default           []
    */
    columns: Array<any>;
    
    /**
     * @description       搜索回调，返回搜索数据
     * @default           无
     */
    onSearchBarFinish?: (props: any) => void;

    /**
     * @description       重置回调
     * @default           无
     */
     onReset?: () => void;

     /**
     * @description       antd Form组件原生属性（优先级最高）
     * @default           无
     */
      antProps?: object;

    /**
     * @description         表单默认值
     * @default           无
     */
      defaultVlalue?: object;

}
const SuperForm = (props: SuperFormProps) => {
    const [SearchForm]: any = Form.useForm();
    useEffect(() => {
        if(props.defaultVlalue) {
            SearchForm.setFieldsValue(props.defaultVlalue);
        }

    },[props.defaultVlalue])
    const formTypeItem = (data: any) => {
        switch (data.dataType) {
            case 'input':
                return <Input style={{ width: data.width || 300 }} placeholder={`请输入${data.title}`} />;
            case 'boolean':
                return <Switch />;
            case 'number':
                return <InputNumber />;
            case 'rangPicker':
                    return <RangePicker allowClear style={{ width: data.width || 300 }} />;
            case 'rangTimePicker':
                    return <RangePicker allowClear style={{ width: data.width || 300 }} showTime/>;
            case 'date':
                return <DatePicker style={{ width: data.width || 260 }} placeholder={`请选择${data.title}`} />;
            case 'datetime':
                return <DatePicker style={{ width: data.width || 300 }} placeholder={`请选择${data.title}`} showTime />;
            case 'time':
                return <TimePicker style={{ width: data.width || 260 }} showNow />;
            case 'select':
                return <Select style={{ width: data.width || 260 }} placeholder={`请选择${data.title}`} allowClear options={data.dataSource || []}></Select>;
            case 'cascader':
                return <Cascader style={{ width: data.width || 260 }} options={data.dataSource || []} placeholder={`请选择${data.title}`} allowClear />;
            case 'tree':
                return (
                    <TreeSelect
                        showSearch
                        dropdownStyle={{ width: data.width || 260, maxHeight: 400, overflow: 'auto' }}
                        placeholder={`请选择${data.title}`}
                        allowClear
                        treeDefaultExpandAll
                        treeData={data.dataSource || []}
                    />
                );
            default:
                return <Input style={{ width: data.width || 300 }} placeholder={`请输入${data.title}`} />;
        }
    }
    const getFormItem = (itemInfo: any) => {
        return itemInfo.map((item: any) =>
            <Form.Item
                key={item.dataIndex}
                name={item.dataIndex}
                label={item.title}
                valuePropName={item.dataType === 'boolean' ? 'checked' : 'value'}
                rules={[{ required: item.required, message: `请输入${item.title}!` }]}
                {...item.antItemProps}
            >
                {formTypeItem(item)}
            </Form.Item>
        )
    }
    return <>
    <ConfigProvider locale={zhCN}>
        <Form
            form={SearchForm}
            onFinish={e => {
                props.onSearchBarFinish && props.onSearchBarFinish(e);
            }}
            {...props.antProps}
        >
            {(props.type == 'line' || !props.type) ? <div className='form-item-list'>
                {getFormItem(props.columns)}
                <div className='submit-btn'>
                    <Button style={{ backgroundColor: '#524bff' }} type='primary' htmlType='submit'>
                        查询
                    </Button>
                    <Button
                        onClick={() => {
                            SearchForm.resetFields();
                            props.onReset && props.onReset();
                        }}
                    >
                        重置
                    </Button>
                </div>
            </div>:
            <>
            {getFormItem(props.columns)}
            <div className='submit-btn-vertical'>
                    <Button style={{ backgroundColor: '#524bff' }} type='primary' htmlType='submit'>
                        查询
                    </Button>
                    <Button
                        onClick={() => {
                            SearchForm.resetFields();
                            props.onReset && props.onReset();
                        }}
                    >
                        重置
                    </Button>
            </div>
            </>
            }

        </Form>
        </ConfigProvider>
    </>
};

export default SuperForm;

