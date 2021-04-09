## 安装依赖 yarn install or npm install
## 运行项目 yarn start

### 创建项目
npx create-react-app my-project-name --typescript


## style 文件结构
styles/
  _variables.scss (各种变量以及可配置设置)
  _mixin.scss (全局 mixin)
  _reboot.scss  (初始化 使用了 normalize)
  _animation.scss  (动画)
  index.scss   (入口)

## 组件色彩选择
#0D6EFD #6C757D #52C41A #FADB14 #DC3545 #17A2B8
颜色细分参考：http://zhongguose.com/

## css 预处理
yarn add node-sass --save
node-sass版本 4.13.0 
如果为5.0.0版本会报错

安装 storybook
npx -p @storybook/cli sb init
yarn add @types/storybook__addon-info --save
自动生成文档
yarn add react-docgen-typescript-loader -D


## 模拟发送请求
https://jsonplaceholder.typicode.com
https://mocky.io


## rimraf 
兼容 MAC and window
安装 rimraf 使运行 npm run build 打包命令时候先删除 build 文件夹
### 使用

~~~javascript
// 加载样式
import 'vikingship/dist/index.css'
// 引入组件
import { Button } from 'vikingship'
~~~

### 本地开发命令

~~~bash
//启动本地环境
npm run stroybook

//跑单元测试
npm test

//build可发布静态文件
npm run build

//发布到 npm
npm run publish
~~~

# npm link 的知识点
npm link 是将当前项目通过拷贝一个项目副本到全局的node_modules 中
然后在另一个文件夹通过 npm link 创建的项目文件名称 就可以通过拷贝到这个项目中了
例
```
npm link 
-- /usr/local/lib/node_modules/ts-my-app -> /Users/dengwenlong/Desktop/前端练习总/React总/React-UI-TS/react_ui_store

上面的 /usr/local/lib/node_modules/ts-my-app 地址就是通过 npm link 来创建全局的软链接地址指向到原有的地址上的

然后在通过创建新的文件夹 cd 到该文件夹 再通过 npm link ts-my-app(创建的link项目是ts-my-app)
然后就会生成克隆的地址
/Users/dengwenlong/node_modules/ts-my-app -> /usr/local/lib/node_modules/ts-my-app -> /Users/dengwenlong/Desktop/前端练习总/React总/React-UI-TS/react_ui_store

```

### 如果项目中使用该组件发生两个版本(react Hook)冲突时候
使用 npm link ../项目名/node_modules/react
参考：https://zh-hans.reactjs.org/warnings/invalid-hook-call-warning.html