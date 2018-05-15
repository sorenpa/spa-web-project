import * as React from 'react';
import './App.css';

import Canvas from './components/Canvas';

import logo from './logo.svg';

interface IState{
  height: number,
  width: number
}

class App extends React.Component<{}, IState> {

  constructor(props:any) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  public componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  public updateWindowDimensions() {
    this.setState({ width: document.body.clientWidth, height: document.body.clientHeight });
  }

  public render() {
    const {height, width} = this.state;

    return (
      <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
            <p>{width},{height}</p>
        </header>
        <Canvas width={width} height={height}/>
      </div>
    );
  }
}

export default App;
