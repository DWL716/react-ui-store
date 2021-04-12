var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useCallback, useRef, useState } from 'react';
import axios from 'axios';
import Dragger from './dragger';
import Button, { ButtonType } from '../Button/button';
import UploadList from './uploadList';
var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onChange = props.onChange, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onRemove = props.onRemove, name = props.name, headers = props.headers, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList ? defaultFileList : []), fileList = _a[0], setFileList = _a[1];
    // 独立封装一个 同步更新 fileList 的函数
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                // 更新指定的 file 信息
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = useCallback(function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    }, []);
    var handleFileChange = useCallback(function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        // 上传
        uploadFiles(files);
        if (fileInput.current) {
            // 上传后清空
            fileInput.current.value = '';
        }
    }, []);
    // 删除对应展示的列表文件
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    var uploadFiles = function (file) {
        var postFiles = Array.from(file);
        // 每一个文件独立上传
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                // 通过 beforeUpload 拦截验证
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        // 上传时记录文件上传的信息及状态
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        // 这里传入函数更新state 是 防止如果选择多个时只加载一个的问题
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { "Content-Type": "multipart/form-data" }),
            // 是否开启cokeye
            withCredentials: withCredentials,
            // 进度条
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                console.log("percentage", percentage);
                if (percentage < 100) {
                    // 当上传时候 实时更新 fileList 的进度条信息
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(function (resp) {
            // 上传成功
            // 更新对应的 file 文件信息
            updateFileList(_file, { status: 'success', response: resp.data });
            if (onSuccess) {
                onSuccess(resp.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        })["catch"](function (err) {
            // 上传错误
            // 更新对应的 file 文件信息
            updateFileList(_file, { status: 'error', error: err });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    return (React.createElement("div", { className: "viking-upload-component" },
        React.createElement(Button, { btnType: ButtonType.Primary, onClick: handleClick }, "Upload File"),
        React.createElement("div", { className: "viking-upload-input", style: { display: 'inline-block' }, onClick: handleClick },
            drag ?
                React.createElement(Dragger, { onFile: function (files) { uploadFiles(files); } }, children) :
                children,
            React.createElement("input", { className: "viking-file-input", style: { display: 'none' }, ref: fileInput, onChange: handleFileChange, type: "file", accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
export default Upload;
