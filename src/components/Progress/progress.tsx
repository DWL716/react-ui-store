import React, { FC } from 'react'
import { ThemeProps } from '../Icon/icon'
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

const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme,
  } = props
  return (
    <div className="viking-progress-bar" style={styles}>
      <div className="viking-progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
        <div 
          className={`viking-progress-bar-inner color-${theme}`}
          style={{width: `${percent}%`}}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
}
export default Progress;
