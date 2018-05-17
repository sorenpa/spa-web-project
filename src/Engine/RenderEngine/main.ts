import * as Rx from 'rxjs';

export default class Rendering  {

    public canvas: HTMLCanvasElement;
    // private x: number;

    constructor(loop$:Rx.Observable<number>){
        this.initCanvas();

        loop$.subscribe(this.render)
    }

    private initCanvas(){
        const canv = document.getElementById('glCanvas') as HTMLCanvasElement;

        if(canv != null){
            this.canvas = canv;
        }
    }

    // private draw(){
    //     this.UseCanvasContext((ctx) => {
    //         ctx.fillStyle = "#f33";
    //         ctx.fillRect(this.x,180,30,30)
    //     })
    // }

    // private update(){
    //     this.x +=0.1;
    // }

    // private clearCanvas(){
    //     this.useCanvasContext( (ctx) => {
    //         ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //     })
        
    // }

    private render(frameNumber: number) {
        console.log('Frame:', frameNumber );

        // this.clearCanvas();
        // // this.update();
        // // this.draw();
    }

    // private useCanvasContext(drawingFunc: (x:CanvasRenderingContext2D) => void){
    //     const ctx: CanvasRenderingContext2D|null = this.canvas.getContext("2d")
    //     if(ctx != null)
    //     {
    //         drawingFunc(ctx);
    //     }

    //     return null;
    // }

    

}