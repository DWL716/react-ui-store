import React from 'react';
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}
const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props
  
  // 根据 theme 的不同，添加不同的 className
  const classes = classNames('viking-icon', className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes}  {...restProps} />
  )
}

export default Icon;