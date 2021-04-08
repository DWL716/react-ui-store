import React from 'react'

import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Upload, {UploadFile} from './upload'

// 上传文件列表信息及状态
const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]
// 判断文件大小
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    console.error("该文件超过了 50k");
    return false;
  }
  return true;
}
// 修改文件名
const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', {type: file.type})
  return Promise.resolve(newFile)
}
const SimpleUpload1 = () => {
  return (
    <Upload action="https://jsonplaceholder.typicode.com/posts" 
      onSuccess={action("success")}
      onProgress={action("progress")}
      onError={action("error")} />
  )
}
const SimpleUpload2 = () => {
  return (
    <Upload action="https://jsonplaceholder.typicode.com/posts" 
      onChange={action("change")}
      beforeUpload={checkFileSize} />
  )
}
const SimpleUpload3 = () => {
  return (
    <Upload action="https://jsonplaceholder.typicode.com/posts" 
      onChange={action("change")}
      beforeUpload={filePromise} />
  )
}
const SimpleUpload4 = () => {
  return (
    <Upload action="https://jsonplaceholder.typicode.com/posts" 
      onRemove={action('remove')}
      defaultFileList={defaultFileList} />
  )
}

storiesOf("上传组件", module)
  .add('Upload1', SimpleUpload1)
  .add("Upload2", SimpleUpload2)
  .add("Upload3", SimpleUpload3)
  .add("Upload4", SimpleUpload4)