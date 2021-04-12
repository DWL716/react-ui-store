import { ReactElement, InputHTMLAttributes, ChangeEvent, FC } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = 'lg' | 'sm';
export interface IInputProps {
    /**
     * 是否禁用 Input
     */
    disabled?: boolean;
    /**设置 input 大小，支持 lg 或者是 sm */
    size?: InputSize;
    /**添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp;
    /**添加前缀 用于配置一些固定组合 */
    prepend?: string | ReactElement;
    /**
     * 添加后缀 用于配置一些固定组合
    */
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
export declare type InputProps = Partial<IInputProps & Omit<InputHTMLAttributes<HTMLElement>, 'size'>>;
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'components'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
declare const Input: FC<InputProps>;
export default Input;
