import React from 'react'
import { fireEvent, render, RenderResult,cleanup } from '@testing-library/react'

import Menu, {MenuProps} from './menu'
import MenuItem from './menuItem'

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test'
}
const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical'
}
// 测试用的 元素
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        dwl
      </MenuItem>
    </Menu>
  )
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('viking-menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('dwl')
    // 当点击 dwl 文本元素后
    fireEvent.click(thirdItem)
    // 测试点击 thirdItem 元素后 该元素上是否有 ‘is-active’
    expect(thirdItem).toHaveClass('is-active')
    // 测试除 activeElement 其它元素上没有 'is-active' 属性
    expect(activeElement).not.toHaveClass('is-active')
    // 测试点击的返回的 index 是否是 2
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    // 测试 disabledElement 当点击该元素后，该元素没有任何改变 及没有添加 ‘is-active’ 和 defaultIndex没有改变
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  it('should render vertical mode when mode is set to vertical', () => {
    // 测试 mode 是 横向布局还是纵向布局
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
})