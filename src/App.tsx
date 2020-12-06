import React from 'react';

import Button, {ButtonType, ButtonSize} from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

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
        <Menu defaultIndex={3} mode='vertical' onSelect={(index) => {}}>
          <MenuItem index={0}>
            cool link 1
          </MenuItem>
          <MenuItem index={1}>
            cool link 2
          </MenuItem>
          <MenuItem index={2} disabled>
            cool link 2
          </MenuItem>
          <MenuItem index={3}>
            link 2
          </MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;
