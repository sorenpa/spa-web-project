import * as Rx from 'rxjs';
import RenderModelService from './RenderModels/ModelService';

/*
    This class is meant to handle the rendering of the game
*/
export default class Rendering  {

    // private renderModelService: RenderModelService;

    public canvas: HTMLCanvasElement;
    private x: number = 0;
    private loop$: Rx.Observable<number>;

    constructor(loop$:Rx.Observable<number>, renderModelService: RenderModelService){
        this.loop$ = loop$;
      //  this.renderModelService = renderModelService;
    }

    public start(){
        this.initCanvas();
        this.loop$.subscribe(this.render.bind(this))
    }

    private initCanvas(){
        const canv = document.getElementById('glCanvas') as HTMLCanvasElement;
        
        if(canv != null){
            this.canvas = canv;
        }
    }

    private clearCanvas(){
        this.useCanvasContext( (ctx) => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        })
    }

    private render(frameNumber: number) {
        console.log('Frame:', frameNumber, "x:", this.x );
        this.clearCanvas();
        
    }

    private useCanvasContext(drawingFunc: (x:CanvasRenderingContext2D) => void){
        const ctx: CanvasRenderingContext2D|null = this.canvas.getContext("2d")
        if(ctx != null)
        {
            drawingFunc(ctx);
        }

        return null;
    }
}