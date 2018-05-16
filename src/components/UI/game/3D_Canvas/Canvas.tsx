import * as React from 'react';
import './Canvas.css';

import {CanvasScript} from './Scripts';

interface IProps {
  width: number,
  height: number,
}


class Canvas extends React.Component<IProps, {}> {

    private canvas: HTMLCanvasElement|null;
    private canvasScript: CanvasScript;
  
    constructor(props:IProps) {
      super(props);
      console.log('CONSTRUCTING');
      
    }

    public componentDidMount(){
      this.canvasScript = new CanvasScript(this.canvas);
      this.canvasScript.run();
      console.log('MOUNTING');
    }

    public render() {
      const {width, height} = this.props;

      return(
        <div className="canvas-container">
          <canvas className="canvas-canvas" ref={canvas => this.canvas = canvas} height={height} width={width}/>
        </div>
      )
    }
  }
  export default Canvas