import React from 'react'
import { Story, Meta, storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'

import Button, { ButtonType, ButtonSize, ButtonProps } from './button'

// const styles: React.CSSProperties = {
//   textAlign: "center"
// }
// 使组件居中
// const CenterDecorator = (storyFn: any) => (<div style={styles}>{storyFn()}</div>)

const defaultButton = () => (
  <Button onClick={action('clicked')}> default button </Button>
)

const buttonWithSize = () => (
  <>
    <Button size={ButtonSize.Large}> large button </Button>
    <Button size={ButtonSize.Small}> small button </Button>
  </>
)

const buttonWithType = () => (
  <>
    <Button btnType={ButtonType.Primary}> primary button </Button>
    <Button btnType={ButtonType.Danger}> danger button </Button>
    <Button btnType={ButtonType.Link} href="https://google.com"> link button </Button>
  </>
)
storiesOf('Button Component', module)
  .add('Button', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize)
  .add('不同类型的 Button', buttonWithType)



const Template: Story<ButtonProps> = (args) => <Button {...args} >默认</Button>;
export const Primary = Template.bind({});
Primary.args = {
  btnType: ButtonType.Default,
  size: ButtonSize.Large
};

export default {
  title: 'Example/Buttons',
  component: Button,
  argTypes: {
    btnType: {
      type: 'radio',
      options: ButtonType
    },
    size: {
      type: 'radio',
      options: ButtonSize
    }
  },
} as Meta;