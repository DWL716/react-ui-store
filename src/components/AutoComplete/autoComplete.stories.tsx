import React from 'react'
import { storiesOf, Meta, Story } from '@storybook/react'
import Icon from '../Icon/icon'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { action } from '@storybook/addon-actions'
import { library } from '@fortawesome/fontawesome-svg-core'; // 导入图标仓库
import { fas, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { AutoComplete, AutoCompleteProps } from './autoComplete'
library.add(fas) // 需要重新再次添加把图标添加进仓库
interface LakerPlayerProps {
  value: string;
  number: number;
}
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}
const SimpleComplete = () => {
  // const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
  // 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
  // const lakersWithNumber = [
  //   {value: 'bradley', number: 11},
  //   {value: 'pope', number: 1},
  //   {value: 'caruso', number: 4},
  //   {value: 'cook', number: 2},
  //   {value: 'cousins', number: 15},
  //   {value: 'james', number: 23},
  //   {value: 'AD', number: 3},
  //   {value: 'green', number: 14},
  //   {value: 'howard', number: 39},
  //   {value: 'kuzma', number: 0},
  // ]
  // const handleFetch = (query: string) => {
  //   return lakers.filter(name => name.includes(query)).map(name => ({value: name}))
  // }
  // const handleFetch = (query: string) => {
  //   return lakersWithNumber.filter(player => player.value.includes(query))
  // }
  const handleFetch = (query: string) => {
    console.log(query);
    
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items)
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
      })
  }

  // const renderOption = (item: DataSourceType) => {
  //   const itemWithGithub = item as DataSourceType<GithubUserProps>
  //   return (
  //     <>
  //       <h2>Name: {itemWithGithub.value}</h2>
  //       <p>url: {itemWithGithub.url}</p>
  //     </>
  //   )
  // }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
    //renderOption={renderOption}
    />
  )
}

storiesOf('AutoComplete Component', module)
  .add('AutoComplete', SimpleComplete)

export default {
  title: 'Example/Auto',
  component: AutoComplete,
  argTypes: {
    
  },
} as Meta;

const Template: Story<AutoCompleteProps> = (args) => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items)
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
      })
  }
  return (<><FontAwesomeIcon icon="spinner" spin />
  <Icon icon={faSpinner} spin></Icon>
  <Icon icon='arrow-down' size='9x' theme='primary' />
  < FontAwesomeIcon icon="stroopwafel"/>
  <AutoComplete  fetchSuggestions={handleFetch} onSelect= {(item) => {console.log(item);}}/></>)
}
export const Primary = Template.bind({});

Primary.parameters = {
  value: 333
}
