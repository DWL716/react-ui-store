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