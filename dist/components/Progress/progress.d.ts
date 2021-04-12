import React, { FC } from 'react';
import { ThemeProps } from '../Icon/icon';
export interface ProgressProps {
    /** 百分比信息 */
    percent: number;
    /** 进度条高度 */
    strokeHeight?: number;
    /** 是否显示进度条的百分比信息 */
    showText?: boolean;
    /** 进度条完成部分的颜色 */
    styles?: React.CSSProperties;
    /** 主题色 */
    theme?: ThemeProps;
}
declare const Progress: FC<ProgressProps>;
export default Progress;
