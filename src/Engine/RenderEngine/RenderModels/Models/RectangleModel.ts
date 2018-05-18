import IRenderModel from "../IRenderModel";

export default class RectangleModel implements IRenderModel{

    public renderFunction(context: CanvasRenderingContext2D){
        return;
    }

}

    // private draw(){
    //     this.useCanvasContext((ctx) => {
    //         ctx.fillStyle = "#f33";
    //         ctx.fillRect(this.x,180,30,30)
    //     })
    // }