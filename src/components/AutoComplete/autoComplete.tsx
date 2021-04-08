import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Transition from '../Transition/transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
  value: string;
}
// 定义复杂的数据类型
export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props

  const [ inputValue, setInputValue ] = useState(value as string)
  // autoComplete 渲染列表
  const [ suggestions, setSugestions ] = useState<DataSourceType[]>([])
  // 加载渲染列表的状态
  const [ loading, setLoading ] = useState(false)
  const [ showDropdown, setShowDropdown] = useState(false)
  const [ highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  // 添加函数截流，规定300ms内连续请求时候就取消前一次请求
  const debouncedValue = useDebounce(inputValue, 300)
  useClickOutside(componentRef, () => { setSugestions([])})
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setSugestions([])
      const results = fetchSuggestions(debouncedValue)
      // 判断返回的是否是 promise 如果是就说明是后端请求，然后添加 loading 状态
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSugestions(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSugestions(results)
        setShowDropdown(true)
        if (results.length > 0) {
          setShowDropdown(true)
        } 
      }
    } else {
      setShowDropdown(false)
    }
    setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])
  // 使用
  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }
  // 检测按钮， 使用上下键来选择元素
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 38:
        highlight(highlightIndex - 1)
        break
      case 40:
        highlight(highlightIndex + 1)
        break
      case 27:
        setShowDropdown(false)
        break
      default:
        break
    }
  }
  // input 输入内容
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }
  // 点击下拉列表的某项，然后将其添加到 input 上
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setShowDropdown(false)
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }
  // 渲染下拉列表
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {setSugestions([])}}
      >
        <ul className="viking-suggestion-list">
          { loading &&
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin></Icon>
            </div>
          }
          {suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex
            })
            return (
              <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }
  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete;

