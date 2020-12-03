import React from 'react';

import Button, {ButtonType, ButtonSize} from './components/Button/button'

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
      </header>
    </div>
  );
}

export default App;
