/** @format */

// @ts-nocheck
import {
  DeleteOutlined,
  LinkOutlined,
  UploadOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
} from '@ant-design/icons';
import { Button, Modal, Upload, Progress } from 'antd';
// import request from 'umi-request';
import React, { useState } from 'react';
import './index.less';
// import SparkMD5 from 'spark-md5';
const { Dragger } = Upload;
const SIZE = 6 * 1024 * 1024;
export interface UploadFileProps {
  /**
   * @description    拖拽组件｜普通组件
   * @default
   */
  type?: 'dragger' | 'normal';

  /**
   * @description    支持文件拓展名(.png,.jpg)
   * @default
   */
  accept?: string;

  /**
   * @description    已上传文件列表样式
   * @default
   */
  listType?: 'picture' | 'picture-card' | 'text';

  /**
   * @description    已上传文件列表
   * @default
   */
  fileList?: any[];

  /**
   * @description    上传数量限制
   * @default
   */
  maxCount?: number | undefined;

  /**
   * @description    是否可以多选
   * @default
   */
  multiple?: boolean | undefined;

  /**
   * @description    是否禁止上传
   * @default
   */
  disabled?: boolean | undefined;

  /**
   * @description  监听文件上传成功
   * @default
   */
  onChange?: (file: object) => void;
}
const minioserverUpload = 'http://10.45.6.112:9017/minioclient/upload';
let prefileListsUpload = []; //切片列表
const UploadFile: React.FC<UploadFileProps> = ({
  type = 'normal',
  accept = '',
  listType = 'text',
  fileList = [],
  maxCount = 999,
  multiple,
  disabled,
  onChange,
}) => {
  const [fileLists, setFileLists] = useState(fileList || []);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  //转换文件类型（解析为BUFFER数据）
  const fileParse = file => {
    return new Promise(resolve => {
      const fileRead = new FileReader();
      fileRead.readAsArrayBuffer(file);
      fileRead.onload = ev => {
        resolve(ev.target.result);
      };
    });
  };

  // 解析为BUFFER数据
  const createChunkFile = async (index, file) => {
    if (!file) return;
    const buffer = await fileParse(file);
    const spark = new SparkMD5.ArrayBuffer();
    let hash;
    let suffix;
    spark.append(buffer);
    hash = spark.end();
    suffix = /\.([0-9a-zA-Z]+)$/i.exec(file.name)[1];
    const partList = [];
    const count = Math.ceil(file.size / SIZE);
    const partSize = file.size / count;
    let cur = 0;
    for (let i = 0; i < count; i++) {
      const item = {
        chunk: file.slice(cur, cur + partSize),
        filename: `${hash}_${i}.${suffix}`,
        hash: hash,
      };
      cur += partSize;
      partList.push(item);
    }
    const prefileLists = fileLists;
    prefileLists[index]['partList'] = partList;
    prefileLists[index]['hash'] = hash;
    prefileLists[index]['stop'] = false;
    prefileLists[index]['percent'] = 0;
    prefileLists[index]['progressStatus'] = 'active';
    setFileLists([...prefileLists]);
    uploadFn(partList, hash, file.name, index, file.key, 0);
  };

  //beforeUpload事件监听
  const fileListChange = (info: any) => {
    if (
      info.size > SIZE &&
      ((type == 'normal' && listType == 'picture') || (type == 'normal' && listType == 'dragger'))
    ) {
      const prefileLists = fileLists;
      info.key = Date.now();
      prefileLists.push(info);
      setFileLists([...prefileLists]);
      prefileListsUpload = prefileLists;
      createChunkFile(fileLists.length - 1, info);
      return false;
    } else {
      const prefileLists = fileLists;
      if (type == 'normal' && listType == 'picture-card') {
        setFileLists(info.fileList);
      } else {
        info.key = Date.now();
        prefileLists.push(info);
        setFileLists([...prefileLists]);
        prefileListsUpload = prefileLists;
      }
      return true;
    }
  };
  //onChange事件
  const fileHasLoad = (info: any) => {
    if (info.file.status == 'done') {
      //成功回调
      if (listType == 'picture-card') {
        onChange && onChange(info.fileList);
      } else {
        const nowFileLists = fileLists.map(item => {
          if (item.key == info.file.key) {
            item.response = info.file.response;
          }
          return item;
        });
        onChange && onChange(nowFileLists);
      }
    }
    if (info.file.status == 'removed') {
      onChange && onChange(info.fileList);
    }
  };

  //根据切片数创造切片数个请求
  const uploadFn = (partList, hash, name, index, key, begin) => {
    const requestList = [];
    partList.forEach((item, index) => {
      const fn = () => {
        const formData = new FormData();
        formData.append('chunk', item.chunk);
        formData.append('filename', item.filename);
        formData.append('hash', item.hash);
        return new Promise((resolve, reject) => {
          request('http://10.45.6.112:9017/minioclient/shardUpLoad', {
            method: 'POST',
            requestType: 'form',
            data: formData,
          })
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        });
      };
      requestList.push(fn);
    });
    uploadSend(begin, requestList, hash, name, index, key);
  };

  //上传单个切片
  const uploadSend = async (c, requestList, hash, name, index, key) => {
    if (c >= requestList.length) {
      prefileListsUpload.map(item => {
        if (item.key == key) {
          item.progressStatus = 'success';
        }
        return item;
      });
      setFileLists([...prefileListsUpload]);
      uploadComplete(hash, name, key);
      return;
    }
    await requestList[c]();
    c++;
    prefileListsUpload.map(item => {
      if (item.key == key) {
        item.partNum = c;
        item.percent = ((c / requestList.length) * 100).toFixed(2);
      }
      return item;
    });
    setFileLists([...prefileListsUpload]);
    const continueDo = prefileListsUpload.find(item => item.key == key);
    continueDo && !continueDo.stop && uploadSend(c, requestList, hash, name, index, key);
  };

  //执行合并请求
  const uploadComplete = (hash, name, key) => {
    request('http://10.45.6.112:9017/minioclient/merge', {
      method: 'POST',
      data: {
        hash: hash,
        bucketName: 'text',
        fileName: name,
      },
    })
      .then(res => {
        if (res.statusCode == '200') {
          const nowFileLists = fileLists.map(item => {
            if (item.key == key) {
              item.response = res;
            }
            return item;
          });
          onChange && onChange(nowFileLists);
        } else {
          //失败回调
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  //删除已上传的文件/上传中的文件
  const deleteUploadFile = (e, key) => {
    let nowFileList = fileLists;
    nowFileList = nowFileList.filter(item => {
      return item.key != key;
    });
    prefileListsUpload = nowFileList;
    setFileLists(nowFileList);
    onChange && onChange(nowFileList);
  };

  //暂停/继续上传文件
  const continueUpload = (e, key, status) => {
    let nowFileList = fileLists;
    nowFileList = nowFileList.map(item => {
      if (item.key == key) {
        if (item.stop) {
          uploadFn(item.partList, item.hash, item.name, 0, item.key, item.partNum);
        }
        item.stop = !item.stop;
      }
      return item;
    });
    prefileListsUpload = nowFileList;
    setFileLists(nowFileList);
  };

  const itemRender = (originNode: any, file: any, fileList: any, actions: any): React.ReactNode => {
    return (
      <div className='file-item'>
        <LinkOutlined style={{ color: '#757575' }} />
        <div className='file-item-name'>{file.name}</div>
        <DeleteOutlined
          onClick={e => {
            deleteUploadFile(e, file.key);
          }}
          className='file-item-delete'
        />
      </div>
    );
  };
  const itemRender2 = (originNode: any, file: any, fileList: any, actions: any): React.ReactNode => {
    return (
      <div className='file-item2'>
        <div className='file-item2-picture'>
          {file.thumbUrl ? (
            <img src={file.thumbUrl} />
          ) : (
            <div className='file-item2-file-name'>
              <div>{file.name.split('.')[file.name.split('.').length - 1]}</div>
            </div>
          )}
        </div>
        <div className='file-item-middleinfo'>
          <div className='file-item2-name'>{file.name}</div>
          {file.hasOwnProperty('hash') && (
            <Progress trailColor='#fff' percent={file.percent || 0} status={file.progressStatus || 'active'} />
          )}
        </div>
        {file.hasOwnProperty('hash') && file.percent != 100 && (
          <>
            {file.stop && (
              <PlayCircleOutlined
                onClick={e => {
                  continueUpload(e, file.key);
                }}
                className='file-item2-delete'
              />
            )}
            {!file.stop && (
              <PauseCircleOutlined
                onClick={e => {
                  continueUpload(e, file.key);
                }}
                className='file-item2-delete'
              />
            )}
          </>
        )}
        <DeleteOutlined
          onClick={e => {
            deleteUploadFile(e, file.key);
          }}
          className='file-item2-delete'
        />
      </div>
    );
  };

  //图片转base64
  const getBase64 = (file: any): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

  //预览图片
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };
  const uploadButton = (
    <div>
      <UploadOutlined style={{ color: '#304EEB', fontSize: '18px' }} />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );
  return (
    <>
      {type == 'dragger' && (
        <div className='file-upload-dragger'>
          <Dragger
            itemRender={itemRender2}
            listType={listType}
            accept={accept}
            name='file'
            data={{ bucketName: 'sasac' }}
            action={minioserverUpload}
            maxCount={maxCount}
            multiple={multiple}
            disabled={disabled}
            fileList={fileLists}
            beforeUpload={fileListChange}
            onChange={fileHasLoad}
          >
            <div className='dragger-btn'>
              <div>
                <span>将文件拖到此区域，或</span>
                <span className='click-upload'>点击上传</span>
              </div>
              {accept && <div className='file-upload-accept'>支持扩展名：{accept}</div>}
            </div>
          </Dragger>
        </div>
      )}
      {type == 'normal' && (
        <div className='file-upload'>
          {listType == 'text' && (
            <Upload
              itemRender={itemRender}
              accept={accept}
              name='file'
              data={{ bucketName: 'sasac' }}
              action={minioserverUpload}
              listType={listType}
              maxCount={maxCount}
              multiple={multiple}
              disabled={disabled}
              fileList={fileLists}
              beforeUpload={fileListChange}
              onChange={fileHasLoad}
            >
              <Button icon={<UploadOutlined />}>上传文件</Button>
              {accept && <div className='file-upload-accept'>支持扩展名：{accept}</div>}
            </Upload>
          )}
          {listType == 'picture' && (
            <Upload
              itemRender={itemRender2}
              accept={accept}
              name='file'
              data={{ bucketName: 'sasac' }}
              action={minioserverUpload}
              listType={listType}
              maxCount={maxCount}
              multiple={multiple}
              disabled={disabled}
              fileList={fileLists}
              beforeUpload={fileListChange}
              // onChange={fileHasLoad}
            >
              <Button icon={<UploadOutlined />}>上传文件</Button>
              {accept && <div className='file-upload-accept'>支持扩展名：{accept}</div>}
            </Upload>
          )}
          {listType == 'picture-card' && (
            <>
              <Upload
                accept={accept}
                name='file'
                data={{ bucketName: 'sasac' }}
                action={minioserverUpload}
                listType={listType}
                maxCount={maxCount}
                multiple={multiple}
                disabled={disabled}
                fileList={fileLists}
                onPreview={handlePreview}
                beforeUpload={fileListChange}
                onChange={fileHasLoad}
              >
                {fileList.length >= maxCount ? null : uploadButton}
              </Upload>
              {accept && <div className='file-upload-accept'>支持扩展名：{accept}</div>}
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={() => {
                  setPreviewVisible(false);
                }}
              >
                <img alt='example' style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default UploadFile;
