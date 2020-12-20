import React from 'react';

import Button, {ButtonType, ButtonSize} from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={() => {alert('点击了')}}>点击</Button>
        <Button btnType={ButtonType.Primary} disabled size={ButtonSize.Large}>Hello</Button>
        <Button
          btnType={ButtonType.Link}
          size={ButtonSize.Small}
          href="https://reactjs.org"
        >
          Learn React
        </Button>
        <Button btnType={ButtonType.Link} size={ButtonSize.Small} disabled href='https://www.baidu.com'>click</Button>
        <Button btnType={ButtonType.Default} size={ButtonSize.Large}>Hello</Button>
        <br/>
        <Menu defaultIndex={'4-1'} mode='vertical' onSelect={(index) => {console.log(index)}} defaultOpenSubMenus={['4']}>
          <MenuItem>
            cool link 1
          </MenuItem>
          <MenuItem>
            cool link 2
          </MenuItem>
          <MenuItem disabled>
            cool link 2
          </MenuItem>
          <MenuItem>
            link 2
          </MenuItem>
          <SubMenu title='title'>
            <MenuItem>
              dropdown 1
            </MenuItem>
            <MenuItem>
              dropdown 2
            </MenuItem>
            <MenuItem>
              dropdown 3
            </MenuItem>
          </SubMenu>
        </Menu>
      </header>
    </div>
  );
}

export default App;
