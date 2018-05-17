import * as Rx from 'rxjs';

export class Rendering  {

    private canvas: HTMLCanvasElement;
    private x: number;

    constructor(canvas: HTMLCanvasElement|null){
        if(canvas != null){
            this.canvas = canvas;
        }
    }

    public run(){
        this.x = 0
        const loop$ = Rx.interval(16);
        loop$.subscribe(x => {
            this.ClearCanvas();
            this.update();
            this.draw();
        });

    }

    private draw(){
        this.UseCanvasContext( (ctx) => {
            ctx.fillStyle = "#f33";
            ctx.fillRect(this.x,180,30,30)
        })
    }

    private update(){
        this.x +=0.1;
    }

    private ClearCanvas(){
        this.UseCanvasContext( (ctx) => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        })
        
    }

    private UseCanvasContext(drawingFunc: (x:CanvasRenderingContext2D) => void): CanvasRenderingContext2D|null{
        const ctx: CanvasRenderingContext2D|null = this.canvas.getContext("2d")
        if(ctx != null)
        {
            drawingFunc(ctx);
        }

        return null;
    }

    

}