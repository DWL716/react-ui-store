import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, {ButtonProps, ButtonType, ButtonSize} from './button';

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

describe('Button 组件', () => {
  it('测试 Button 默认组件', () => {
    const wrapper = render(<Button>Nice</Button>)
    const element = wrapper.getByText('Nice');
    expect(element).toBeTruthy()
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
  });
  it('根据不同的 props 显示不同的组件', () => {
    const wrapper = render(<Button btnType={ButtonType.Danger} size={ButtonSize.Large}>Nice</Button>)
    const element = wrapper.getByText("Nice")
    expect(element).toHaveClass("btn-lg btn-danger")
  });
  it('测试 有 href 属性时显示是 a 标签', () => {
    const wrapper = render(<Button href="http://dummyurl" btnType={ButtonType.Link}>Link</Button>)
    const element = wrapper.getByText("Link")
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual("A")
    expect(element).toHaveClass("btn btn-link")
  });
  it('测试 disabled 属性', () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>)
    const element = wrapper.getByText("Nice") as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual("BUTTON")
    expect(element.disabled).toBeTruthy()
    // 测试点击事件
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
