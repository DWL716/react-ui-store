import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

export interface SubMenuProps {
  index?: string;
  title?: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const {index, title, children, className} = props
  const context = useContext(MenuContext)
  // 竖向模式时 默认打开的选项
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
  const [menuOpen, setOpen] = useState(isOpend)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === 'vertical'
  })
  // 
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 200)
  }
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }
  // 为纵向时候
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  }: {}
  // 为横向的时候 创建鼠标进出事件
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
    onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)}
  }: {}
  // 循环渲染 MenuItem 子组件
  const renderChildren = () => {
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      // 判断子元素是否是 MenuItem 如果是直接返回
      if(childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      }else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
    // 添加动画效果
    return (
      <Transition
        in={menuOpen}
        timeout={300}
        animation="zoom-in-top"
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu