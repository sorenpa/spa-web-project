import * as React from 'react';
import './Canvas.css';

import {Rendering} from '../../Engine';

interface IProps {
  width: number,
  height: number,
}


class Canvas extends React.Component<IProps, {}> {

    private canvas: HTMLCanvasElement|null;
    private renderEngine: Rendering; // TODO Need to find a better way to get this passed to the rendering
  
    constructor(props:IProps) {
      super(props);
      console.log('CONSTRUCTING');
      
    }

    public componentDidMount(){
      this.renderEngine = new Rendering(this.canvas);
      this.renderEngine.run();
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
  export {Canvas}