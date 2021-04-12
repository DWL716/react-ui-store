import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
export declare enum ButtonSize {
    Large = "lg",
    Small = "sm"
}
export declare enum ButtonType {
    Primary = "primary",
    Default = "default",
    Danger = "danger",
    Link = "link"
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
    children: React.ReactNode;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
export declare const Button: React.FC<ButtonProps>;
export default Button;
