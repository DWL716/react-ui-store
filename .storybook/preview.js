import {addDecorator} from '@storybook/react'
import {withInfo} from '@storybook/addon-info'

addDecorator(withInfo)
// 导入样式
import '../src/styles/index.scss'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}