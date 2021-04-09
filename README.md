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