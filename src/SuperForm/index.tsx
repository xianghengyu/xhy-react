import React from 'react';
import { Input, Form, Button, Switch, InputNumber, DatePicker, TimePicker, Select, Cascader, TreeSelect } from 'antd';
import './index.less';
interface SuperFormProps {
    /**
   * @description       表单排列方式
   * @default           line
   */
    type?: 'line' | 'vertical';

    /**
    * @description       表格列的配置描述，具体项见案例
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
}
const SuperForm = (props: SuperFormProps) => {
    const [SearchForm]: any = Form.useForm();
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
    </>
};

export default SuperForm;

