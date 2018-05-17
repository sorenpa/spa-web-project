import * as React from 'react';
import './Canvas.css';

interface IProps {
  width: number,
  height: number,
}


class Canvas extends React.Component<IProps, {}> {

    private canvas: HTMLCanvasElement|null;
  
    constructor(props:IProps) {
      super(props);
    }

    public componentDidMount(){
      console.log('Mount - Canvas')
    }

    public render() {
      const {width, height} = this.props;

      return(
        <div className="canvas-container">
          <canvas id='glCanvas' className="canvas-canvas" ref={canvas => this.canvas = canvas} height={height} width={width}/>
        </div>
      )
    }
  }
  export {Canvas}