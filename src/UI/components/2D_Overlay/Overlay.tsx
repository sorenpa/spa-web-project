import * as React from 'react';
import './Overlay.css';

import logo from './resources/logo.svg';

class Overlay extends React.Component<{}, {}> {
  
  public componentDidMount(){
    console.log('Mount - 2D')
  }

    public render() {
      return(
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
        </header>
      )
    }
  }
  export {Overlay}