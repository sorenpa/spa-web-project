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
      const {width, height} = this.props;

      return(
        <div className="canvas-container">
          <canvas className="canvas-canvas" ref={canvas => this.canvas = canvas} height={height} width={width}/>
        </div>
      )
    }
  }
  export default Canvas