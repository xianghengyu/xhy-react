import React, { useState } from 'react';
import { ConfigProvider, Modal, Radio, Space, Spin, Popconfirm, Table, Form, Button, Switch, InputNumber, DatePicker, TimePicker, Select, Cascader, TreeSelect } from 'antd';
import './index.less'
import zhCN from 'antd/lib/locale/zh_CN';
import Input from 'antd/lib/input/Input';
import { tableProps } from './interface/tableProps';
import IconButton from './components/IconButton';
import {
    FontSizeOutlined,
    FullscreenExitOutlined,
    FullscreenOutlined,
    PlusOutlined,
    SettingOutlined,
    VerticalAlignBottomOutlined,
} from '@ant-design/icons';

/**
 * 根据columns内的dataType获取类型
 * @param data 
 * @returns 
 */
const formTypeItem = (data: any) => {
    switch (data.dataType) {
        case 'input':
            return <Input allowClear style={{ width: data.width || 300 }} placeholder={`请输入${data.title}`} />;
        case 'boolean':
            return <Switch />;
        case 'number':
            return <InputNumber />;
        case 'date':
            return <DatePicker allowClear style={{ width: data.width || 260 }} placeholder={`请选择${data.title}`} />;
        case 'datetime':
            return <DatePicker allowClear style={{ width: data.width || 300 }} placeholder={`请选择${data.title}`} showTime />;
        case 'time':
            return <TimePicker allowClear style={{ width: data.width || 260 }} showNow />;
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
            return <Input allowClear style={{ width: data.width || 300 }} placeholder={`请输入${data.title}`} />;
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
 * 核心组件
 * @param props 
 * @returns 
 */
const SuperTable = (props: tableProps) => {
    const [SearchForm]: any = Form.useForm();
    const [showModal, setShowModal] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); //选中的表格select数据
    const [size, setSize] = useState<any>('middle');

    const [tableForm] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record:any) => record.key === editingKey;

    //分页回调
    const pagination = {
        showSizeChanger: true,
        onChange: (page: any, pageSize: any) => {
            props.onPageChange && props.onPageChange(page, pageSize)
        }
    }
    const editClick = (record:any) => {
        tableForm.setFieldsValue({
          ...record,
        });
        setEditingKey(record.key);
      };
    //取消编辑单元行操作
    const cancelSave = () => {
        setEditingKey('');
    };
    //保存编辑单元行回调
    const saveEditInfo = async (key:any) => {
        try {
            const row = await tableForm.validateFields();
            props.onUpdate && props.onUpdate(row);
            setEditingKey('');
        } catch (error) {
            
        }
    }
    /**
     * 根据参数配置columns信息，是否有操作项
     * @param props 
     * @returns 
     */
    const getColumns = (props: any) => {
        let baseColumns = [...props.columns];
        if (props.onDelete || props.onUpdate || props.onPreview) {
            baseColumns.push({
                title: '操作',
                align: 'center',
                key: 'edit',
                readOnly: true,
                fixed: 'right',
                width: 200,
                render: (row: any, record:any) => {
                    const editable = isEditing(record);
                    return (
                        editable? <div className='table-operation-btn'>
                            <div
                                className='operate-btn-item-update'
                                onClick={()=>{saveEditInfo(record.key)}}
                            >
                                保存
                            </div>
                            <Popconfirm
                                title='确认取消保存吗?'
                                onConfirm={() => {
                                    cancelSave();
                                }}
                                onCancel={() => { }}
                                okText='确认'
                                cancelText='取消'
                            >
                                <div className='operate-btn-item-delete'>
                                    取消
                                </div>
                            </Popconfirm>
                        </div>:<div className='table-operation-btn'>
                            {props.onUpdate && <div
                                className='operate-btn-item-update'
                                onClick={() => {
                                    if(props.openEditRow) {
                                        editClick(row);
                                    } else {
                                        props.onUpdate(row)
                                    }
                                }}
                            >
                                编辑
                            </div>}
                            {props.onDelete && <Popconfirm
                                title='确认删除这条数据吗?'
                                onConfirm={() => {
                                    props.onDelete(row)
                                }}
                                onCancel={() => { }}
                                okText='确认'
                                cancelText='取消'
                            >
                                <div className='operate-btn-item-delete'>
                                    删除
                                </div>
                            </Popconfirm>}
                            {props.onPreview && <div
                                className='operate-btn-item-preview'
                                onClick={() => {
                                    props.onPreview(row)
                                }}
                            >
                                详情
                            </div>}
                        </div>
                    );
                }
            })
        }
        return baseColumns;
    }
    //select选中事件
    const onSelectChange = (newSelectedRowKeys:any,newSelectedRow:any) => {
        props.onSelectChange && props.onSelectChange(newSelectedRow);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const reSetSelectInfo = () => {
        props.onSelectChange && props.onSelectChange([]);
        setSelectedRowKeys([]);
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };

    const EditableCell = (info:any) => {
        return (
          <td>
            {info.editing ? (
              <Form.Item
                name={info.dataIndex}
                style={{
                  margin: 0,
                }}
                rules={[
                  {
                    required: info.required || false,
                    message: `请输入${info.title}!`,
                  },
                ]}
              >
                {formTypeItem({...info,width:'fit-content'})}
              </Form.Item>
            ) : (
                <div className={`table-cell-${info.align|| 'center'}`}>{info.children}</div>
            )}
          </td>
        );
      };
      // getColumns(props)
    const mergedColumns = props.columns.map((col) => {
        return {
          ...col,
          onCell: (record:any) => ({
            record,
            ...col,
            editing: isEditing(record),
          }),
        };
      });
    // 表格主体
    const content = () => {
        return <ConfigProvider locale={zhCN}>
            <Spin spinning={props.loading || false} tip="加载中...">
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
                    {
                        selectedRowKeys.length > 0 && 
                        <div className='select-info-text'>
                            <div className='has-select-word'>
                                已选中 <span className='has-select-num'>{selectedRowKeys.length}</span> 条数据
                                <span onClick={reSetSelectInfo} className='clean-data'>清空</span>
                            </div>
                        </div>
                    }
                    {props.onAdd && <Button style={{ backgroundColor: '#524bff' }} type='primary' onClick={props.onAdd}>
                        新增数据
                    </Button>}
                    {props.showTools && <>
                        <IconButton
                            title={showModal ? '缩小' : '全屏'}
                            icon={showModal ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                            onClick={() => {
                                setShowModal(!showModal);
                            }}
                        />
                        <IconButton
                            title={() => (
                                <div>
                                <Radio.Group
                                    onChange={e => {
                                    setSize(e.target.value);
                                    }}
                                    value={size}
                                >
                                    <Space direction='vertical'>
                                    <Radio value={'large'}>大号</Radio>
                                    <Radio value={'middle'}>中等</Radio>
                                    <Radio value={'small'}>小号</Radio>
                                    </Space>
                                </Radio.Group>
                                </div>
                            )}
                            placement='bottom'
                            icon={<FontSizeOutlined />}
                        />
                    </>}
                </div>
                <Form form={tableForm} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        size={size}
                        rowSelection={props.openSelect ? rowSelection:undefined}
                        bordered={props.bordered || true}
                        columns={getColumns({...props,columns: mergedColumns})}
                        dataSource={props.dataSource.map((item, index) => { return { ...item, key: index } })}
                        pagination={pagination}
                        {...props.antProps}
                    />
                </Form>
            </Spin>
        </ConfigProvider>
    }

    return <>
        <Modal
            title={false}
            visible={showModal}
            footer={null}
            wrapClassName='super-modal-max'
            closable={false}
            destroyOnClose={true}
            mask={false}
            width='100vw'
        >
            {content()}
        </Modal>
        {!showModal &&
            <>{content()}</>
        }
    </>
};

export default SuperTable;