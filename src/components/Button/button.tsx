import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

// 定义 size 枚举
export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

// 定义 button 的type 枚举
export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

interface BaseButtonProps {
  /**
   * 添加 自定义的 className
   */
  className?: string;
  /**
   * Button 是否可被点击的状态
   */
  disabled?: boolean;
  /**
   * Button 的大小
   */
  size?: ButtonSize;
  /**
   * Button 类型 
   */
  btnType?: ButtonType;
  /**
   * a 链接的地址 href
   */
  href?: string;
  children: React.ReactNode
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    disabled,
    size,
    href,
    children,
    ...restProps
  } = props;
  const classes = classNames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled
  })
  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>{children}</button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}

export default Button;