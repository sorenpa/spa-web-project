import * as React from 'react';
import './Overlay.css';

import logo from '../../../../logo.svg';

class Canvas extends React.Component<{}, {}> {
    
    private canvas: HTMLCanvasElement|null;

    public componentDidUpdate() {
      if(this.canvas != null){
        const ctx: CanvasRenderingContext2D|null = this.canvas.getContext("2d")
        
        if(ctx != null)
        {
          ctx.fillStyle = "#f33";
          ctx.fillRect(180,180,30,30)
        }
      }
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
  export default Canvas