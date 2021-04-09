import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import axios from 'axios'

import Dragger from './dragger'
import Button, {ButtonType} from '../Button/button'
import UploadList from './uploadList'

// 文件上传的状态
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
// 文件信息
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}
interface IUploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  beforeUpload? : (file: File) => boolean | Promise<File>;
  onChange?: (file: File) => void;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onRemove?: (file: UploadFile) => void;
  headers?: {[key: string]: any };
  name?: string;
  data?: {[key: string]: any };
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  drag?: boolean;
}
const Upload: React.FC<IUploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onChange,
    onProgress,
    onSuccess,
    onError,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList? defaultFileList: [])
  // 独立封装一个 同步更新 fileList 的函数
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        // 更新指定的 file 信息
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  const handleClick = useCallback(() => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }, [])
  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    // 上传
    uploadFiles(files);
    if (fileInput.current) {
      // 上传后清空
      fileInput.current.value = '';
    }
  }, [])
  // 删除对应展示的列表文件
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }
  const uploadFiles = (file: FileList) => {
    const postFiles = Array.from(file)
    // 每一个文件独立上传
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      }else {
        // 通过 beforeUpload 拦截验证
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        }else if(result !== false) {
          post(file)
        }
      }
      
    })
  }
  const post = (file: File) => {
    // 上传时记录文件上传的信息及状态
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    // 这里传入函数更新state 是 防止如果选择多个时只加载一个的问题
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
      formData.append(name || 'file', file)
      if (data) {
        Object.keys(data).forEach(key => {
          formData.append(key, data[key])
          
        })
      }
      axios.post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data"
        },
        // 是否开启cokeye
        withCredentials,
        // 进度条
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          console.log("percentage", percentage);
          
          if (percentage < 100) {
            // 当上传时候 实时更新 fileList 的进度条信息
            updateFileList(_file, { percent: percentage, status: 'uploading'})
            if (onProgress) {
              onProgress(percentage, file)
            }
          }
        }
      }).then(resp => {
        // 上传成功
        // 更新对应的 file 文件信息
        updateFileList(_file, {status: 'success', response: resp.data})
        if (onSuccess) {
          onSuccess(resp.data, file)
        }
        if (onChange) {
          onChange(file)
        }
      }).catch(err => {
        // 上传错误
        // 更新对应的 file 文件信息
        updateFileList(_file, { status: 'error', error: err})
        if (onError) {
          onError(err, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
  }
  return (
    <div className="viking-upload-component">
      <Button btnType={ButtonType.Primary} onClick={handleClick}>Upload File</Button>
      <div className="viking-upload-input"
        style={{display: 'inline-block'}}
        onClick={handleClick}>
          {drag ? 
            <Dragger onFile={(files) => {uploadFiles(files)}}>
              {children}
            </Dragger>:
            children
          }
        <input
          className="viking-file-input"
          style={{display: 'none'}}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>
      {/* <input type="file" ref={fileInput} 
            onChange={handleFileChange} 
            accept={accept}
            multiple={multiple} 
            className="viking-file-input" 
            style={{display: 'none'}} /> */}
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

export default Upload;